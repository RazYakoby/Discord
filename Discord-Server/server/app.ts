// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { error } from 'console';
import { LoginPageServer } from './LoginPageServer';
import { mainPageServer} from './MainPageServer';
import mongoose from 'mongoose';
import { connectDB } from "./MongoDB";


const app = express();
const PORT = 3200;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

/*app.use(bodyParser.json());
app.use(cors());
app.use("/login", loginPageServer);
app.use("/uploadPost", mainPageServer); */

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    isOnline: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    displayName: { type: String },
    friends: { type: [String] },
    img: { type: String },
    lastActivity: { type: Date, default: Date.now }, // ✅ Add this field
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;


app.use("/login", LoginPageServer);
app.use("/main", mainPageServer); 

// Establish MongoDB connection at the start
connectDB().then(() => {
    // Your app logic after ensuring DB connection
    app.listen(3200, () => {
        console.log("Server is running on port 3200");
    });
}).catch((error) => {
    console.error("❌ Could not start server:", error);
});
