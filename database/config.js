const { mongoose } = require('mongoose');

const dbConnection = async ()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         
        })
        console.log('Db Conectada...')
    
    } catch (error) {
        console.log(error)
        throw new Error('ERROR A LA HORA DE INICIAR LA DB')
    }
} 

module.exports = { dbConnection }; 