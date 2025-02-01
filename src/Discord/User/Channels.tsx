import { useEffect, useState } from 'react';
import '../../css/Channels.css';
import CreateServer from './CreateServer';
import { Button, Flex, Avatar, Card } from '@mantine/core';

import axios from 'axios';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';

/*const GetChannels = async (): Promise<Channels[]> => {
    try {
        const response = await axios.post(`${baseRoute}${loginRoute}/GetChannels`);
        if (response.status === 200) {
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            return Array.isArray(response.data) ? response.data : [];
        } else {
            console.error('Failed to fetch stories:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching user stories:', error);
        return [];
    }
} */

interface Channels {
    userName: string[];
    onClick: () => void;
}

function Channles () {

    const [isCreateServerOpen, setIsCreateServerOpen] = useState(false);
    const [channels, setChannels] = useState<Channels[]>([]);
    const isOpen = () => {
        setIsCreateServerOpen(!isCreateServerOpen);
    }

    //useEffect(() => {
        //const fetch = async () => {
            //const fetchChannels = await GetChannels();
            //setChannels(fetchChannels);
        //}
        //fetch();
   // }, []);

    return (
        <Flex className='pannel'>
            <Avatar
                className='myChannel'
                src={null} 
                alt="no image here"
                color='white'
            />
            <p/>
            <Flex>
                <Button className='addChannelButton' onClick={isOpen}><h1>+</h1></Button>
                {!isCreateServerOpen && (
                    <button className='addChannelButton' onClick={isOpen}><h1>+</h1> <div className="hover-text">Add a Server</div></button>
                )}
                {isCreateServerOpen && (
                    <Card className='model-overlay' onClick={isOpen}>
                        <Flex direction="column" gap="xs" className='model-content' onClick={(e) => e.stopPropagation()}>
                            <Flex style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" color="white" style={{ backgroundColor: "rgb(55, 54, 54)" }} onClick={isOpen}>
                                    X
                                </Button>
                            </Flex>
                            <CreateServer/>
                        </Flex>
                    </Card>
                )}
            </Flex>
        </Flex>
    )
}

export default Channles;