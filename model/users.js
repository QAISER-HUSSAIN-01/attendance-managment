import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:String,
    attendance:[{type:String}]
}
,
{
timestamps:true
}
);
const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User;