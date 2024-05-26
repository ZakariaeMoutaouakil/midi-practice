// src/App.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { Graphics, Stage } from "@pixi/react";
import { Graphics as PixiGraphics } from "@pixi/graphics";

interface Ellipse {
    x: number;
    y: number;
}

const MAX_ELLIPSES = 4;

const App = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [topEllipses, setTopEllipses] = useState<Ellipse[]>([]);
    const [bottomEllipses, setBottomEllipses] = useState<Ellipse[]>([]);

    const [spawnCounter, setSpawnCounter] = useState(0);

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

    useEffect(() => {
        const topPlaces = Array.from({ length: 8 }, (_, i) => 100 + i * 25);
        const bottomPlaces = Array.from({ length: 9 }, (_, i) => 400 + i * 25);

        const spawnEllipse = (setEllipses: React.Dispatch<React.SetStateAction<Ellipse[]>>, places: number[]) => {
            if (spawnCounter >= MAX_ELLIPSES) {
                return;
            }
            setEllipses(prevEllipses => {
                const randomY = places[Math.floor(Math.random() * places.length)];
                const newEllipse: Ellipse = { x: dimensions.width, y: randomY };
                return [...prevEllipses, newEllipse];
            });
            setSpawnCounter(prevCounter => prevCounter + 1);
            console.log(`Spawn counter: ${spawnCounter}`);
        };

        const moveEllipses = (setEllipses: React.Dispatch<React.SetStateAction<Ellipse[]>>) => {
            setEllipses(prevEllipses =>
                prevEllipses.map(ellipse => ({
                    ...ellipse,
                    x: ellipse.x - 1
                })).filter(ellipse => ellipse.x > 80) // Remove ellipses that are out of the screen
            );
        };

        const spawnTopIntervalId = setInterval(() => spawnEllipse(setTopEllipses, topPlaces), 4000); // Spawn ellipses every 2 seconds
        const spawnBottomIntervalId = setInterval(() => spawnEllipse(setBottomEllipses, bottomPlaces), 4000); // Spawn ellipses every 2 seconds
        const moveIntervalId = setInterval(() => {
            moveEllipses(setTopEllipses);
            moveEllipses(setBottomEllipses)
        }, 10); // Move ellipses every 16ms (approximately 60fps)

        return () => {
            clearInterval(spawnTopIntervalId);
            clearInterval(spawnBottomIntervalId);
            clearInterval(moveIntervalId);
        };
    }, [dimensions.width, spawnCounter]);

    useEffect(() => {
        const offset = 100;
        const leftLineX = dimensions.width / 2 - offset;
        const rightLineX = dimensions.width / 2 + offset;

        const ellipsesInBounds = [
            ...topEllipses,
            ...bottomEllipses
        ].filter(ellipse => ellipse.x > leftLineX && ellipse.x < rightLineX);

        console.log(ellipsesInBounds);
        ellipsesInBounds.forEach(ellipse => console.log(ellipse.x));
    }, [topEllipses, bottomEllipses, dimensions.width]);

    const drawHorizontalLine = useCallback((g: PixiGraphics, y: number, alpha = 1) => {
        g.lineStyle(2, 0x000000, alpha); // Line width of 2 and black color
        g.moveTo(50, y); // Start at x: 50, y: y
        g.lineTo(dimensions.width - 50, y); // Draw line to x: (width - 50), y: y
    }, [dimensions.width]);

    const drawVerticalLine = useCallback((g: PixiGraphics, x: number) => {
        g.lineStyle(2, 0x000000, 1); // Line width of 2 and black color
        g.moveTo(x, 100); // Start at x: x, y: 50
        g.lineTo(x, dimensions.height - 50); // Draw line to x: x, y: (height - 50)
    }, [dimensions.height]);

    const drawEllipse = useCallback((g: PixiGraphics, x: number, y: number) => {
        g.lineStyle(3, 0x000000, 1); // Line width of 3 and black color
        g.drawEllipse(x, y, 40, 22); // Draw ellipse with width 40 and height 22
        g.endFill();
    }, []);

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();

        topEllipses.forEach(ellipse => drawEllipse(g, ellipse.x, ellipse.y));
        bottomEllipses.forEach(ellipse => drawEllipse(g, ellipse.x, ellipse.y));

        drawHorizontalLine(g, 100); // First line at y: 100
        drawHorizontalLine(g, 150); // Second line at y: 150
        drawHorizontalLine(g, 200); // Third line at y: 200
        drawHorizontalLine(g, 250); // Fourth line at y: 250
        drawHorizontalLine(g, 300); // Fifth line at y: 300
        drawHorizontalLine(g, 350, 0.2); // Sixth line at y: 400
        drawHorizontalLine(g, 400); // Sixth line at y: 400
        drawHorizontalLine(g, 450); // Seventh line at y: 450
        drawHorizontalLine(g, 500); // Eighth line at y: 500
        drawHorizontalLine(g, 550); // Ninth line at y: 550
        drawHorizontalLine(g, 600); // Tenth line at y: 600

        // Draw two vertical lines at the center
        const offset = 100;
        drawVerticalLine(g, dimensions.width / 2 - offset);
        drawVerticalLine(g, dimensions.width / 2 + offset);
    }, [drawHorizontalLine, drawVerticalLine, drawEllipse, topEllipses, bottomEllipses, dimensions.width]);

    return (
        <Stage width={dimensions.width} height={dimensions.height} options={{ backgroundColor: 0xffffff }}>
            <Graphics draw={draw} />
        </Stage>
    );
};

export default App;
