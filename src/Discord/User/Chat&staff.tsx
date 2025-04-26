import '../../css/Chat&staff.css';
import { useLocation } from "react-router-dom";
import {Avatar, Button, Flex } from '@mantine/core';
import { FaDiscord, FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import {create} from "zustand";
import { useEffect, useState } from 'react';

import axios from 'axios';

const baseRoute = 'http://localhost:3200';
const mainRoute = '/main';

const useAllUserStatus = (userName: string) => {
  const [users, setUsers] = useState<User[]>([]); 
  useEffect(() => {
      const fetchOnlineFriends = async () => {
          try {
              const response = await axios.post(`${baseRoute}${mainRoute}/getAllFriends`, { userName });
              console.log(response.data);

              if (Array.isArray(response.data)) {
                  const userItems: User[] = response.data.map((item: any) => ({
                      id: item.id || "", 
                      email: item.email || "",
                      displayName: item.displayName || "",
                      userName: item.userName || "",
                      password: item.password || "", 
                      friends: item.friends || [],
                      isOnline: item.isOnline || false,
                      img: item.img || "",
                      lastActive: new Date(item.lastActive) || new Date(),
                      status: item.status || "offline", 
                  }));
                  console.log(userItems);
                  setUsers(userItems); 
              } else {
                  setUsers([]); 
              }
          } catch (error) {
              console.error("Error fetching online friends:", error);
          }
      };

      fetchOnlineFriends();
  }, [userName]);

  return users; 
};


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
  isOnline: boolean;
  img: string;
}

interface TitleProps {
  title: string;
  setTitle: (title: string) => void;
}

export const useStore = create<TitleProps>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}));

function App() {

  const location = useLocation();
  const { user, channels: initialChannels } = location.state as {
    user: User;
    channels: Channels;
};
  const {setTitle} = useStore();
  const allFriends = (useAllUserStatus(user.userName));
  const handleButtonClick = (name: string) => {
      setTitle(name);
  }

  return (
    <Flex direction={"column"} className='button1'>
      <Flex direction={"column"}gap={"xs"} className='space'>
        <Button className='flexabillty' onClick={() => handleButtonClick("Friends")}>
          <FaUserFriends size={40} style={{
            margin: "0px 8px 0px 0px",
            color: "#ffffff",
            backgroundColor: "transparent",
            padding: "3px",
          }}/>
          <span style={{margin: "1px 3px 1px 3px"}}>Friends</span>
        </Button>
        <Button className='flexabillty' onClick={() => handleButtonClick("Nitro")}>
          <IoLogoIonitron size={40} style={{
              margin: "0px 8px 0px 0px",
              color: "#ffffff",
              backgroundColor: "transparent",
              padding: "3px",
          }} />
          <span style={{margin: "1px 3px 1px 3px"}}>Nitro</span>
        </Button>
        <Button className='flexabillty' onClick={() => handleButtonClick("Shop")}>
          <GiShop size={40} style={{
            margin: "0px 8px 0px 0px",
            color: "#ffffff",
            backgroundColor: "transparent",
            padding: "3px",
          }}/>
          <span style={{margin: "1px 3px 1px 3px"}}>Shop</span>
        </Button>
      </Flex>
      <Flex direction={"column"} gap={"xs"} className='space2'>
        {allFriends.map((friend) => (
          <Button key={friend.id} className='flexabillty'>
            {friend.img ? (
              <Avatar
                key={friend.id}
                src={friend.img}
                style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                margin: "0px 10px 0px 0px",
                border: "2px solid #2f3136",
                backgroundColor: "#36393f", 
                }}
                alt="Avatar"
              />
            ) : (
                <FaDiscord size={40}     
                    style={{
                        margin: "0px 10px 0px 0px",
                        color: "#ffffff",
                        backgroundColor: "#5865F2",
                        borderRadius: "50%",
                        padding: "5px",
                        border: "2px solid #2f3136",
                  }} />
            )}
            <span style={{margin: "3px 3px 3px 3px"}}>{friend.userName} </span>
        </Button>
      ))} 
      </Flex>
    </Flex>
  );
}
export default App;