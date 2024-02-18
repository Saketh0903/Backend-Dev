const exp=require('express')

const app=exp()

const userApp=require('./usersApi')
const productApp=require('./productApi')
const mc=require('mongodb').MongoClient
mc.connect('mongodb://localhost:27017')
.then(client=>{
    const conObj=client.db('backend')
    const collectionObj=conObj.collection('usersCollection')
    app.set('usersCollectionObj',collectionObj)
    console.log("Database connected successfully")
})
.catch(err=>{
    console.log("Mongodb not connected")
})

app.use('/user-api/',userApp)
app.use('/product-api/',productApp)

app.listen(4000,()=>console.log("Server is running"))