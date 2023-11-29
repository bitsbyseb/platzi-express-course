import express from 'express';
import musicService from '../services/music.service.js';

const router = express.Router();
const service = new musicService();

router.get('/', (req, res) => {
  const data = service.find();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const obj = service.findOne(id);
  res.json(obj);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const obj = service.delete(id);
  res.json(obj);
});

export default router;
