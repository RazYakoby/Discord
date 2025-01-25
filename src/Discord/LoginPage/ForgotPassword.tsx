import "../../css/LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { Button, TextInput, PasswordInput, Flex, Title } from '@mantine/core';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';

const UserFound = async (userName: string, password: string): Promise<boolean> => {
    try { 
        const response = await axios.post(`${baseRoute}${loginRoute}/Login`, { userName, password });
        if (response.status === 200) {
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error:", error); 
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred while logging in.");
        }
        return false;
    } 
}

const PasswordUpdated = async (userName: string, password: string, newPassword: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${loginRoute}/PasswordUpdating`, {
            userName,
            password,
            newPassword,
        });
        if (response.status === 200) {
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error:", error); 
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred while logging in.");
        }
        return false;
    }
}

function ForgotPassword() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            userName: '',
            password: '',
            newPassword: '',
            termsOfService: false,
        },
        validate: {
            userName: (value) => (value.trim() ? null : 'Username is required'),
            password: (value) => (value.trim() ? null : 'Password is required'),
            newPassword: (value) => (value.trim() ? null : 'newPassword is required'),
        },
    });

    const passwordUpdating = async (values: { userName: string, password: string, newPassword: string }) => {
        const { userName, password, newPassword } = values;

        if (!userName || !password || !newPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (await UserFound(userName, password)) {
            await PasswordUpdated(userName, password, newPassword);
            alert("Seccessfully");
            navigate("/Login");
        }
    }

    const BackToLogin = () => {
        navigate("/Login");
    }
    return (
        <>
            <form className="border" onSubmit={form.onSubmit(passwordUpdating)}>
                <Title size={"xl"} className="title">Reset Your Password</Title>
                <Flex direction={"column"} gap={"xs"}>
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
                <Flex direction={"column"} gap={"xs"}>
                    <PasswordInput 
                        withAsterisk
                        label="Password"
                        placeholder="Enter your password"
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
                <Flex direction={"column"} gap={"xs"}>
                    <PasswordInput 
                        withAsterisk
                        label="New Password"
                        placeholder="Enter your new password"
                        {...form.getInputProps("newPassword")}
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
                <Flex>
                    <Button className="button" type="submit" size="md" fullWidth onClick={() => passwordUpdating}>Update</Button>
                </Flex>
                <Button variant="subtle" color="blue" style={{marginTop: "10px"}} onClick={BackToLogin}>Back</Button>
                
            </form>
        </>
    );
}

export default ForgotPassword;