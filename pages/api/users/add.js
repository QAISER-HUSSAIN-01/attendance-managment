import mongoose from 'mongoose';
import db from '../../../db';
import User from '../../../model/users';
export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                await db.connect();
                const isUserExist = await User.find({ name: req.body.name });
                console.log('user exist',isUserExist);
                if (isUserExist[0]) {
                     return res.status(400).json({ message: 'user already exist', success:true })
                }else{
                    const newUser = await User.create(req.body);
                    console.log(newUser)
                    return res.status(201).json({ message: 'user created', data: newUser, success:true })
                }
               await db.disconnect();
            } catch (error) {
                res.status(404).json({ message: 'something went wrong' })
            }
            break;
    }
}