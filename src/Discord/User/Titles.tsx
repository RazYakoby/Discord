import '../../css/Titles.css';
import { Button, ScrollArea, Flex, Box, TextInput } from '@mantine/core';
import { useStore } from './Chat&staff';
import { FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { useEffect, useState } from 'react';
import AddFriends from '../Components/AddFriends';
import OnlineFriends from '../Components/OnlineFriends';
import AllFriends from '../Components/AllFriends';
import Inbox from '../Components/Inbox';
import { useLocation } from 'react-router-dom';
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { TiPin } from "react-icons/ti";
import { IoHelpCircle } from "react-icons/io5";
import { BiSolidInbox } from "react-icons/bi";

interface Channels {
    channelName: string;
    image: string;
    serverType: string;
    manager: string;
    members: [];
    onClick: () => void;
}

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


function Titles() {

    const location = useLocation();
    const { user, channels: initialChannels } = location.state as {
        user: User;
        channels: Channels;
    };

    const { title } = useStore();    

    const [status, setStatus] = useState(false);
    const [allStatusFriends, setAllStatusFriends] = useState(false);
    const [pending, setPending] = useState(false);
    const [block, setBlock] = useState(false);
    const [addFriends, setAddFriends] = useState(false);
    const [inbox, setInbox] = useState(false);
    const [chat, setChat] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const FriendsNameExists = () => {
        user.friends.forEach(element => {
            if (element === title) {
                return true;
            }
        });
        return false;
    }

    const GetOnlineFriends = () => {
        setStatus(true);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(false);
        setAddFriends(false);
        setChat(false);
    };

    const GetAllFriends = () => {
        setStatus(false);
        setAllStatusFriends(true);
        setPending(false);
        setBlock(false);
        setAddFriends(false);
        setChat(false);
    }

    const GetPending = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(true);
        setBlock(false);
        setAddFriends(false);
        setChat(false);
    }

    const GetBlock = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(true);
        setAddFriends(false);
        setChat(false);
    }

    const GetAddFrineds = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(false);
        setAddFriends(true);
        setChat(false);
    }

    const GetChat = () => {
        setStatus(false);
        setAllStatusFriends(false);
        setPending(false);
        setBlock(false);
        setAddFriends(false);
        setChat(true);
    }

    const OpenInbox = () => {
        setInbox(!inbox);
    }

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

                {title === "friendsName" && (
                    <>
                        <Flex className="titleButtons" style={{ width: "100%" }}>
                            <ScrollArea w={"100%"} type="never" style={{ overflowX: "auto" }}>                            <Box
                                w={"100%"}
                                style={{
                                display: "flex",
                                whiteSpace: "nowrap",
                                justifyContent: "flex-end", // move all children to the right
                                gap: "8px" // optional spacing between buttons
                                }}
                            >
                                <Button variant={"subtle"} color={"white"} style={{ fontSize: "20px" }}>
                                <BiSolidPhoneCall />
                                </Button>
                                <Button variant={"subtle"} color={"white"} style={{ fontSize: "20px" }}>
                                <BsFillCameraVideoFill />
                                </Button>
                                <Button variant={"subtle"} color={"white"} style={{ fontSize: "20px" }}>
                                <TiPin />
                                </Button>
                                <TextInput
                                type="text"
                                placeholder="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                styles={{
                                    input: {
                                    backgroundColor: '#202225',
                                    color: "white",
                                    width: "160px",
                                    fontSize: "15px"
                                    }
                                }}
                                />
                                <Button style={{ backgroundColor: 'transparent', fontSize: "20px" }} onClick={toggleInbox}>
                                <BiSolidInbox />
                                </Button>
                                <Button style={{ backgroundColor: 'transparent', fontSize: "20px" }}>
                                <IoHelpCircle />
                                </Button>
                            </Box>
                            </ScrollArea>
                        </Flex>
                    </>

                )}

            </Flex>
    );
}

export default Titles;