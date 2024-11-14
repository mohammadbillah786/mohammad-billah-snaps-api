import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', (req, res) => {
  const photosData = fs.readFileSync('./data/photos.json');
  const photos = JSON.parse(photosData);
  res.json(photos);
});

export default router;
