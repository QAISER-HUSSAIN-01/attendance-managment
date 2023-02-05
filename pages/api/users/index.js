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
                    return res.status(400).json({ message: 'no users found',data:user });
                }else{
                    return res.status(200).json({ message: 'users found',data:user });
                }
            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
        case 'POST':
            try {
                await db.connect();
                const{id,name,attendance:attend,index} = req.body;
                const exist = await User.findById(id);
                exist.attendance[index] = attend;
                console.log('new attendance array: ',exist.attendance);
                const newUser = await User.findByIdAndUpdate(id,{
                    id:exist._id,
                    name:exist.name,
                    attendance:exist.attendance,
                });
                res.status(200).json({ message: 'post request run',data: newUser });
               await db.disconnect();
            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
    }

}