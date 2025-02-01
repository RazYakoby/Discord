import '../../css/Chat&staff.css';
import { useLocation } from "react-router-dom";
import {Avatar, Button, Flex } from '@mantine/core';
import { FaDiscord, FaUserFriends } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import { GiShop } from "react-icons/gi";

//import axios from 'axios';

//const baseRoute = 'http://localhost:3200';
//const loginRoute = '/main';

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

function App() {

  const location = useLocation();
  const user = location.state as User;
  
    return (
      <Flex direction={"column"} className='button1'>
        <Flex direction={"column"}gap={"xs"} className='space'>
          <Button className='flexabillty'>
            <FaUserFriends size={40} style={{
              margin: "0px 8px 0px 0px",
              color: "#ffffff",
              backgroundColor: "transparent",
              padding: "3px",
            }}/>
            <span style={{margin: "1px 3px 1px 3px"}}>Friends</span>
          </Button>
          <Button className='flexabillty'>
            <IoLogoIonitron size={40} style={{
                margin: "0px 8px 0px 0px",
                color: "#ffffff",
                backgroundColor: "transparent",
                padding: "3px",
            }} />
            <span style={{margin: "1px 3px 1px 3px"}}>Nitro</span>
          </Button>
          <Button className='flexabillty'>
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
          {user.friends.map((friend, index) => (
            <Button key={friend + index} className='flexabillty'>
              {user.img ? (
                <Avatar
                  key={user.id}
                  src={user.img}
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
              <span style={{margin: "3px 3px 3px 3px"}}>{friend} </span>
          </Button>
        ))} 
        </Flex>
      </Flex>
    );
  }
  export default App;