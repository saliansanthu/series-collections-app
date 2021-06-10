import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`Connected to the Database @${conn.connection.host}`);
    } catch (error) {
        console.log(`Error(DB): ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;