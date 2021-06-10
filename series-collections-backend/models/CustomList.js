import mongoose from 'mongoose';

export const customListSchema = mongoose.Schema({
    listName: { type: String , required: true },
    list: { type: [ String ], default: [] }
})

export const CustomList = mongoose.model('CustomList', customListSchema);