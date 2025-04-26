import { Flex, Title } from "@mantine/core";
import '../../css/ChannelName.css';
import { useLocation } from "react-router-dom";

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

function ChannelName () {

    const location = useLocation();
    const { user, channels } = location.state as {
        user: User;
        channels: Channels; // or Channel if you have that type
    };
    console.log(location.state);
    return (

        <>
            <Flex className="title">
                <Title pos={"absolute"} size={"16px"} bottom={"10px"} left={"10px"}>{channels.channelName}</Title>
            </Flex>
        </>
    )
}

export default ChannelName;