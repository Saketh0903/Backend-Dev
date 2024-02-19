const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

userApp.use('/users/:id',(req,res,next)=>{
    console.log("Displaying all users data");
    next()
})

userApp.use(exp.json())

function getMiddleware(req,res,next){
    console.log("Fetching requested data")
    next();
}

function deleteMiddleware(req,res,next){
    console.log("Deleting the requested user data")
    next()
}


function postMiddleware(req,res,next){
    console.log("Middleware for adding new user")
    console.log(req.body)
    next();
}

function putMiddleware(req,res,next){
    console.log("Middleware for put request")
    console.log(req.body)
    next();
}

userApp.use('/new-user',postMiddleware)
userApp.use('/user',putMiddleware)
userApp.use('/users',getMiddleware)
userApp.use('/user/:id',deleteMiddleware)



userApp.get('/users',async(req,res)=>{
    const usersCollectionObj=req.app.get('usersCollectionObj')
    const usersList=await usersCollectionObj.find().toArray()
    res.send({message:"All users",payload:{usersList}})
})



userApp.get('/users/:id',[(req,res,next)=>{console.log("Test 1");next()},(req,res,next)=>{console.log("Test2");next()}],(req,res)=>{
    let id=Number(req.params.id)
    console.log(id)
    let user=usersList.find((userObj)=>userObj.id===id)
    if(user!==undefined){
        res.send({message:"Single user",payload:user})
    }
    else{
        res.send("No users")
    }
    console.log(user)
})

userApp.get("/users/:name",async(req,res)=>{
    const usersCollectionObj=req.app.get('usersCollectionObj')
    let nameOfUser=req.params.name;
    let user=await usersCollectionObj.findOne({name:nameOfUser})
    res.send({message:"UserDetails",payload:user})
})

userApp.post('/new-user',async(req,res)=>{
    const usersCollectionObj=req.app.get('usersCollectionObj')
    const newUser=req.body
    const dbUser=await usersCollectionObj.findOne({username:newUser.username})
    if(dbUser!==null){
        res.send({message:"Username Already taken"})
    }
    else{
        const hashedPassword=await bcryptjs.hash(newUser.password,5)
        newUser.password=hashedPassword;
        await usersCollectionObj.insertOne(newUser)
        res.send({message:"User Created"})
    }
})

userApp.post('/login',async(req,res)=>{
    const usersCollectionObj=req.app.get('usersCollectionObj')
    const userObj=req.body
    // Verify Username
    const dbUser=await usersCollectionObj.findOne({username:userObj.username})
    if(dbUser===null){
        // Invalid username
        res.send({message:"Username is Invalid"})
    }
    else{
        const validation=await bcryptjs.compare(userObj.password,dbUser.password)
        if(validation===true){
            // Create JWT Token
            const token=jwt.sign({username:dbUser.username},'shgdvdfdvgsffdhvhs',{expiresIn:100})
            res.send({message:"Login successful",token:token})
        }
        else{
            res.send({message:"Invalid Password"})
        }
    }
})

userApp.put('/user',(req,res)=>{
    let updatedUser=req.body
    let index=usersList.findIndex(userObj=>userObj.id===updatedUser.id)
    if(index!==-1){
        usersList.splice(index,1,updatedUser)
        res.send("User added successfully")
    }
    else{
        res.send({message:'no user found'})
    }
}
)

userApp.delete('/user/:id',(req,res)=>{
    let id=Number(req.params.id)
    let index=usersList.findIndex(userObj=>userObj.id===id)
    usersList.splice(index,1)
    res.send("User deleted successfully")
})

function errorHandlingMiddleWare(error,req,res,next){
    res.send({errMessage:error.message})
}

userApp.use(errorHandlingMiddleWare)

module.exports=userApp