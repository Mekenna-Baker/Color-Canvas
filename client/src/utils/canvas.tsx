import  React, { useRef, useState, useEffect} from "react"
import colors2 from "../assets/colors";
import { createImage } from "../api/imageAPI";

let selectedColor: string  = '#000000';


//should update the page depending on which pixel was clicked on.
const CanvasComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasWidth = 500;
    const canvasHeight = 500;
    const pixelSize = 10;

    const [isPainting, setPainting] = useState(false);
    const [isClear, setClear] = useState(false);

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

    const erasePixel = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        //grab the mouse canvas coordinates
        const pixelX = Math.floor(x /pixelSize) * pixelSize;
        const pixelY = Math.floor(y /pixelSize) * pixelSize;

        //clear the selected pixel
        ctx.clearRect(pixelX, pixelY, pixelSize, pixelSize)

        //redraw the grid at the erased pixel
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize)

        ctx.strokeStyle = '#cccccc';
        ctx.strokeRect(pixelX, pixelY, pixelSize, pixelSize)
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

        //if the eraser is activated then set pixels to clear
        if(isClear){
            erasePixel(ctx, x ,y)
            setPainting(true);
        } else {
            drawPixel(ctx, x, y);
            setPainting(true);
        }
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

        if(isClear){
            erasePixel(ctx, x ,y)
        } else {
            drawPixel(ctx, x, y)
        }
    }

    const handleMouseUpLeave = () => {
        setPainting(false);
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if(!ctx) return;

        //clear the grid completly
        ctx.clearRect(0, 0, canvasHeight, canvasWidth);
        //redraw the grid
        drawGrid(ctx)
    }

    const uploadCanvas = async () => {
        console.log('Uploading...')
        
        try {
            const canvas = canvasRef.current;
            if(!canvas) return;
        
            const dataUrl = canvas?.toDataURL('image/png');
            const link = document.createElement('a');
        
            link.href = dataUrl;
            link.download = 'canvas-image.png';
            link.click();

            //send data to be uploaded
            const imageObj: any = {
                title: 'title',
                width: canvasWidth,
                height: canvasHeight, 
                imageData: dataUrl,
                userId: 2,
            }

            const result = await createImage(imageObj);
            console.log('Image Uploaded successfully: ', result);
            

        } catch(err: any){
            console.error('Error Uploading image Data:', err)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        drawGrid(ctx);
    }, []);

    return (
        <div className="canvas-parent-container">
            <div className="canvasHolder">
                <canvas id='paintMain' ref={canvasRef} width={canvasWidth} height={canvasHeight} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpLeave} onMouseLeave={handleMouseUpLeave} style={{border: '1px solid red'}}></canvas>
            
            </div>
            <div className="buttonContainer">

                <div>
                    <button onClick={() => setClear(true)}>Eraser</button>
                </div>
                <div className="colorSelectors">
                    {colors2.map((color: {index: number, color: string, colorName: string}) => (
                        <button key={color.index} style={{backgroundColor: color.color}} onClick={() => {changeColor(color.color); setClear(false)}}></button>
                    ))}
                </div>

                <div>
                    <button onClick={clearCanvas}>Clear Canvas</button>
                </div>

                <div className="uploadContainer">
                    <button onClick={uploadCanvas}>Upload</button>
                </div>
            </div>
            

        </div>
        
    )
}

export default CanvasComponent