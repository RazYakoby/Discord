import express, {Request, Response} from 'express';
import { AddChannel, AddFriends, addMember, GetAllFriends, GetAllRequests, GetChannel, GetFriends, GetOnline, GetUser, InsertFriends, RejectFriends, SetOffline, SetStatus } from './MongoDB';
import { error } from 'console';

const router = express.Router();

router.post("/GetFriends", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        const friends = await GetFriends(userName); 
        return res.status(200).json(friends); 
    } catch (error) {
        console.error("Error retrieving friends:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/GetUser", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        if (userName.length > 0) {
            const user =  await GetUser(userName);
            return res.status(200).json(user); 
        } 
    }
    catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/set-online", async (req: Request, res: Response) => {
    try {
        const {userName, status} = req.body;
        const user = await SetStatus(userName, status);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/set-offline", async (req: Request, res: Response) => {
    try {
        const {userName, isOnline} = req.body;
        const user = await SetOffline(userName);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/getOnline", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        const user = await GetOnline(userName);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/getAllFriends", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        const user = await GetAllFriends(userName);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/getAllRequests", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        const user = await GetAllRequests(userName);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/addFriends", async (req: Request, res: Response) => {
    try {
        const { userName, friendName } = req.body;
        const user = await AddFriends(userName, friendName);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/insertFriends", async (req: Request, res: Response) => {
    try {
        const { userName, friendName } = req.body;
        const user = await InsertFriends(userName, friendName);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/rejectFriends", async (req: Request, res: Response) => {
    try {
        const { userName, friendName } = req.body;
        const user = await RejectFriends(userName, friendName);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/addChannel", async (req: Request, res: Response) => {
    try {
        const {channelName, image, serverType, manager} = req.body;
        const channel = await AddChannel(channelName, image, serverType, manager);
        return res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/addMember", async (req: Request, res: Response) => {
    try {
        const {channelName, member} = req.body;
        const channel = await addMember(channelName, member);
        return res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/GetChannels", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        const channels = await GetChannel(userName); 
        return res.status(200).json(channels); 
    } catch (error) {
        console.error("Error retrieving friends:", error);
        res.status(500).send("Internal Server Error");
    }
});


export const mainPageServer = router;