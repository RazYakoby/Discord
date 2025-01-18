import '../../css/UserSetting.css';
import { useLocation } from "react-router-dom";

interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    password: string;
    friends: string[];
    isOnline: boolean;
    img: string;
}

function UserSetting () {

    const location = useLocation();
    const user = location.state as User;

    return (
        <div className='button4'>
            <button className='flexabillty'>
                {user ? (
                    <>
                        <img
                            key={user.id}
                            src={user.img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuMFvTh3hIO21nydJ3Lxv38Mg_odpdDAYvnegLGP1DYXQTzCzCMCYtXz_t8ulkQP_7dQ&usqp=CAU'}
                            style={{ width: "32px", height: "32px", borderRadius: "50%", margin: "-3px 10px 0px -10px"}}
                            alt="Avatar"
                        />
                        <span style={{margin: "1px 3px 1px 3px"}}>{user.userName}</span>
                    </>
                ): (
                    <p>Loading user details...</p>
                )}
            </button>
        </div>
    )
}

export default UserSetting;