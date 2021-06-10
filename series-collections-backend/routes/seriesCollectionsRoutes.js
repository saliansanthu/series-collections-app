import express from 'express';
import auth from '../middlewares/auth.js'
import { createCustomList, deleteCustomList, getCustomLists, getList, updateDefaultList, addOrRemoveItem } from '../controllers/seriesCollections.js';

const router = express.Router();

//default list
router.get('/default-lists/:ch', auth, getList);
router.patch('/default-lists/:ch/:id', auth, updateDefaultList);

//custom list
router.get('/custom-lists', auth, getCustomLists);
router.post('/custom-lists', auth, createCustomList);
router.delete('/custom-lists/:listId', auth, deleteCustomList);
router.patch('/custom-lists/:listId/:itemId', auth, addOrRemoveItem);


export default router;