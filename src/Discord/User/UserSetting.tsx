import '../../css/UserSetting.css';
import { useLocation } from "react-router-dom";
import {Avatar, Button, Checkbox, TextInput, Combobox, Flex, useCombobox, UnstyledButton } from '@mantine/core';
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { TbHeadphonesFilled, TbHeadphonesOff  } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { useEffect, useState } from 'react';
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

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';
const mainRoute = '/main';

const useUserStatus = (userName: string, status: string) => {
    useEffect(() => {
        const setOnlineStatus = async () => {
            try {
                await axios.post(`${baseRoute}${mainRoute}/set-online`, { userName, status });
                console.log("User is online now.");
            } catch (error) {
                console.error("Error setting online status:", error);
            }
        };

        setOnlineStatus();
    }, [userName, status]);
};

const status: { [key: string]: string } = {
    online: "green",
    Idle: "orange",
    "Do Not Disturb": "red",
    Invisible: "gray",
  };

function UserSetting () {

    const [value, setValue] = useState("online");
    const location = useLocation();
    const user = location.state as User;

    useUserStatus(user.userName, value);
    const combobox = useCombobox ({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = Object.keys(status).map((key) => (
        <Combobox.Option value={key} key={key} style={{ color: status[key] }}>
          {key}
        </Combobox.Option>
      ));

    const [currentDisplay, setCurrentDisplay] = useState<string>(user.displayName); // State to control what to display

    const [mic, setMic] = useState(true);
    const [headphone, setHeadphone] = useState(true);

    const micOnOff = () => {
        setMic(!mic);
    }

    const headphoneOnOff = () => {
        setHeadphone(!headphone);
    }

    useEffect(() => {
        combobox.selectFirstOption();
    }, [value])

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDisplay((prev) => (prev === user.displayName ? value : user.displayName));
        }, 10000);
    
        return () => clearInterval(intervalId);
      }, [value, user.displayName]); 

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
                            <Combobox 
                                width={250}
                                position="bottom-start"
                                withArrow
                                onOptionSubmit={(value) => {
                                    setValue(value);
                                    combobox.closeDropdown();
                                }}
                                store={combobox}
                            >
                                <Combobox.Target>
                                    <UnstyledButton 
                                        style={{
                                            margin: "0px 10px -20px -20px",
                                            color: "#ffffff",
                                            backgroundColor: status[value],
                                            borderRadius: "50%",
                                            padding: "5px",
                                            border: "2px solid #2f3136",
                                            height: "10px",
                                            outline: "none",
                                            boxShadow: "none"
                                       }} 
                                        onClick={() => combobox.toggleDropdown()}
                                    />
                                </Combobox.Target>
                                <Combobox.Dropdown>
                                    <Combobox.Options>
                                        {options}
                                    </Combobox.Options>
                                </Combobox.Dropdown>
                            </Combobox>
                            <Flex style={{width: "60px"}}>
                                <span style={{fontSize: "12px", marginBottom: "15px"}}>{user.userName}</span>
                            </Flex>
                            <Flex style={{position:"relative", right: 60, width: "50px"}}>
                                <span style={{margin: "15px 5px 0px 0px", fontSize: "10px"}}>{currentDisplay}</span>
                            </Flex>
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