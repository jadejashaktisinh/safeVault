const userSchema = require('../../models/UserSchema');
const bcrypt = require('bcrypt');

const Signup = async (req,res) =>{

    let IsAlredyLogedIn = await userSchema.findOne({email:res.locals.data.email});

    if(!IsAlredyLogedIn){

        await bcrypt.hash(res.locals.data.password, 10).then((hash)=>{
            res.locals.data.password = hash;
        })
        
        newUser = new userSchema(res.locals.data);

        const user = await newUser.save()

        if(user){
           return res.status(200).send({
                success:true,
                message:"sign up successfull",
                name:user.firstName +" "+ user.lastName,
                _id:user._id
            })
        }else{
            
            return res.status(400).send({success:false,message:'something went wrong '})
        }

    }else{
        return res.status(400).send({success:false,message:'user already exists'})
    }
}

module.exports = Signup