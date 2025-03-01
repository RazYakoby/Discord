import {Collection, MongoClient} from 'mongodb';
import mongoose from 'mongoose';
const clusterUrl = "localhost:27017"; 
const dbUrl = "mongodb://localhost:27017/";//`mongodb+srv://${userName}:${password}@${clusterUrl}/test?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl, {});

export async function SetUser(email: string, displayName: string, userName: string, password: string, friends: string[]) {
    const db = await connectDB();
    const userCollection = db.collection("Users");
    await userCollection.insertOne({
        Email: email, 
        displayName, 
        userName, 
        password, 
        friends, 
        status: "", 
        img: "", 
        lastActivity: new Date()
    });
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
    await ensureConnection();
    const db = await connectDB();
    try {

        const userCollection = await db.collection("Users").aggregate([
            { $match: { userName: userName } }, // Find the user
            {
                $lookup: {
                    from: "Users", // The same collection for friends
                    localField: "friends", // The field that stores friend usernames
                    foreignField: "userName", // Match friend usernames
                    pipeline: [
                        { $match: { status: { $in: ["online"] } } }, // Get only online or idle friends
                    ],
                    as: "onlineFriends"
                }
            },
            {
                $project: { _id: 0, onlineFriends: 1 } // Keep only online friends
            }
        ]).toArray();

        return userCollection.length > 0 ? userCollection[0].onlineFriends : [];
    } catch (error) {
        console.error("Error fetching online friends:", error);
        return []; // Return an empty array on error
    } finally {
        await client.close();
    }
}

export async function GetAllFriends(userName: string) {
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

export async function AddFriends(userName: string) {
    
}

let isConnected = false; // Track connection state

export async function connectDB() {
    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
            console.log("✅ MongoDB Connected");
        } catch (error) {
            console.error("❌ MongoDB Connection Error:", error);
            throw error;
        }
    }
    return client.db("Discord"); // Return the database instance
}

export async function ensureConnection() {
    try {
        await client.db().admin().ping(); // Ping MongoDB to check connection
    } catch (error) {
        console.log("🔄 Reconnecting MongoDB...");
        isConnected = false;
        await connectDB(); // Reconnect
    }
}



setInterval(async () => {
    const TIMEOUT = 1 * 60 * 1000; // 1 minute
    const lastActiveThreshold = new Date(Date.now() - TIMEOUT);

    await ensureConnection(); // Ensure MongoDB is connected
    const db = await connectDB();

    try {
        const result = await db.collection("Users").updateMany(
            { "lastActivity": { $lt: lastActiveThreshold }, isOnline: true },
            { $set: { isOnline: false } }
        );
        console.log(`✅ ${result.modifiedCount} users set to offline.`);
    } catch (error) {
        console.error("❌ Error updating users:", error);
    }
}, 1 * 60 * 1000);






