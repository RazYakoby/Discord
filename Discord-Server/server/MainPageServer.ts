import express, {Request, Response} from 'express';
import { GetFriends, GetOnline, GetUser, SetOffline, SetStatus } from './MongoDB';
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



export const mainPageServer = router;