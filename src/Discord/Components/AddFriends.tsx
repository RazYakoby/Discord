import { Button, ScrollArea, Flex, Image, Title,Text, Container, Box, Avatar, Textarea, TextInput } from '@mantine/core';
import { useState } from 'react';



function AddFriends () {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Flex direction={"column"} gap={"xs"} style={{ position: "absolute", left: "0%", top: "90px", maxHeight: "50px" }}>
            <Title style={{color: "white", fontSize: "20px", fontFamily: "serif", position:"relative" ,left: "40px"}}>Add Friends</Title>
            <h4 style={{position: "relative", bottom: "30px", left:"40px"}}>You can add friends with their Discord username</h4>
            <TextInput
                type="text"
                placeholder="You can add friends with their Discord username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                styles={{
                input: {
                    backgroundColor: '#202225',
                    color: "white",
                    position: "relative",
                    bottom: "25px",
                    left: "50px",
                    width: "350px"
                },
                label: {
                    fontFamily: "sans-serif", 
                    position: "relative",
                    top: "-2%"
                }
                
            }}   
            rightSection={
                <Button
                    onClick={() => console.log("Friend Added")}
                    disabled={!searchTerm.trim()} 
                    style={{
                        position: "absolute",
                        right: "-37px",
                        bottom: "24px",
                        backgroundColor: "#5865F2",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: searchTerm.trim() ? "pointer" : "not-allowed", 
                    }}
                >
                Send Friend Request
              </Button>
            }   
            />
        </Flex>
    )
}

export default AddFriends;