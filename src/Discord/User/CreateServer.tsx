import '../../css/CreateServer.css';
import { Button, ScrollArea, Flex, Image, Title,Text, Container } from '@mantine/core';

function CreateServer () {

    return (
        <Container px={0}>
            <Title className='title' style={{top: "-4%"}}>Create Your Server</Title>
            <h6 className='subTitle'>Your Server is Where you and your friends hang out. Make</h6>
            <h6 className='subTitle'>yours and start talking</h6>
            <Flex className='serversTitle'>
                <ScrollArea h={250} type="always" scrollbarSize={6}>
                    <Button><Image></Image> Create My Own</Button>
                    <Text size='sm' span pos={"relative"} left={"2%"}>START FROM A TEMPLATE</Text>
                    <Button><img></img> Gaming</Button>
                    <Button><img></img> School Club</Button>
                    <Button><img></img> Study Group</Button>
                    <Button><img></img> Friends</Button>
                    <Button><img></img> Artists & Creators</Button>
                    <Button><img></img> Local Community</Button>
                </ScrollArea>
            </Flex>
            <Flex direction={"column"} justify={"center"} align={"flex-end"} gap={"xs"}>
                <Button mt={"md"} fullWidth style={{backgroundColor: "rgb(90, 89, 89)", width: "95%", right:"3%"}}>Join a Server</Button>
                <Button variant={"subtle"} color={"blue"} style={{width:"95%", right: "3%"}} fullWidth>Have an invite already?</Button>
            </Flex>
        </Container>
    )
}

export default CreateServer;