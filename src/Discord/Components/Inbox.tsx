import { Avatar, Button, Flex, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaDiscord } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const baseRoute = "http://localhost:3200";
const mainRoute = "/main";

interface User {
  id: string;
  email: string;
  displayName: string;
  userName: string;
  friends: string[];
  requests: string[];
  isOnline: boolean;
  img: string;
  lastActive: Date;
  status: string;
}

const Inbox = () => {
  const location = useLocation();
  const user = location.state as User;
  const [requests, setRequests] = useState<User[]>([]);
  const [clicked, setClicked] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    try {
      const response = await axios.post(`${baseRoute}${mainRoute}/getAllRequests`, { userName: user.userName });

      if (Array.isArray(response.data)) {
        setRequests(response.data);
        console.log("Requests updated:", response.data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  }, [user.userName]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleAccept = async (friendUserName: string) => {
    setClicked(friendUserName);
    setTimeout(async () => {
      setRequests((prev) => prev.filter((req) => req.userName !== friendUserName));
      await axios.post(`${baseRoute}${mainRoute}/insertFriends`, {
        userName: user.userName,
        friendName: friendUserName,
      });
      await axios.post(`${baseRoute}${mainRoute}/insertFriends`, {
        userName: friendUserName,
        friendName: user.userName,
      });
      await axios.post(`${baseRoute}${mainRoute}/rejectFriends`, {
        userName: user.userName,
        friendName: friendUserName,
      });
      await axios.post(`${baseRoute}${mainRoute}/rejectFriends`, {
        userName: friendUserName,
        friendName: user.userName,
      });
      setClicked(null);
      console.log(`Accepted request from ${friendUserName}`);
    }, 300);
  };

  const handleReject = async (friendUserName: string) => {
    setClicked(friendUserName);
    setTimeout(async () => {
      setRequests((prev) => prev.filter((req) => req.userName !== friendUserName));
      await axios.post(`${baseRoute}${mainRoute}/rejectFriends`, {
        userName: user.userName,
        friendName: friendUserName,
      });
      setClicked(null);
      console.log(`Rejected request from ${friendUserName}`);
    }, 300);
  };

  return (
    <Flex className="model-overlay2">
      <Flex className="model-content2">
        <Title c={"white"} size={20} m={20}>
          Inbox
        </Title>

        <Flex direction={"column"} pos={"absolute"} top={60} left={-10}>
          <AnimatePresence>
            {requests.length > 0 ? (
              requests.map((friend) => (
                <motion.div
                  key={friend.id}
                  layout // 🔥 Enables smooth shifting
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }} // 🔥 Moves up & fades out
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth animation
                >
                  <Flex direction={"row"} align={"center"}>
                    <Button className="flexabillty">
                      {friend.img ? (
                        <Avatar
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
                        <FaDiscord
                          size={40}
                          style={{
                            margin: "0px 10px 0px 0px",
                            color: "#ffffff",
                            backgroundColor: "#5865F2",
                            borderRadius: "50%",
                            padding: "5px",
                            border: "2px solid #2f3136",
                          }}
                        />
                      )}
                      <span style={{ margin: "3px 3px 3px 3px" }}>{friend.userName} </span>
                    </Button>
                    <Flex pos={"relative"} top={-10} mt={10} ml={10}>
                      <motion.button
                        whileTap={{ scale: 0.9 }} // 🔥 Shrinks when clicked
                        whileHover={{ scale: 1.1 }} // 🔥 Slight hover effect
                        animate={clicked === friend.userName ? { opacity: 0.5 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          width: "85px",
                          height: "45px",
                          marginRight: "5px",
                          background: "#4CAF50",
                          border: "none",
                          color: "white",
                          cursor: "pointer",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleAccept(friend.userName)}
                      >
                        Accept
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        animate={clicked === friend.userName ? { opacity: 0.5 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          width: "85px",
                          height: "45px",
                          background: "#F44336",
                          border: "none",
                          color: "white",
                          cursor: "pointer",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleReject(friend.userName)}
                      >
                        Reject
                      </motion.button>
                    </Flex>
                  </Flex>
                </motion.div>
              ))
            ) : (
              <Flex c={"white"} pos={"relative"} left={30} top={10}>
                No friend requests
              </Flex>
            )}
          </AnimatePresence>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Inbox;
