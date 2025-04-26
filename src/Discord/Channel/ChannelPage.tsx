import { Title } from "@mantine/core";
import Channles from "../User/Channels";
import UserSetting from "../User/UserSetting";
import ChannelDisplay from "./ChannelDisplay";
import Groups from "./Groups";
import ChannelName from "./ChannelName";
import ChannelTitles from "./ChannelTitles";

function ChannelPage () {

    return (

        <>
            <Channles/>
            <ChannelName/>
            <Groups/>
            <UserSetting/>
            <ChannelTitles/>
            <ChannelDisplay/>
        </>
    )
}

export default ChannelPage;