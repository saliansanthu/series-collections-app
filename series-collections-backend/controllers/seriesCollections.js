import { CustomList } from '../models/CustomList.js';
import User from  '../models/User.js';

export const getList = async (req, res) => {
    const { ch } = req.params;
    try {
        if(!req.userId) return res.status(401).json({ message: "Unauthenticated!" });
        const user = await User.findById(req.userId);
        if(ch === 'f') return res.status(200).json({ favorites: user.favorites });
        if(ch === 'w') return res.status(200).json({ watchlist: user.watchlist });
    } catch (error) { 
        console.log(error.message)
    }
}

export const updateDefaultList = async (req, res) => {
    const { ch, id } = req.params;
    try {
        if(!req.userId) return res.status(401).json({ message: "Unauthenticated!" });
        const user = await User.findById(req.userId);
        if(ch === 'f'){
            const index = user.favorites.findIndex((item) => item === id);
            if(index === -1){
                user.favorites.push(id);
            } else {
                user.favorites = user.favorites.filter((item) => item !== id);
            }
            await user.save();
            return res.status(200).json({ favorites: user.favorites });
        } else if(ch === 'w') {
            const index = user.watchlist.findIndex((item) => item === id);
            if(index === -1){
                user.watchlist.push(id);
            } else {
                user.watchlist = user.watchlist.filter((item) => item !== id);
            }
            await user.save();
            return res.status(200).json({ watchlist: user.watchlist });
        }
    } catch (error) { 
        console.log(error.message);
    }
}

export const getCustomLists = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthenticated!" });
        const user = await User.findById(req.userId);
        const customLists = user.customLists ;
        res.status(200).json({ lists : customLists });
    } catch (error) {
        console.log(error.message);
    }
}

export const createCustomList = async (req, res) => {
    const { listName } = req.body;
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthenticated!" });
        const user = await User.findById(req.userId);
        const newCustomList = new CustomList({ listName });
        user.customLists.push(newCustomList);
        await user.save();
        res.status(201).json({ list : newCustomList });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCustomList = async (req, res) => {
    const {listId} = req.params;
    try {
        if(!req.userId) return res.status(401).json({ message: "Unauthenticated!" });
        const user = await User.findById(req.userId);
        if(!user.customLists.id(listId)) return res.status(404).json({ message: "No list with that id!" });
        user.customLists.id(listId).remove();
        await user.save();
        res.status(200).json({ message: "List deleted." });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error!"});
    }
}

export const addOrRemoveItem = async (req, res) => {
    const {listId, itemId} = req.params;
    try {
        if(!req.userId) return res.status(401).json({ message: "Unauthenticated!" });
        const user = await User.findById(req.userId);
        if(!user.customLists.id(listId)) return res.status(404).json({ message: "No list with that id!" });
        const index = user.customLists.id(listId).list.findIndex((item) => item===itemId );
        if(index === -1){
            user.customLists.id(listId).list.push(itemId);
        } else {
            const filteredList = user.customLists.id(listId).list.filter((item) => item !== itemId);
            user.customLists.id(listId).list = filteredList;
        }
        await user.save();
        res.status(200).json({ list: user.customLists.id(listId) });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error!"});
    }
}