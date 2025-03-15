import '../../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, TextInput, PasswordInput, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import '@mantine/core/styles.css';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';
const mainRoute = '/main';

const loginIn = async (userName: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${baseRoute}${loginRoute}/Login`, { userName, password });
        if (response.status === 200) {
            alert(response.data.message || "Login successful!");
            return true;
        } else {
            alert(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error in loginIn:", error);
        if (axios.isAxiosError(error) && error.response) {
            alert(`Error: ${error.response.data.message || "Unknown error occurred"}`);
        } else {
            alert("An unexpected error occurred while logging in.");
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
    isOnline: boolean;
    img: string;
    lastActive: Date;
}

const GetUser = async (userName: string): Promise<User> => {
    let u: User = {
        id: "",
        email: "",
        displayName: "",
        userName: "",
        password: "",
        friends: [],
        isOnline: false,
        img: "",
        lastActive: new Date(),
    };

    try {
        const response = await axios.post(`${baseRoute}${mainRoute}/GetUser`, { userName });
        if (response.status === 200) {
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            if (Array.isArray(response.data)) {
                const userItems: User[] = response.data.map((item: any) => ({
                    id: item.id,
                    email: item.email,
                    displayName: item.displayName,
                    userName: item.userName,
                    password: item.password,
                    friends: item.friends,
                    isOnline: item.isOnline,
                    img: item.img,
                    lastActive: new Date(item.lastActive),
                }));
                return userItems[0];
            }
        }

        console.error('Failed to fetch user:', response.statusText);
    } catch (error) {
        console.error('Error fetching user:', error);
    }

    return u;
};

function Login() {
    const l = document.getElementsByName("login1");
    const form = useForm({
        initialValues: {
            userName: '',
            password: '',
            termsOfService: false,
        },
        validate: {
            userName: (value) => (value.trim() ? null : 'Username is required'),
            password: (value) => (value.trim() ? null : 'Password is required'),
        },
    });

    const navigate = useNavigate();

    const handleLogin = async (values: { userName: string, password: string }) => {
        const { userName, password } = values;

        if (!userName || !password) {
            alert("Please fill in all fields.");
            return;
        }
        const success = await loginIn(userName, password);
        if (success) {
            const user = await GetUser(userName);
            if (user) {
                navigate(`/UserPage`, { state: user });
            }
        } else {
            alert("Login failed. Please check your username and password.");
        }
    };
    
    
    
    const redirectToRegister = () => {
        navigate("/Register");
    };

    const ForgotPassword = () => {
        navigate("/ForgotPassword");
    };

    return (
        <Container size="sm">
            <form className="border" onSubmit={form.onSubmit(handleLogin)}>
                <h2>Welcome Back!</h2>
                <h4>We're so excited to see you again!</h4>

                <Flex direction="column" gap="md">
                    <TextInput
                        withAsterisk
                        label="Username"
                        placeholder="Enter your username"
                        {...form.getInputProps('userName')}
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

                    <Flex direction="column" gap="xs">
                        <PasswordInput
                            withAsterisk
                            label="Password"
                            placeholder="Enter your password"
                            {...form.getInputProps('password')}
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
                        <Button variant="subtle" color="blue" style={{display: "flex", textAlign: "left", justifyContent: "left"}} onClick={ForgotPassword}>
                            Forgot your password?
                        </Button>
                    </Flex>

                    <Button type="submit" size="md" fullWidth>
                        Login
                    </Button>

                    <Flex justify="space-between" align="center">
                        <Button variant="subtle" color="blue" onClick={redirectToRegister}>
                            Register
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Container>
    );
}

export default Login;
