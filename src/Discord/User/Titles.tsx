import '../../css/Titles.css';
import { Button, ScrollArea, Flex, Image, Title,Text, Container, Box, Avatar } from '@mantine/core';
import { useStore } from './Chat&staff';
import { FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Await, useLocation } from 'react-router-dom';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';
const mainRoute = '/main';

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

// Assuming you have a User type defined somewhere
interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    password: string; // Only if necessary
    friends: string[];
    isOnline: boolean;
    img: string;
    lastActive: Date;
    status: string; // "online" | "idle" or any other status you might have
}

const useUserStatus = (userName: string) => {
    const [users, setUsers] = useState<User[]>([]); // Ensure users is an array

    useEffect(() => {
        const fetchOnlineFriends = async () => {
            try {
                const response = await axios.post(`${baseRoute}${mainRoute}/getOnline`, { userName });
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

                    setUsers(userItems); // Store all users instead of just one
                } else {
                    setUsers([]); // Set empty array if no friends found or invalid data
                }
            } catch (error) {
                console.error("Error fetching online friends:", error);
            }
        };

        fetchOnlineFriends();
    }, [userName]); // Run when userName changes

    return users; // ✅ Return an array of users
};


function Titles() {
    const { title } = useStore();
    const location = useLocation();
    const user = location.state as User;

    // State for tracking the online status visibility
    const [status, setStatus] = useState(false);

    // Get the list of online friends
    const friends = (useUserStatus(user.userName)); // Ensure user is defined

    const GetOnlineFriends = () => {
        console.log(user.userName);
        console.log(friends);
        console.log(Array.isArray(friends));
        setStatus(true);
        console.log(status);
    };


    return (
        <>
            <Flex className="button5">
                {title === "Friends" && (
                    <>
                        <Flex>
                            <FaUserFriends
                                size={40}
                                style={{
                                    margin: "2px 0px 0px 10px",
                                    color: "#ffffff",
                                    backgroundColor: "transparent",
                                    padding: "3px",
                                }}
                            />
                            <span style={{ margin: "9px 3px 1px 5px", color: "white" }}>{title}</span>
                        </Flex>
                        <Flex className="titleButtons" style={{ width: "74%" }}>
                            <ScrollArea w={"48%"} type="never" style={{ overflowX: "auto" }}>
                                <Box w={"100%"} style={{ display: "flex", whiteSpace: "nowrap" }}>
                                    <Button variant={"subtle"} color={"white"} onClick={GetOnlineFriends}>
                                        Online
                                    </Button>
                                    <Button variant={"subtle"} color={"white"}>All</Button>
                                    <Button variant={"subtle"} color={"white"}>Pending</Button>
                                    <Button variant={"subtle"} color={"white"}>Block</Button>
                                    <Button variant={"subtle"} color={"white"}>Add Friends</Button>
                                </Box>
                            </ScrollArea>
                        </Flex>

                        <Flex style={{ position: "absolute", top: "5px", right: "5px" }}>
                            <Button>Inbox</Button>
                            <Button>Help</Button>
                        </Flex>
                    </>
                )}
<Flex direction={"column"} gap={"xs"} style={{ position: "absolute", left: "0%", top: "130px", maxHeight: "50px" }}>
    {status && Array.isArray(friends) && friends.length > 0 && (
        <Flex direction="column" gap="xs">
            {friends.map((friend) => (
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

                
                {title === "Nitro" && (
                    <>
                        <IoLogoIonitron
                            size={40}
                            style={{
                                margin: "2px 0px 0px 10px",
                                color: "#ffffff",
                                backgroundColor: "transparent",
                                padding: "3px",
                            }}
                        />
                        <span style={{ margin: "9px 3px 1px 5px", color: "white" }}>{title}</span>
                    </>
                )}
                {title === "Shop" && (
                    <>
                        <GiShop
                            size={40}
                            style={{
                                margin: "2px 0px 0px 10px",
                                color: "#ffffff",
                                backgroundColor: "transparent",
                                padding: "3px",
                            }}
                        />
                        <span style={{ margin: "9px 3px 1px 5px", color: "white" }}>{title}</span>
                    </>
                )}
            </Flex>
        </>
    );
}

export default Titles;