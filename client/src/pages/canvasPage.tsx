import CanvasComponent from "../utils/canvas";
import '../style/canvasPage.css';

const canvasPage: React.FC = () => {
    return (
        <div className="canvasPage">
            <h1>Canvas Page!</h1>
            <p>This is the canvas Page!</p>
            <CanvasComponent/>
        </div>
    )
}

export default canvasPage;