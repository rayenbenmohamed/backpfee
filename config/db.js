const mongoose = require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connexion à ala basse de donnéees réussie');
    }catch (euror){
        console.error("Erreur de connexion à la base de données:",euror.message)
        process.exit(1);

    }

};
module.exports=connectDB;