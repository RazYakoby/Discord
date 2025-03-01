import { Button, ScrollArea, Flex, Image, Title,Text, Container, Box, Avatar, Textarea, TextInput } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';
const mainRoute = '/main';

const useAllUserStatus = (userName: string) => {
    const [users, setUsers] = useState<User[]>([]); // Ensure users is an array
    useEffect(() => {
        const fetchOnlineFriends = async () => {
            try {
                const response = await axios.post(`${baseRoute}${mainRoute}/getAllFriends`, { userName });
                console.log(response.data);

                if (Array.isArray(response.data)) {
                    // Mapping the response to User objects
                    const userItems: User[] = response.data.map((item: any) => ({
                        id: item.id || "",  // Ensure fallback values are provided if necessary
                        email: item.email || "",
                        displayName: item.displayName || "",
                        userName: item.userName || "",
                        password: item.password || "",  // Only if necessary
                        friends: item.friends || [],
                        isOnline: item.isOnline || false,
                        img: item.img || "",
                        lastActive: new Date(item.lastActive) || new Date(),
                        status: item.status || "offline", // Fallback to 'offline' if status is missing
                    }));
                    console.log(userItems);
                    setUsers(userItems); // Store all users instead of just one
                } else {
                    setUsers([]); // Set empty array if no friends found or invalid data
                }
            } catch (error) {
                console.error("Error fetching online friends:", error);
            }
        };

        fetchOnlineFriends();
    }, [userName]);

    return users; // ✅ Return an array of users
};


interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    password: string; 
    friends: string[];
    isOnline: boolean;
    img: string;
    lastActive: Date;
    status: string; 
}

function AllFriends() {
    const location = useLocation();
    const user = location.state as User;
    const allFriends = (useAllUserStatus(user.userName));

    return (
        <Flex direction={"column"} gap={"xs"} style={{ position: "absolute", left: "0%", top: "130px", maxHeight: "50px" }}>
                    {Array.isArray(allFriends) && allFriends.length > 0 && (
                        <Flex direction="column" gap="xs">
                            {allFriends.map((friend) => (
                                <Flex
                                    key={friend.id} // Adding a unique key for each friend item
                                    style={{
                                        margin: "2px 0px 0px 10px",
                                        color: "#ffffff",
                                        backgroundColor: "transparent",
                                        padding: "3px",
                                        width: "auto", // Ensures the button width adjusts to content
                                    }}
                                >
                                    <Avatar src={friend.img} />
                                    <Flex style={{ width: "auto", marginLeft: "10px" }}>
                                        <span style={{ fontSize: "15px", marginBottom: "15px" }}>{friend.userName}</span>
                                    </Flex>
                                    <Flex style={{ position: "absolute", left: "30px" }}>
                                        <span style={{ margin: "15px 5px 0px 30px", fontSize: "15px" }}>{friend.status}</span>
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                    )}
                </Flex>
    )
}

export default AllFriends;