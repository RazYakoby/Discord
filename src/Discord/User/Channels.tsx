import { useEffect, useState } from 'react';
import '../../css/Channels.css';
import CreateServer from './CreateServer';
import { Button, Flex, Avatar, Card } from '@mantine/core';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const baseRoute = 'http://localhost:3200';
const mainRoute = '/main';

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

const GetChannels = async (userName: string) => {
    try {
        const response = await axios.post(`${baseRoute}${mainRoute}/GetChannels`, { userName });
        if (response.status === 200) {
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            return Array.isArray(response.data) ? response.data : [];
        } else {
            console.error('Failed to fetch channels:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching channels:', error);
        return [];
    }
}

function Channles() {
    const location = useLocation();
    const { user, channels: initialChannels } = location.state as {
        user: User;
        channels: Channels;
    };
    
    const navigate = useNavigate();
    const [isCreateServerOpen, setIsCreateServerOpen] = useState(false);
    const [channels, setChannels] = useState<Channels[]>([]);
    
    const isOpen = () => {
        setIsCreateServerOpen(!isCreateServerOpen);
    };

    const handleChannel = (index: number ,channelName: string) => {
        if (channelName === user.userName) {
            navigate("/UserPage", { state: { user } });
        } else {
            navigate("/ChannelPage", {
                state: { user, channels: channels[index] },
            });
        }
    };
    
    console.log(location.state);
    
    // Fetch channels on component mount
    useEffect(() => {
        const fetchChannels = async () => {
            const fetchedChannels = await GetChannels(user.userName);
            setChannels(fetchedChannels);
        };
    
        fetchChannels();
    }, [user.userName]);
    
    return (
        <Flex className='pannel' direction="column" gap="xs">
            <Flex direction="column" gap="xs">
                    <div className="channel-container">
                        <Avatar
                            className='myChannel'
                            src={user.img}
                            color='white'
                            onClick={() => handleChannel(0, user.userName)}
                        />
                        <div className="hover-text-ForAvatar">{user.userName}</div>
                        <p/>
                    </div>
                {channels.map((channel, index) => (
                    <div key={index} className="channel-container">
                        <Avatar
                            className='otherChannels'
                            src={channel.image}
                            color='white'
                            onClick={() => handleChannel(index, channel.channelName)}
                        />
                        <div className="hover-text">{channel.channelName}</div>
                    </div>
                        
                ))}
                <div className="add-channel-container">
                    <Button className="addChannelButton" onClick={isOpen}>
                        <h1>+</h1>
                    </Button>
                    <div className="hover-text-ForButton">Create a new channel</div>
                </div>

                   {isCreateServerOpen && (
                    <Card className='model-overlay' onClick={isOpen}>
                        <Flex direction="column" gap="xs" className='model-content' onClick={(e) => e.stopPropagation()}>
                            <Flex style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" color="white" style={{ backgroundColor: "rgb(55, 54, 54)" }} onClick={isOpen}>
                                    X
                                </Button>
                            </Flex>
                            <CreateServer />
                        </Flex>
                    </Card>
                )}
            </Flex>
        </Flex>
    );
}

export default Channles;
