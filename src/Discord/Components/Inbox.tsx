import { Avatar, Button, Flex, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const baseRoute = 'http://localhost:3200';
const mainRoute = '/main';


interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    password: string;
    friends: string[];
    requests: string[];  // Changed from 'request' to 'requests'
    isOnline: boolean;
    img: string;
    lastActive: Date;
    status: string;
}

const useAllRequests = (userName: string) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.post(`${baseRoute}${mainRoute}/getAllRequests`, { userName });

                if (Array.isArray(response.data)) {
                    const userItems: User[] = response.data.map((item: any) => ({
                        id: item.id || "",
                        email: item.email || "",
                        displayName: item.displayName || "",
                        userName: item.userName || "",
                        password: item.password || "",
                        friends: item.friends || [],
                        requests: item.requests || [],  // Fixed: using 'requests' field
                        isOnline: item.isOnline || false,
                        img: item.img || "",
                        lastActive: item.lastActive ? new Date(item.lastActive) : new Date(),  // Fixed date handling
                        status: item.status || "offline",
                    }));

                    setUsers(userItems);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching friend requests:", error);
            }
        };

        fetchRequests();
    }, [userName]);

    return users;
};

const AcceptFriends = async (userName: string, friendName: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${mainRoute}/insertFriends`, { userName, friendName });
        if (response.status === 200) {
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error in loginIn:", error);
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred.");
        }
        return false;
    }
};

const RejectFriends = async (userName: string, friendName: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${mainRoute}/rejectFriends`, { userName, friendName });
        if (response.status === 200) {
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error in loginIn:", error);
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred.");
        }
        return false;
    }
};


function Inbox() {

    const location = useLocation();
    const user = location.state as User;
    const friendsRequest = (useAllRequests(user.userName));

    const Accept = async (index: any) => {
        await AcceptFriends(user.userName, friendsRequest[index].userName);
        await RejectFriends(user.userName, friendsRequest[index].userName);
    }

    const Reject = async (index: any) => {
        await RejectFriends(user.userName, friendsRequest[index].userName)
    }

    return (
    <Flex className="model-overlay2">
      <Flex className="model-content2">
        <Title c={"white"} size={20} m={20}>Inbox</Title>
        {Array.isArray(friendsRequest) && friendsRequest.length > 0 ? (
            <Flex direction={"column"} pos={"absolute"} top={60} left={-10}>
                {friendsRequest.map((friend, index) => (
                    <Flex direction={"row"} >    
                        <Button className='flexabillty'>
                            {friend.img ? (
                            <Avatar
                                key={friend.id}
                                src={friend.img}
                                style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "50%",
                                margin: "0px 10px 0px 0px",
                                border: "2px solid #2f3136",
                                backgroundColor: "#36393f", 
                                }}
                                alt="Avatar"
                            />
                            ) : (
                                <FaDiscord size={40}     
                                    style={{
                                        margin: "0px 10px 0px 0px",
                                        color: "#ffffff",
                                        backgroundColor: "#5865F2",
                                        borderRadius: "50%",
                                        padding: "5px",
                                        border: "2px solid #2f3136",
                                }} />
                            )}
                            <span style={{margin: "3px 3px 3px 3px"}}>{friend.userName} </span>
                        </Button>
                        <Flex pos={"relative"} top={-10} mt={10} ml={10}>
                            <Button w={85} h={45} mr={5} onClick={() => Accept(index)}>Accept</Button>
                            <Button w={85} h={45} onClick={() => Reject(index)}>reject</Button>
                        </Flex>
                    </Flex>
                ))} 
            </Flex>
        ): (
            <>
                <Flex c={"white"} pos={"absolute"} left={20} top={60}>no friends request</Flex>
            </>
        )}
      </Flex>
    </Flex>
  );
};

export default Inbox;
