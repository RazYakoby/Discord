import "../../css/LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const PasswordUpdating = async (event: React.FormEvent) => {
        event.preventDefault();
        const userName = (document.getElementById("userName") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
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
            <form className="border" onSubmit={PasswordUpdating}>
                <h2>Reset Your Password</h2>
                <div>
                    <label>UserName</label>
                    <input id="userName"></input>
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input id="password"></input>
                </div>
                <div>
                    <label>New PASSWORD</label>
                    <input id="newPassword"></input>
                </div>
                <div>
                    <button className="button" onClick={PasswordUpdating}>Update</button>
                </div>
                <h3 className="text-button" onClick={BackToLogin}>Back</h3>
                
            </form>
        </>
    );
}

export default ForgotPassword;