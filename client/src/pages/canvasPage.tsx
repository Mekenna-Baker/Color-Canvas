import CanvasComponent from "../utils/canvas";
import '../style/canvasPage.css';

const canvasPage: React.FC = () => {
    return (
        <div className="canvasPage">
            <h1>Canvas Page!</h1>
            <CanvasComponent/>
        </div>
    )
}

export default canvasPage;