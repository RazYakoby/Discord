import Channles from "./Channels";
import ChatNStaff from "./Chat&staff";
import Display from "./Display";
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
            <Titles/>
            <Display/>
        </>
    )
}

export default UserPage;