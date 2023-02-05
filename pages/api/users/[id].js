import db from '../../../db';
import User from '../../../model/users';
export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                await db.connect();
                const user = await User.find();
                if(user){
                    res.status(200).json({ message: 'user found',data:user });
                }
                // await db.disconnect();      
            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
        case 'POST':
            try {
                await db.connect();      
                const delUser = await User.findByIdAndDelete(req.query.id);
                res.status(200).json({ message: 'Deleted', data: delUser });
                // await db.disconnect();      
            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
    }

}