import mongoose, { ConnectOptions } from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/baguette';

export
// Function to connect to MongoDB
    const connectToMongoDB = async (): Promise<void> => {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);
            console.log('Successfully connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1); // Exit process with failure
        }
    };
