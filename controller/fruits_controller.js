const Fruits =require("../model/fruits")
const redis = require('redis')
const redis_port = process.env.REDIS_PORT || 6379

const redisClient = redis.createClient(redis_port)

redisClient.connect();
redisClient.on("connect",function(err){
  console.log("connected Redis")
})

const add = async(req,res)=>{
    try {
        const key = "key" +req.body +"#"
        const resp = await redisClient.get(key);
        if(resp){
            console.log("get from cache")
           const result = JSON.parse(resp);
        console.log("response", resp);
        }else if (!result) {
            console.log("get from db.");
        const result = await Fruits.create(req.body);
      
            let setKey = "key1" + req.body + "#";
            await client.set(setKey, JSON.parse(result));
          }
          res.send(result);

    } catch (error) {
        res.send(error.message);
    }
}

const findall = (req,res)=>{
    try {
        let fruits= [];
        redisClient.get('fruits',async(err,fruits)=>{
            if(fruits){
                console.log("result from cache")
                fruits = JSON.parse(fruits)
                res.send(fruits)
            }else{
                console.log("result from db")
                const result = Fruits.findAll()
                fruits = result
                redisClient.setEx('fruits',600, JSON.string(result))
                res.send(fruits)
            }

        })
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = {add , findall}