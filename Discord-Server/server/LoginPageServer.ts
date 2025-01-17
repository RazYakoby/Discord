import express, {Request, Response} from 'express';
import { SetUser, UserExist, EmailExist, PasswordUpdating, GetFriends } from './MongoDB';
import { error } from 'console';

const router = express.Router();

router.post("/Register", async (req: Request, res: Response) => {
    try {
        const {email, displayName, userName, password} = req.body;
        if (!email || !displayName)
            return res.status(400).send('Email or displayName are require');
        if (!userName || !password)
            return res.status(400).send("userName or password are require");
        if (await UserExist(userName))
            return res.status(400).send(`User with name ${userName} already exists`);
        if (await EmailExist(email))
            return res.status(400).send(`User with Email ${email} already exists`);
        else {
            await SetUser(email, displayName, userName, password, []);
            res.status(200).send("Use created successfully");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/Login", async (req: Request, res: Response) => {
    try {
        const {userName} = req.body;

        if (await UserExist(userName)){
            return res.status(200).send('Username and password are required');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/PasswordUpdating", async (req: Request, res: Response) => {
    try {
        const {userName, password, newPassword} = req.body;

        if (await UserExist(userName)) {
            PasswordUpdating(password, newPassword);
            return res.status(200).send('password updated');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

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

export const LoginPageServer = router;