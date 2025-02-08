import '../../css/Titles.css';
import { Button, ScrollArea, Flex, Image, Title,Text, Container, Box } from '@mantine/core';
import { useStore } from './Chat&staff';
import { FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    password: string;
    friends: string[];
    isOnline: boolean;
    img: string;
  }

function Titles () {
    const {title, setTitle} = useStore();
    return (
        <>
            <Flex className='button5'>
                {title === "Friends" && (
                    <>
                        <Flex>
                            <FaUserFriends size={40} style={{
                                margin: "2px 0px 0px 10px",
                                color: "#ffffff",
                                backgroundColor: "transparent",
                                padding: "3px",
                            }}/>
                            <span style={{margin: "9px 3px 1px 5px", color:"white"}}>{title}</span>
                        </Flex>
                        <Flex className='titleButtons' style={{width: "74%"}}>
                            <ScrollArea w={"48%"} type="never" style={{ overflowX: "auto" }}>
                                <Box w={"100%"} style={{ display: "flex", whiteSpace: "nowrap" }}>
                                    <Button variant={"subtle"} color={"white"}>Online</Button>
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
                {title === "Nitro" && (
                    <>
                        <IoLogoIonitron size={40} style={{
                            margin: "2px 0px 0px 10px",
                            color: "#ffffff",
                            backgroundColor: "transparent",
                            padding: "3px",
                        }} />
                        <span style={{margin: "9px 3px 1px 5px", color:"white"}}>{title}</span>
                    </>
                )}
                {title === "Shop" && (
                    <>
                        <GiShop size={40} style={{
                            margin: "2px 0px 0px 10px",
                            color: "#ffffff",
                            backgroundColor: "transparent",
                            padding: "3px",
                        }}/>
                        <span style={{margin: "9px 3px 1px 5px", color:"white"}}>{title}</span>
                    </>
                )}
            </Flex>
        </>
    )
}

export default Titles;