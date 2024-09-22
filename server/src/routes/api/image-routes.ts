import express from "express";
import { getAllImages , createImage } from '../../controllers/image-controller.js'

const router = express.Router();

// Get images 
router.get('/', getAllImages);

// Post image 
router.post('/', createImage);

export {router as imageRouter};