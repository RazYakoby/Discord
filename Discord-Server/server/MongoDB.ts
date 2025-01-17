import {Collection, MongoClient} from 'mongodb';
const clusterUrl = "localhost:27017"; 
const dbUrl = "mongodb://localhost:27017/";//`mongodb+srv://${userName}:${password}@${clusterUrl}/test?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

export async function SetUser(email: string, displayName: string, userName: string, password: string, friends: string[]) {
    await client.connect();
    const userCollection = await client.db("Discord").collection("Users");
    const users = await userCollection.insertOne({"Email": email, "displayName": displayName, "userName": userName, "password": password, "friends": friends, isOnline: "true", img: ""});
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
