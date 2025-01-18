import { useEffect, useState } from 'react';
import '../../css/Channels.css';
import CreateServer from './CreateServer';
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
        <div className='pannel'>
            <img
                className='myChannel'
                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuMFvTh3hIO21nydJ3Lxv38Mg_odpdDAYvnegLGP1DYXQTzCzCMCYtXz_t8ulkQP_7dQ&usqp=CAU'}
                alt="Avatar"
            />
            <p/>
            <div>
                <button className='addChannelButton' onClick={isOpen}><h1>+</h1></button>
                {!isCreateServerOpen && (
                    <button className='addChannelButton' onClick={isOpen}><h1>+</h1> <div className="hover-text">Add a Server</div></button>
                )}
                {isCreateServerOpen && (
                    <div className='model-overlay' onClick={isOpen}>
                        <div className='model-content' onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal-btn" onClick={isOpen}>
                                X
                            </button>
                            <CreateServer/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Channles;