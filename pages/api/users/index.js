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
                const{id,name,attendance:attend,index} = req.body;
                
                // console.log(req.body);
                // const newUser= await User.create(req.body);
                // res.status(200).json({ message: 'post request run',data: newUser });
          
                const exist = await User.findById(id);
                exist.attendance[index] = attend;
                console.log('new attendance array: ',exist.attendance);
                const newUser = await User.findByIdAndUpdate(id,{
                    id:exist._id,
                    name:exist.name,
                    attendance:exist.attendance,
                });
                res.status(200).json({ message: 'post request run',data: newUser });

            } catch (error) {
                res.status(404).json({ message: 'bad request' });
            }
            break;
    }

}