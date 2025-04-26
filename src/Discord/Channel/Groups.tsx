import { Button, Flex } from "@mantine/core";
import '../../css/Groups.css';
import { IoIosAdd } from "react-icons/io";

function Groups () {

    return (

        <>
            <Flex className="groups">
                <Flex direction="column" gap="xs">
                    <h4 className="textChannel">
                        Text Channel
                        <Button className="bg">
                            <IoIosAdd />
                            <div className="hover-text1">Create Channel</div>
                        </Button>
                    </h4> 
                    <h4 className="textChannel">
                        Voice Channel
                        <Button className="bg2">
                            <IoIosAdd />
                            <div className="hover-text2">Create Channel</div>
                        </Button>
                    </h4>            
                </Flex>
            </Flex>
        </>
    )
}

export default Groups;