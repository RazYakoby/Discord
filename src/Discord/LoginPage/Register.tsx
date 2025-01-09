import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../css/LoginPage.css';
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

    const Registering = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const displayName = (document.getElementById("displayName") as HTMLInputElement).value;
        const userName = (document.getElementById("userName") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
    
        const result = await registerUser(email, displayName, userName, password);
    
        if (result) {
            navigate("/"); 
        }
    };

    return (
        <>
            <form className="border">
                <h2>Create an account</h2>
                <div>
                    <label>Email</label>
                    <input id="email"></input>
                </div>
                <div>
                    <label>DISPLAY NAME</label>
                    <input id="displayName"></input>
                </div>
                <div>
                    <label>USERNAME</label>
                    <input id="userName"></input>
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input id="password"></input>
                </div>
                <div>
                    <button className="button" onClick={Registering}>Continue</button>
                    <h6 className="spacial-text">By registering, you agree to Discord's Terms of Service and Privacy Policy</h6>
                </div>
                <h3 className="text-button" onClick={Registering}>Already have an account?</h3>
                
            </form>
        </>
    )
}

export default Register;