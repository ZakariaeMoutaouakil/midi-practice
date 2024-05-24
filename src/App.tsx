// src/App.js
import {useCallback, useEffect, useState} from 'react';
import {Graphics, Stage} from "@pixi/react";
import {Graphics as PixiGraphics} from "@pixi/graphics";

const App = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const drawLine = useCallback((g: PixiGraphics, y: number) => {
        g.lineStyle(2, 0x000000, 1); // Line width of 2 and black color
        g.moveTo(50, y); // Start at x: 50, y: y
        g.lineTo(dimensions.width - 50, y); // Draw line to x: (width - 50), y: y
    }, [dimensions])

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();
        drawLine(g, 150); // First line at y: 150
        drawLine(g, 200); // Second line at y: 200
    }, [drawLine]);

    return (
        <Stage width={dimensions.width} height={dimensions.height} options={{backgroundColor: 0xffffff}}>
            <Graphics draw={draw}/>
        </Stage>
    );
};

export default App;
