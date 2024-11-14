import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import tags from './routes/tags.js';
import photos from './routes/photos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(express.static('./public'));

app.use('/tags', tags);   
app.use('/photos', photos); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
