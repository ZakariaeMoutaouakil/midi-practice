// src/App.js
import { useCallback, useEffect, useState } from 'react';
import { Graphics, Stage } from "@pixi/react";
import { Graphics as PixiGraphics } from "@pixi/graphics";

const App = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [ellipseX, setEllipseX] = useState(window.innerWidth / 2);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
            setEllipseX(window.innerWidth / 2); // Adjust ellipse position on resize
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const moveEllipse = () => {
            setEllipseX(prevX => (prevX + 1) % dimensions.width);
        };

        const intervalId = setInterval(moveEllipse, 16); // Move ellipse every 16ms (approximately 60fps)

        return () => clearInterval(intervalId);
    }, [dimensions.width]);

    const drawHorizontalLine = useCallback((g: PixiGraphics, y: number) => {
        g.lineStyle(2, 0x000000, 1); // Line width of 2 and black color
        g.moveTo(50, y); // Start at x: 50, y: y
        g.lineTo(dimensions.width - 50, y); // Draw line to x: (width - 50), y: y
    }, [dimensions.width]);

    const drawEllipse = useCallback((g: PixiGraphics, x: number, y: number) => {
        g.lineStyle(3, 0x000000, 1); // Line width of 3 and black color
        g.drawEllipse(x, y, 40, 22); // Draw ellipse with width 40 and height 22
        g.endFill();
    }, []);

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();

        drawEllipse(g, ellipseX, 125); // Draw ellipse at the current x position

        drawHorizontalLine(g, 100); // First line at y: 100
        drawHorizontalLine(g, 150); // Second line at y: 150
        drawHorizontalLine(g, 200); // Third line at y: 200
        drawHorizontalLine(g, 250); // Fourth line at y: 250
        drawHorizontalLine(g, 300); // Fifth line at y: 300
        drawHorizontalLine(g, 400); // Sixth line at y: 400
        drawHorizontalLine(g, 450); // Seventh line at y: 450
        drawHorizontalLine(g, 500); // Eighth line at y: 500
        drawHorizontalLine(g, 550); // Ninth line at y: 550
        drawHorizontalLine(g, 600); // Tenth line at y: 600
    }, [drawHorizontalLine, drawEllipse, ellipseX]);

    return (
        <Stage width={dimensions.width} height={dimensions.height} options={{ backgroundColor: 0xffffff }}>
            <Graphics draw={draw} />
        </Stage>
    );
};

export default App;
