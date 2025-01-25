import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../css/LoginPage.css';
import { useForm } from '@mantine/form';
import { Button, TextInput, PasswordInput, Flex, Title } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';

const registerUser = async (email: string, displayName: string, userName: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${loginRoute}/Register`, {email, displayName, userName, password});
        if (response.status === 200) {
            alert(response.data);
            return true;
        } else {
            alert("Unexpected response status: " + response.status);
            return false;
        }
    } catch (error) {
        console.error("Error in registerUser:", error); // Log error for debugging
        alert("An error occurred during registration.");
        return false;
    }
};


function Register () {
    const navigate = useNavigate();

    const icon = <IconAt size={16} />;

    const form = useForm({
        initialValues: {
            email: '',
            displayName: '',
            userName: '',
            password: ''
        },
        validate: {
            email: (value) => (value.trim() ? null : "Email is require"),
            displayName: (value) => (value.trim() ? null : "display Name is require"),
            userName: (value) => (value.trim() ? null : "userName is require"),
            password: (value) => (value.trim() ? null : "password is require"), 
        }
    });

    const Registering = async (values: {email: string, displayName: string, userName:string, password: string}) => {

        const {email, displayName, userName, password} = values;
    
        const result = await registerUser(email, displayName, userName, password);
    
        if (result) {
            navigate("/"); 
        }
    };

    return (
        <>
            <form className="border" onSubmit={form.onSubmit(Registering)}>
                <Title className="title">Create an account</Title>
                <Flex direction={"column"} gap={"md"}>
                    <TextInput 
                        withAsterisk
                        label="Email"
                        placeholder="Enter your email"
                        type="Email"
                        rightSectionPointerEvents="none"
                        rightSection={icon}
                        {...form.getInputProps("email")}
                        styles={{
                            input: {
                                backgroundColor: '#202225',
                                color: "white"
                            },
                            label: {
                                fontFamily: "sans-serif"
                            }
                        }}
                    />
                </Flex>
                <Flex direction={"column"} gap={"md"}>
                    <TextInput 
                        withAsterisk
                        label="Display Name"
                        placeholder="Enter your display name"
                        {...form.getInputProps("displayName")}
                        styles={{
                            input: {
                                backgroundColor: '#202225',
                                color: "white"
                            },
                            label: {
                                fontFamily: "sans-serif"
                            }
                        }}
                    />
                </Flex>
                <Flex direction={"column"} gap={"md"}>
                    <TextInput 
                        withAsterisk
                        label="UserName"
                        placeholder="Enter your userName"
                        {...form.getInputProps("userName")}
                        styles={{
                            input: {
                                backgroundColor: '#202225',
                                color: "white"
                            },
                            label: {
                                fontFamily: "sans-serif"
                            }
                        }}
                    />
                </Flex>
                <Flex direction={"column"} gap={"md"}>
                    <PasswordInput 
                        withAsterisk
                        label="Password"
                        placeholder="Enter your Password"
                        {...form.getInputProps("password")}
                        styles={{
                            input: {
                                backgroundColor: '#202225',
                                color: "white"
                            },
                            label: {
                                fontFamily: "sans-serif"
                            }
                        }}
                    />
                </Flex>
                <Flex direction={"column"} gap={"md"}>
                    <Button type="submit" size="md" className="button" onClick={() => Registering}>Continue</Button>
                    <h6 className="spacial-text">By registering, you agree to Discord's Terms of Service and Privacy Policy</h6>
                </Flex>
                <Button variant="subtle" color="blue" className="text-button" onClick={() => Registering}>Already have an account?</Button>
                
            </form>
        </>
    )
}

export default Register;