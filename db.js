import mongoose, { mongo } from 'mongoose';

export default async function connect(){
    return new Promise((resolve,reject)=>{
        if(mongoose.connect(process.env.MONGO_URI)){
            console.log('database connected');
            resolve('database connected')
        }else{
            console.log('database not connected');
            reject('database not connected')
        }
    })
}