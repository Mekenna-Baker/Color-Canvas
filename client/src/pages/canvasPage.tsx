import { useRef, useEffect} from "react"

const CanvasComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasWidth = 500;
    const canvasHeight = 500;
    const pixelSize = 10;

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

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const pixelX = Math.floor(x / pixelSize) * pixelSize;
        const pixelY = Math.floor(y / pixelSize) * pixelSize;

        const currentColor = ctx.getImageData(pixelX, pixelY, 1, 1).data;
        const isRed = currentColor[0] === 255 && currentColor[1] === 0 && currentColor[2] === 0;

        ctx.fillStyle = isRed ? '#000000' : '#ff0000';
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
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
            <p>Canvas Page</p>

            <div className="canvasHolder">
                <canvas id='paintMain' ref={canvasRef} width={canvasWidth} height={canvasHeight} onClick={handleCanvasClick} style={{border: '1px solid red'}}></canvas>
            </div>
        </div>
    )
}

export default CanvasComponent;