import { useRef, useState } from 'react';
import '../../css/CreateServer.css';
import { Button, ScrollArea, Flex, Image, Title, Text, Container, TextInput } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const baseRoute = 'http://localhost:3200';
const mainRoute = '/main';

const CreateChannel = async (channelName: string, image: string, serverType:string, manager: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${mainRoute}/addChannel`, { channelName, image, serverType, manager});
        if (response.status === 200) {
            alert(response.data.message || "Create successful!");
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error in Creation:", error);
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred while Create Channel.");
        }
        return false;
    }
};

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

function CreateServer() {
    const [selectedServer, setSelectedServer] = useState<string>("");
    const [finelSelectedServer, setFinelSelectedServer] = useState(false);
    const location = useLocation();
    const user = location.state as User;
    const [searchTerm, setSearchTerm] = useState(`${user.userName}'s server`);
    const [imageSrc, setImageSrc] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click(); 
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImageSrc(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleServerSelection = (serverType: string) => {
        setSelectedServer(serverType);
    };

    const BackToServerSelection = (serverType: any) => {
        setSelectedServer(serverType);
        setFinelSelectedServer(false);
    }

    const finelServer = () => {
        setFinelSelectedServer(true);
    }

    const createChannel = async () => {
        if (imageSrc != "") {
            await CreateChannel(searchTerm, imageSrc, selectedServer, user.userName);
        }
    }

    return (
        <>
            <AnimatePresence mode="wait">
            {!selectedServer && !finelSelectedServer && (
                <Container px={0}>
                     <motion.div
                        key="selection-screen"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                    <Title className='title' style={{ top: "-4%" }}>Create Your Server</Title>
                    <h6 className='subTitle'>Your Server is Where you and your friends hang out. Make</h6>
                    <h6 className='subTitle'>yours and start talking</h6>
                    <Flex className='serversTitle'>
                        <ScrollArea h={250} w={415} type="always" scrollbarSize={6}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("CreateMyOwn")}>Create My Own</Button>
                        </motion.div>
                            <Text size='sm' span pos={"relative"} left={"2%"}>START FROM A TEMPLATE</Text>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("Gaming")}>Gaming</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("SchoolClub")}>School Club</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("StudyGroup")}>Study Group</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("Friends")}>Friends</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("LocalCommunity")}>Local Community</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => handleServerSelection("ArtistsNCreators")}>Artists & Creators</Button>
                        </motion.div>
                        </ScrollArea>
                    </Flex>
                    <Flex direction={"column"} justify={"center"} align={"flex-end"} gap={"xs"}>
                        <Button mt={"md"} fullWidth style={{ backgroundColor: "rgb(90, 89, 89)", width: "95%", right: "3%" }}>Join a Server</Button>
                        <Button variant={"subtle"} color={"blue"} style={{ width: "95%", right: "3%" }} fullWidth>Have an invite already?</Button>
                    </Flex>
                    </motion.div>
                </Container>
            )}

            {selectedServer && !finelSelectedServer && (
                <Container>
                    <motion.div
                        key="details-screen"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                    <Title className='title' style={{ top: "-4%" }}>Tell Us More About Your Server</Title>
                    <h6 className='subTitle' style={{ fontSize: "14px" }}>In order to help you with your setup, is your new server for</h6>
                    <h6 className='subTitle' style={{ fontSize: "14px" }}>just a few friends or a larger community?</h6>
                    <Flex className='serversTitle'direction={"column"} gap={5} mt={10}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={finelServer}>For me and my friends</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={finelServer}>For a club or community</Button>
                        </motion.div>
                    </Flex>
                    <Flex direction={"column"} justify={"center"} align={"flex-end"} mt={10}>
                        <Button onClick={() => BackToServerSelection(null)} variant={"subtle"} color={"blue"} style={{ width: "100%" }} fullWidth>Back</Button>
                    </Flex>
                    </motion.div>
                </Container>
            )}

            {finelSelectedServer && (
                <Container>
                    <motion.div
                        key="details-screen"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                    <Title className='title' style={{ top: "-4%" }}>Customize Your Server</Title>
                    <h6 className='subTitle' style={{ fontSize: "14px" }}>Give your new server a personality with a name and an</h6>
                    <h6 className='subTitle' style={{ fontSize: "14px" }}>icon. You can always change it later.</h6>
                    <Flex justify="center" align="center" mt={10}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <Image
                            radius="md"
                            h={100}
                            w={100}
                            src={imageSrc || "https://placehold.co/200x200?text=Upload"}
                            fallbackSrc="https://placehold.co/200x200?text=Placeholder"
                            style={{ cursor: "pointer", "borderRadius": "50%" }}
                            onClick={handleImageClick}
                        />
                    </Flex>
                    <h6 className='subTitle' style={{ fontSize: "14px", textAlign:"left", marginTop:"5px" }}>SERVER NAME</h6>
                    <TextInput
                        type="text"
                        placeholder={`${user.userName}'s server`} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        styles={{
                            input: {
                            backgroundColor: '#202225',
                            color: "white",
                            width: "400px",
                            position: "relative",
                            top: "5px",
                            fontSize: "18px"
                        }
                        }}
                    />
                    <Flex direction={"column"} justify={"center"} align={"flex-end"} mt={10}>
                        <Button onClick={() => BackToServerSelection(null)} variant={"subtle"} color={"blue"} style={{ width: "100%" }} fullWidth>Back</Button>
                    </Flex>
                    <Flex direction={"column"} justify={"center"} align={"flex-end"} mt={10}>
                        <Button onClick={createChannel} variant={"subtle"} color={"blue"} style={{ width: "100%" }} fullWidth>Create</Button>
                    </Flex>
                    </motion.div>
                </Container>
            )}
            </AnimatePresence>
        </>
    );
}

export default CreateServer;
