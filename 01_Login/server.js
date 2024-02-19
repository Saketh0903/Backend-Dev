const exp=require('express')

const app=exp()

const userApp=require('./user-api')
const mc=require('mongodb').MongoClient
mc.connect('mongodb://localhost:27017')
.then(client=>{
    const conObj=client.db('backend')
    const usersCollectionObj=conObj.collection('usersCollection')
    app.set('usersCollectionObj',usersCollectionObj)
    console.log("Database connected successfully")
})
.catch(err=>{
    console.log("Mongodb not connected")
})

app.use('/user-api/',userApp)

app.listen(4000,()=>console.log("Server is running"))