// src/App.js
import {useCallback, useEffect, useState} from 'react'
import {Graphics, Stage} from "@pixi/react"
import {Graphics as PixiGraphics} from "@pixi/graphics"

const App = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const drawLine = useCallback((g: PixiGraphics, y: number) => {
        g.lineStyle(2, 0x000000, 1); // Line width of 2 and black color
        g.moveTo(50, y); // Start at x: 50, y: y
        g.lineTo(dimensions.width - 50, y); // Draw line to x: (width - 50), y: y
    }, [dimensions.width])

    const drawEllipse = useCallback((g: PixiGraphics, x: number, y: number) => {
        g.lineStyle(3, 0x000000, 1); // Line width of 2 and black color
        g.drawEllipse(x, y, 40, 22); // Draw ellipse with width 20 and height 12
        g.endFill();
    }, [])

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();

        drawEllipse(g, dimensions.width / 2, 125);

        drawLine(g, 100); // First line at y: 150
        drawLine(g, 150); // First line at y: 150
        drawLine(g, 200); // Second line at y: 200
        drawLine(g, 250); // Second line at y: 200
        drawLine(g, 300); // Second line at y: 200

        drawLine(g, 400); // Second line at y: 200
        drawLine(g, 450); // First line at y: 150
        drawLine(g, 500); // Second line at y: 200
        drawLine(g, 550); // Second line at y: 200
        drawLine(g, 600); // Second line at y: 200
    }, [drawLine, drawEllipse, dimensions.width])

    return (
        <Stage width={dimensions.width} height={dimensions.height} options={{backgroundColor: 0xffffff}}>
            <Graphics draw={draw}/>
        </Stage>
    )
}

export default App;
