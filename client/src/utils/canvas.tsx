import  React, { useRef, useState, useEffect} from "react"
import colors2 from "../assets/colors";

let selectedColor: string  = '#000000';


//should update the page depending on which pixel was clicked on.
const CanvasComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasWidth = 500;
    const canvasHeight = 500;
    const pixelSize = 10;

    const [isPainting, setPainting] = useState(false);

    const changeColor = (color: string) => {
        return selectedColor = color;
    }

    //draws an initial grid onto the canvas.
    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        for (let x= 0; x< canvasWidth; x += pixelSize){
            for(let y=0; y < canvasHeight; y += pixelSize){
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x, y, pixelSize, pixelSize);

                ctx.strokeStyle = '#cccccc';
                ctx.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
    };

    const drawPixel = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        //grabs the mouse click coordinates
        const pixelX = Math.floor(x /pixelSize) * pixelSize;
        const pixelY = Math.floor(y /pixelSize) * pixelSize;

        ctx.fillStyle = selectedColor;
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        // Grabs the canvas's bounding retangle and the mouse click Coordinates
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        drawPixel(ctx, x, y);
        setPainting(true);
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if(!isPainting) return;

        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        drawPixel(ctx, x, y)
    }

    const handleMouseUpLeave = () => {
        setPainting(false);
    };

    const uploadCanvas = () => {
        console.log('Uploading...')
    
        const canvas = canvasRef.current;
        if(!canvas) return;
    
        const dataUrl = canvas?.toDataURL('image/png');
        const link = document.createElement('a');
    
        link.href = dataUrl;
        link.download = 'canvas-image.png';
        link.click();

    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        drawGrid(ctx);
    }, []);

    return (
        <div>
            <div className="canvasHolder">
                <canvas id='paintMain' ref={canvasRef} width={canvasWidth} height={canvasHeight} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpLeave} onMouseLeave={handleMouseUpLeave} style={{border: '1px solid red'}}></canvas>
            
            </div>
            <div className="colorSelectors">
                {colors2.map((color: {index: number, color: string, colorName: string}) => (
                    <button key={color.index} style={{backgroundColor: color.color}} onClick={() => changeColor(color.color)}></button>
                ))}
            </div>

            <div className="uploadContainer">
                <button onClick={uploadCanvas}>Upload</button>
            </div>
        </div>
        
    )
}

export default CanvasComponent