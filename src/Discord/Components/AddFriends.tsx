import { Button, Flex, Title, TextInput } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';
const mainRoute = '/main';

const AddUserAsFriend = async (userName: string, friendName: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${mainRoute}/addFriends`, { userName, friendName });
        if (response.status === 200) {
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error.");
        }
        return false;
    }
};

const CheckUserExists = async (userName: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${loginRoute}/Login`, { userName });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred.");
        }
        return false;
    }
};

interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    password: string; 
    friends: string[];
    requests: string[];
    isOnline: boolean;
    img: string;
    lastActive: Date;
    status: string; 
}

function AddFriends () {
    const location = useLocation();
    const user = location.state as User;
    const [searchTerm, setSearchTerm] = useState("");

    const AddUser = async () => {
        const success = await CheckUserExists(searchTerm.trim());
        if (success) {
            await AddUserAsFriend(searchTerm.trim(), user.userName);
            alert("Send")
        } 
    };

    return (
        <Flex direction={"column"} gap={"xs"} style={{ position: "absolute", left: "0%", top: "90px", maxHeight: "50px" }}>
            <Title style={{color: "white", fontSize: "20px", fontFamily: "serif", position:"relative" ,left: "40px"}}>Add Friends</Title>
            <h4 style={{position: "relative", bottom: "30px", left:"40px"}}>You can add friends with their Discord username</h4>
            <TextInput
                type="text"
                placeholder="You can add friends with their Discord username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                styles={{
                input: {
                    backgroundColor: '#202225',
                    color: "white",
                    position: "relative",
                    bottom: "25px",
                    left: "50px",
                    width: "350px"
                },
                label: {
                    fontFamily: "sans-serif", 
                    position: "relative",
                    top: "-2%"
                }
                
            }}   
            rightSection={
                <Button
                    onClick={AddUser}
                    disabled={!searchTerm.trim()} 
                    style={{
                        position: "absolute",
                        right: "-37px",
                        bottom: "24px",
                        backgroundColor: "#5865F2",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: searchTerm.trim() ? "pointer" : "not-allowed", 
                    }}
                >
                Send Friend Request
              </Button>
            }   
            />
        </Flex>
    )
}

export default AddFriends;