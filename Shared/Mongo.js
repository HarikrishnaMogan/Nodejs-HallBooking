const {MongoClient} = require("mongodb");

//const MONGOURL = "mongodb+srv://hari437:hall437@cluster0.goe26.mongodb.net/hall?retryWrites=true&w=majority";
//const DATABASE = "hall";
const client = new MongoClient(process.env.MONGOURL);

const mongo ={
    db:null,
    
    rooms:null,
    customers:null,

    async connect()
    {
        //connecting mongodb
        await client.connect();
        console.log("mongodb connected");

        this.db = client.db(process.env.DATABASE);
        this.rooms = this.db.collection("rooms");
        this.customers= this.db.collection("customers");
        console.log("connected to database");

    }

}

module.exports = mongo;