const exp=require('express')
const userApp=exp.Router()


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


let usersList=[
    {
        id:1,
        name:'Saketh'
    },
    {
        id:2,
        name:'Sam'
    }
]
userApp.get('/users',(req,res)=>{
    res.send({message:"All users",users:usersList})
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

userApp.post('/new-user',(req,res)=>{
    let newUser=req.body
    usersList.push(newUser)
    res.send("New user added")
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