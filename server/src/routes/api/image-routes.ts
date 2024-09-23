import express from "express";
import { getAllImages , getImagesById, createImage } from '../../controllers/image-controller.js'

const router = express.Router();

// Get images 
router.get('/', getAllImages);

//Get image by id
router.get('/:id', getImagesById)

// Post image 
router.post('/', createImage);

export {router as imageRouter};