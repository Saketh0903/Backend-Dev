const exp=require("express")

const app=exp()
// create user
// get all users
// get users by id
// get users by name
app.use(exp.json())
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
app.get('/users',(req,res)=>{
    console.log(req.body)
    res.send({message:"All users",users:usersList})
})


app.get('/users/:id',(req,res)=>{
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

app.post('/new-user',(req,res)=>{
    let newUser=req.body
    usersList.push(newUser)
    res.send("New user added")
})

app.put('/user',(req,res)=>{
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

app.delete('/user/:id',(req,res)=>{
    let id=Number(req.params.id)
    let index=usersList.findIndex(userObj=>userObj.id===id)
    usersList.splice(index,1)
    res.send("User deleted successfully")
})

app.listen(4000,()=>console.log("Server is running"))