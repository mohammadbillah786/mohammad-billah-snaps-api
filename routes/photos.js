import express from 'express';
import fs from 'fs';
const router = express.Router();
import  uuidv4 from 'uuid4';

router.get('/', (req, res) => {
    const photosData = JSON.parse(fs.readFileSync('./data/photos.json'));
    const photos = photosData.map(photo => ({
        id: photo.id,
        photo: photo.photo,
        photoDescription: photo.photoDescription,
        photographer: photo.photographer,
        tags: photo.tags
    }));
    res.json(photos);
});

router.get('/:id', (req, res) => {
    const photosData = JSON.parse(fs.readFileSync('./data/photos.json'));
    function data() {
        return photosData.find(photo => photo.id === req.params.id);
    }
    const photo = data()

    res.json({
        id: photo.id,
        photo: photo.photo,
        photoDescription: photo.photoDescription,
        photographer: photo.photographer,
        likes: photo.likes,
        timestamp: photo.timestamp,
        tags: photo.tags
    });


})


router.get('/:id/comments', (req, res) => {
    const photosData = JSON.parse(fs.readFileSync('./data/photos.json'));
    function data() {
        return photosData.find(photo => photo.id === req.params.id);
    }
    const photo = data()

    res.json(photo.comments);
})


router.post('/:id/comments', (req, res) => {

    const path = "./data/photos.json";
    const readData = () => {
        const commentData = fs.readFileSync(path);
        const parsedData = JSON.parse(commentData);
        return parsedData;
    }

    const commentData = readData();
    const commentObj = req.body;
    const photoId = req.params.id;
    const individualPhoto = commentData.find((photo) => photo.id === photoId); 

    const newComment = {
        id: uuidv4(),
        name: commentObj.name,
        comment: commentObj.comment || "Fallback Text",
        timestamp: Date.now(),
    }

    individualPhoto.comments.push(newComment);
    fs.writeFileSync(path, JSON.stringify(commentData));

    res.status(201).json(newComment);
})



export default router;
