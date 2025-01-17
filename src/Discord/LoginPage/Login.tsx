import '../../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';

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

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page refresh
        const userName = (document.getElementById("userName") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (!userName || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const success = await loginIn(userName, password);
        if (success) {
            navigate(`/UserPage/${userName.toString()}`);
        } else {
            alert("Login failed. Please check your username and password.");
        }
    };

    const redirectToRegister = () => {
        navigate("/Register");
    };

    const ForgotPassword = () => {
        navigate("/ForgotPassword");
    }

    return (
        <>
            <form className="border" onSubmit={handleLogin}>
                <h2>Welcome Back!</h2>
                <h4>We're so excited to see you again!</h4>

                <div className="div">
                    <label>Username</label>
                    <input type="text" id="userName" placeholder="Enter your username" />
                </div>
                <div className="div">
                    <label>Password</label>
                    <input type="password" id="password" placeholder="Enter your password" />
                    <label className="text-button" onClick={ForgotPassword}>Forgot your password?</label>
                </div>
                <div className="div">
                    <button type="button" className="button" onClick={handleLogin}>Login</button>
                    <label>Need an account?</label>
                    <label className="text-button" onClick={redirectToRegister}> Register</label>
                </div>
            </form>
        </>
    );
}

export default Login;
