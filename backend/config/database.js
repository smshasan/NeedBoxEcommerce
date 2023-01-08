const mongoose = require('mongoose')


const connectDatabase = () => {
    mongoose.connect(`mongodb+srv://Masud_Bhuyan:29187m!!!@cluster0.fazpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDb Database connected with HOST: ${con.connection.host}`)
    })
}



module.exports = connectDatabase