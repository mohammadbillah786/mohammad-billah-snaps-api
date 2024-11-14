import express from 'express';
import fs from 'fs';
const router = express.Router();

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


export default router;
