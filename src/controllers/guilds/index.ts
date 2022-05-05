import { Request, Response } from 'express';
import { getBotGuildsService, getMutualGuildsService, getUserGuildsService } from '../../services/guilds';
import { User } from '../../database/schemas/Users';

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        res.send({ guilds });
    } catch (err) {
        console.log(err);
        res.sendStatus(400).send('Error');
    }
}