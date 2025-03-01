import '../../css/Titles.css';
import { Button, ScrollArea, Flex, Image, Title,Text, Container, Box, Avatar } from '@mantine/core';
import { useStore } from './Chat&staff';
import { FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Await, useLocation } from 'react-router-dom';
import AddFriends from '../Components/AddFriends';
import { stat } from 'fs';
import OnlineFriends from '../Components/OnlineFriends';
import AllFriends from '../Components/AllFriends';
import Inbox from '../Components/Inbox';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';
const mainRoute = '/main';

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

interface OnlineFriendsProps {
    friends: User[]; // Expected prop
}

function Titles() {
    const { title } = useStore();
    const location = useLocation();
    const user = location.state as User;

    // State for tracking the online status visibility
    const [status, setStatus] = useState(false);
    const [allStatusFriends, setAllStatusFriends] = useState(false);
    const [pending, setPending] = useState(false);
    const [block, setBlock] = useState(false);
    const [addFriends, setAddFriends] = useState(false);
    const [inbox, setInbox] = useState(false);

    const GetOnlineFriends = () => {
        setStatus(true);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(false);
        setAddFriends(false);
    };

    const GetAllFriends = () => {
        setStatus(false);
        setAllStatusFriends(true);
        setPending(false);
        setBlock(false);
        setAddFriends(false);
    }

    const GetPending = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(true);
        setBlock(false);
        setAddFriends(false);
    }

    const GetBlock = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(true);
        setAddFriends(false);
    }

    const GetAddFrineds = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(false);
        setAddFriends(true);
    }

    const OpenInbox = () => {
        setInbox(!inbox);
    }

    const inboxRef = useRef<HTMLDivElement>(null);

    const toggleInbox = () => {
      setInbox((prev) => !prev);
    };
  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement; // ✅ Typecast to HTMLElement
        if (inbox && !target.closest(".model-content2")) {
            setInbox(false);
        }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [inbox]);

    return (
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
                                    <Button variant={"subtle"} color={"white"} onClick={GetAllFriends}>All</Button>
                                    <Button variant={"subtle"} color={"white"}>Pending</Button>
                                    <Button variant={"subtle"} color={"white"}>Block</Button>
                                    <Button variant={"subtle"} color={"white"} onClick={GetAddFrineds}>Add Friends</Button>
                                </Box>
                            </ScrollArea>
                        </Flex>

                        <Flex style={{ position: "absolute", top: "5px", right: "5px" }}>
                            <Button onClick={toggleInbox}>Inbox</Button>
                            <Button>Help</Button>
                        </Flex>

                        {status && (
                            <OnlineFriends/>
                        )}

                        {allStatusFriends && (
                            <AllFriends/>
                        )}
                        

                        {addFriends && (
                            <AddFriends/>
                        )}
                        {inbox && (
                            <Inbox/>
                        )}
      
                    </>
                )}
                
                
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
    );
}

export default Titles;