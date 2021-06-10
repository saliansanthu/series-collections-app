import mongoose from 'mongoose';
import { customListSchema } from './CustomList.js';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [ String ], default: [] },
    watchlist: { type: [ String ], default: [] },
    customLists: { type: [ customListSchema ], default: [] }
});

export default mongoose.model('User', userSchema);