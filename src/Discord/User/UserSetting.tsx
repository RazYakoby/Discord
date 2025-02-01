import '../../css/UserSetting.css';
import { useLocation } from "react-router-dom";
import {Avatar, Button, Flex } from '@mantine/core';
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { TbHeadphonesFilled, TbHeadphonesOff  } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";

import { useState } from 'react';

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

function UserSetting () {

    const location = useLocation();
    const user = location.state as User;

    const [mic, setMic] = useState(true);
    const [headphone, setHeadphone] = useState(true);

    const micOnOff = () => {
        setMic(!mic);
    }

    const headphoneOnOff = () => {
        setHeadphone(!headphone);
    }

    return (
        <Flex className='button4'>
            <Flex style={{width:"130px", padding: "0px 5px 5px 0px"}}>
                <Button className='flexabillty2' style={{height: "41px"}}>
                    {user ? (
                        <>
                            {user.img ? (
                                <Avatar
                                    key={user.id}
                                    src={user.img}
                                    style={{
                                        height: "32px",
                                        width: "32px",
                                        borderRadius: "50%",
                                        margin: "0px 10px 0px 0px",
                                        border: "2px solid #2f3136",
                                        backgroundColor: "#36393f", 
                                    }}
                                    alt="Avatar"
                                />
                            ) : (
                                <FaDiscord size={32}     
                                    style={{
                                        margin: "0px 10px 0px 0px",
                                        color: "#ffffff",
                                        backgroundColor: "#5865F2",
                                        borderRadius: "50%",
                                        padding: "5px",
                                        border: "2px solid #2f3136",
                                   }} />
                            )}
                            <span style={{fontSize: "12px", marginBottom: "15px"}}>{user.userName}</span>
                            <span style={{margin: "15px 5px 0px -56px", fontSize: "10px"}}>{user.displayName}</span>
                        </>
                    ): (
                        <p>Loading user details...</p>
                    )}
                </Button>
            </Flex>
            <Flex className='settingButton'>
                <Button style={{backgroundColor: "transparent", padding: "0px 5px 2px 5px", height: "41px"}} onClick={micOnOff}> 
                    {mic && (
                        <FaMicrophone size={"23px"}/>
                    )} 
                    {!mic && (
                        <FaMicrophoneSlash size={"23px"}/>
                    )}
                    </Button>
                <Button style={{backgroundColor: "transparent", padding:"0px 5px 0px 5px", height: "41px"}} onClick={headphoneOnOff}>
                    {headphone && (
                        <TbHeadphonesFilled size={"28px"}/>
                    )}
                    {!headphone && (
                        <TbHeadphonesOff size={"28px"}/>
                    )}
                </Button>
                <Button style={{backgroundColor: "transparent", padding:"0px 5px 0px 5px", height: "41px"}}><IoSettingsSharp size={"27px"}/></Button>
            </Flex>
        </Flex>
    )
}

export default UserSetting;