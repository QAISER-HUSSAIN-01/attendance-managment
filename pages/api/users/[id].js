import connect from '../../../db';
import User from '../../../model/users';
export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                await connect();
                const user = await User.find();
                if(user){
                    res.status(200).json({ message: 'user found',data:user });
                }
                throw Error('no user found');
            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
        case 'POST':
            try {
                await connect();      
                const delUser = await User.findByIdAndDelete(req.query.id);
                res.status(200).json({ message: 'Deleted',data: delUser });
            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
    }

}