import {Collection, MongoClient} from 'mongodb';
import mongoose from 'mongoose';
const clusterUrl = "localhost:27017"; 
const dbUrl = "mongodb://localhost:27017/";//`mongodb+srv://${userName}:${password}@${clusterUrl}/test?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

export async function SetUser(email: string, displayName: string, userName: string, password: string, friends: string[]) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const users = await userCollection.insertOne({"Email": email, "displayName": displayName, "userName": userName, "password": password, "friends": friends, "status": "", img: "", lastActivity: new Date()});
    await client.close(); 
}

export async function UserExist(userName: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const users = await userCollection.find({"userName": userName}).toArray();
    await client.close();
    return users.length > 0;    
}

export async function PasswordUpdating(password: string, newPassword: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const update = await userCollection.updateOne({"password": password}, {"$set": {"password": newPassword}});
    await client.close();
}

export async function EmailExist(email: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const users = await userCollection.find({"Email": email}).toArray();
    await client.close();
    return users.length > 0;    
}

export async function GetFriends(userName: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    let friends: string[] = [];
    const user = await userCollection.findOne(
        { userName: userName }, 
        { projection: { friends: 1 } } // Include only the friends field
    );
    if (user && Array.isArray(user.friends)) {
        friends = user.friends; // Assign the friends array
    }
    await client.close();
      
    return friends;
}

export async function GetUser(userName: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const user = await userCollection.find({"userName": userName}).toArray();
    await client.close();
    return user;
}

export async function SetStatus(userName: string, status: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const update = await userCollection.updateOne({"userName": userName}, {"$set": {"status": status, "lastActivity": new Date()}});
    await client.close();
    return update;
}

export async function SetOffline(userName: string) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const update = await userCollection.updateOne({"userName": userName}, {"$set": {"isOnline": false}});
    await client.close();
}

export async function GetOnline(userName: string) {
    try {
        await client.connect();
        const userCollection = client.db("Discord").collection("Users");

        // Aggregation pipeline to find the online friends
        const user = await userCollection.aggregate([
            { $match: { userName: userName } }, // Find the user
            {
                $lookup: {
                    from: "Users", // The same collection for friends
                    localField: "friends", // The field that stores friend usernames
                    foreignField: "userName", // Match friend usernames
                    pipeline: [
                        { $match: { status: { $in: ["online", "Idle"] } } }, // Get only online or idle friends
                    ],
                    as: "onlineFriends"
                }
            },
            {
                $project: { _id: 0, onlineFriends: 1 } // Keep only online friends
            }
        ]).toArray();

        return user.length > 0 ? user[0].onlineFriends : [];
    } catch (error) {
        console.error("Error fetching online friends:", error);
        return []; // Return an empty array on error
    } finally {
        await client.close();
    }
}

// Establish MongoDB connection at the start
export const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit the process if connection fails
    }
};
/*
// Ensure MongoDB connection before any operation
export const ensureConnection = async () => {
    if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
        console.log("MongoDB not connected, reconnecting...");
        await connectDB();
    }
};

setInterval(async () => {
    const TIMEOUT = 1 * 60 * 1000; // 1 minute
    const lastActiveThreshold = new Date(Date.now() - TIMEOUT);

    // Ensure MongoDB connection before running operations
    await ensureConnection();

    try {
        await client.connect();

        const result = await client.db("Discord").collection("Users").updateMany(
            { "lastActivity": { $lt: lastActiveThreshold }, isOnline: true },
            { $set: { isOnline: false } }
        );
        console.log(`✅ ${result.modifiedCount} users updated.`);
        await client.close();
    } catch (error) {
        console.error("❌ Error updating users:", error);
    }
}, 1 * 60 * 1000); // Runs every minute */



