import React, { useRef, useState, useEffect, ChangeEvent } from "react"
import colors2 from "../assets/colors";
import { createImage } from "../api/imageAPI";
import Auth from "./auth";
import { retrieveUser } from "../api/userAPI";
import { HexColorPicker } from "react-colorful";

// eslint-disable-next-line
var canvasWidth = 500 | 0; 
// eslint-disable-next-line
var canvasHeight = 500 | 0;

//should update the page depending on which pixel was clicked on.
const CanvasComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pixelSize = 10;

    const [isPainting, setPainting] = useState(false);
    const [isClear, setClear] = useState(false);
    const [dimensionData, setDimensionData] = useState({
        width: canvasWidth,
        height: canvasHeight
    });

    //handles all selected colors on the page
    const [colorCode, setColorCode] = useState('#000000')


    const changeColor = (color: string) => {
        setColorCode(color)
        return colorCode
    }

    const changeColorCode = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setColorCode(value)
    }


    const handleWidthChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const valueInt = parseInt(value) * pixelSize
        canvasWidth = valueInt;

        setDimensionData({
            ...dimensionData,
            [name]: value,
        })
    };

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const valueInt = parseInt(value) * pixelSize
        canvasHeight = valueInt;

        setDimensionData({
            ...dimensionData,
            [name]: value,
        })
    };


    //draws an initial grid onto the canvas.
    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        for (let x = 0; x < canvasWidth; x += pixelSize) {
            for (let y = 0; y < canvasHeight; y += pixelSize) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x, y, pixelSize, pixelSize);

                ctx.strokeStyle = '#cccccc';
                ctx.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
    };

    const drawPixel = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        //grabs the mouse click coordinates
        const pixelX = Math.floor(x / pixelSize) * pixelSize
        const pixelY = Math.floor(y / pixelSize) * pixelSize;



        ctx.fillStyle = colorCode;
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
    }

    const erasePixel = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        //grab the mouse canvas coordinates
        const pixelX = Math.floor(x / pixelSize) * pixelSize;
        const pixelY = Math.floor(y / pixelSize) * pixelSize;

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
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Grabs the canvas's bounding retangle and the mouse click Coordinates
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        //if the eraser is activated then set pixels to clear
        if (isClear) {
            erasePixel(ctx, x, y)
            setPainting(true);
        } else {
            drawPixel(ctx, x, y);
            setPainting(true);
        }
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isPainting) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (isClear) {
            erasePixel(ctx, x, y)
        } else {
            drawPixel(ctx, x, y)
        }
    }

    const handleMouseUpLeave = () => {
        setPainting(false);
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        //clear the grid completly
        ctx.clearRect(0, 0, canvasHeight, canvasWidth);
        //redraw the grid
        drawGrid(ctx)
    }

    const uploadCanvas = async () => {
        console.log('Uploading...')

        try {
            //grab the users data by username
            const usernameData = Auth.getProfile()
            const idData = await retrieveUser(usernameData.username)


            const canvas = canvasRef.current;

            if (!canvas) return;

            //convert image to a base64 String
            const dataUrl = canvas?.toDataURL('image/png');

            const imageName = window.prompt('What do you wanna name your Project?') || 'title'
            //send data to be uploaded
            const imageObj: any = {
                title: imageName,
                width: canvasWidth,
                height: canvasHeight,
                imageData: dataUrl,
                userId: idData.id,
            }

            //ask user if they wish to save the image to their computer
            const saveImage = window.confirm('Would you Like to save the image?')
            if (saveImage) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = imageName + '.png';
                link.click();
            }

            console.log(imageObj)

            const result = await createImage(imageObj);
            console.log('Image Uploaded successfully: ', result);

            window.location.assign('/')

        } catch (err: any) {
            console.error('Error Uploading image Data:', err)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawGrid(ctx);
    }, [dimensionData]);

    return (
        <div className="canvasComponentContainer">
            <div className="canvasHolder">
                <canvas id='paintMain' ref={canvasRef} width={canvasWidth} height={canvasHeight} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpLeave} onMouseLeave={handleMouseUpLeave} style={{ border: '1px solid red' }}></canvas>

            </div>
            <div className="componentsContainer">

                <div className="dimensionsContainer">
                    <label className='width'>Width:</label>
                    <input type='text' name='width' value={dimensionData.width || ''} onChange={(e: any) => { handleWidthChange(e) }}></input>
                    <div className="dimensionsContainer">
                        <label className='height'>Height:</label>
                        <input type='text' name='height' value={dimensionData.height || ''} onChange={(e: any) => { handleHeightChange(e) }}></input>
                    </div>
                </div>

                <div className="hexColorPicker">
                    {/* this is the hex color picker box */}
                    <HexColorPicker color={colorCode} onChange={changeColor} />
                </div>

                <div className="colorCodeContainer">
                    <label className='hex'>Hex Code: <input type='text' name='colorCode' value={colorCode || ''} onChange={changeColorCode}></input></label>
                </div>
                <div className="colorSelectors">
                    {colors2.map((color: { index: number, color: string, colorName: string }) => (
                        <button key={color.index} className='colors' style={{ backgroundColor: color.color }} onClick={() => { changeColor(color.color); setClear(false) }}></button>
                    ))}
                </div>

                <div className="clear-erase">
                    <button className='clear'onClick={clearCanvas}>Clear</button>
                    <button className='erase'onClick={() => setClear(true)}>Eraser</button>
                </div>

                <div className="saveContainer">
                    <button className='save'onClick={uploadCanvas}>Save</button>
                </div>
            </div>


        </div>

    )
}

export default CanvasComponent