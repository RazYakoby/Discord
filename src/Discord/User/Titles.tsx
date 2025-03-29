import '../../css/Titles.css';
import { Button, ScrollArea, Flex, Box } from '@mantine/core';
import { useStore } from './Chat&staff';
import { FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { useEffect, useState } from 'react';
import AddFriends from '../Components/AddFriends';
import OnlineFriends from '../Components/OnlineFriends';
import AllFriends from '../Components/AllFriends';
import Inbox from '../Components/Inbox';

function Titles() {
    const { title } = useStore();    

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