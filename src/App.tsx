import React, { useCallback, useEffect, useState } from 'react';
import { Graphics, Stage } from "@pixi/react";
import { Graphics as PixiGraphics } from "@pixi/graphics";
import { useEllipseEvents } from './context/ellipsecontext';

interface Ellipse {
    x: number;
    y: number;
}

const MAX_ELLIPSES = 10;

const App = () => {
    const { addEvent } = useEllipseEvents();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [topEllipses, setTopEllipses] = useState<Ellipse[]>([]);
    const [bottomEllipses, setBottomEllipses] = useState<Ellipse[]>([]);
    const [spawnCounter, setSpawnCounter] = useState(0);
    const [ellipsesInBounds, setEllipsesInBounds] = useState<Set<number>>(new Set());

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
        };

        const moveEllipses = (setEllipses: React.Dispatch<React.SetStateAction<Ellipse[]>>) => {
            setEllipses(prevEllipses =>
                prevEllipses.map(ellipse => ({
                    ...ellipse,
                    x: ellipse.x - 1
                })).filter(ellipse => ellipse.x > 80) // Remove ellipses that are out of the screen
            );
        };

        const spawnTopIntervalId = setInterval(() => spawnEllipse(setTopEllipses, topPlaces), 4000);
        const spawnBottomIntervalId = setInterval(() => spawnEllipse(setBottomEllipses, bottomPlaces), 4000);
        const moveIntervalId = setInterval(() => {
            moveEllipses(setTopEllipses);
            moveEllipses(setBottomEllipses)
        }, 10);

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

        const currentEllipsesInBounds = new Set<number>();

        const allEllipses = [
            ...topEllipses,
            ...bottomEllipses
        ];

        allEllipses.forEach(ellipse => {
            if (ellipse.x > leftLineX && ellipse.x < rightLineX) {
                currentEllipsesInBounds.add(ellipse.y);
                if (!ellipsesInBounds.has(ellipse.y)) {
                    addEvent({ y: ellipse.y, entered: true });
                }
            }
        });

        ellipsesInBounds.forEach(y => {
            if (!currentEllipsesInBounds.has(y)) {
                addEvent({ y, entered: false });
            }
        });

        setEllipsesInBounds(currentEllipsesInBounds);
    }, [topEllipses, bottomEllipses, dimensions.width, addEvent, ellipsesInBounds]);

    const drawHorizontalLine = useCallback((g: PixiGraphics, y: number, alpha = 1) => {
        g.lineStyle(2, 0x000000, alpha);
        g.moveTo(50, y);
        g.lineTo(dimensions.width - 50, y);
    }, [dimensions.width]);

    const drawVerticalLine = useCallback((g: PixiGraphics, x: number) => {
        g.lineStyle(2, 0x000000, 1);
        g.moveTo(x, 100);
        g.lineTo(x, dimensions.height - 50);
    }, [dimensions.height]);

    const drawEllipse = useCallback((g: PixiGraphics, x: number, y: number) => {
        g.lineStyle(3, 0x000000, 1);
        g.drawEllipse(x, y, 40, 22);
        g.endFill();
    }, []);

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();

        topEllipses.forEach(ellipse => drawEllipse(g, ellipse.x, ellipse.y));
        bottomEllipses.forEach(ellipse => drawEllipse(g, ellipse.x, ellipse.y));

        drawHorizontalLine(g, 100);
        drawHorizontalLine(g, 150);
        drawHorizontalLine(g, 200);
        drawHorizontalLine(g, 250);
        drawHorizontalLine(g, 300);
        drawHorizontalLine(g, 350, 0.2);
        drawHorizontalLine(g, 400);
        drawHorizontalLine(g, 450);
        drawHorizontalLine(g, 500);
        drawHorizontalLine(g, 550);
        drawHorizontalLine(g, 600);

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
