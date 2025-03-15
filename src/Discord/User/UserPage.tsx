import Channles from "./Channels";
import ChatNStaff from "./Chat&staff";
import Search from "./Search";
import Titles from "./Titles";
import UserSetting from "./UserSetting";

function UserPage () {

    
    return (
        <>
            <Channles/>
            <Search/>
            <ChatNStaff/>
            <UserSetting/>
            <Titles />       
        </>
    )
}

export default UserPage;