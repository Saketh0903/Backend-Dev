const exp=require('express')
const productApp=exp.Router()

productApp.use(exp.json())

function getMiddleware(req,res,next){
    console.log("Fetching the requested data")
    next()
}

function deleteMiddleware(req,res,next){
    console.log("Deleting the requested product data")
    next()
}

function postMiddleware(req,res,next){
    console.log("Post middleware for products api")
    console.log(req.body)
    next()
}

function putMiddleware(req,res,next){
    console.log("Middleware for put Request")
    console.log(req.body)
    next()
}


productApp.use('/new-product',postMiddleware)
productApp.use('/product',putMiddleware)
productApp.use('/products',getMiddleware)
productApp.use('/product/:id',deleteMiddleware)



let products=[
    {
        id:1,
        name:"Iphone 15",
        brand:"productApple",
        price:80000
    },
    {
        id:2,
        name:"Galaxy S23 Ultra",
        brand:"Samsung",
        price:120000
    },
    {
        id:3,
        name:"OnePlus 11R",
        brand:"OnePlus",
        price:40000
    },
    {
        id:4,
        name:"Nothing Phone 2",
        brand:"Nothing",
        price:55000
    },
    {
        id:5,
        name:"Google Pixel 8",
        brand:"Google",
        price:76000
    },
    {
        id:6,
        name:"Xiaomi 13 Pro",
        brand:"Xiaomi",
        price:75000
    },
    {
        id:7,
        name:"Ideapad Slim 3i 12th Gen",
        brand:"Lenovo",
        price:43000
    },
    {
        id:8,
        name:"Macbook Air 13 inches",
        brand:"productApple",
        price:90000
    }

]


productApp.get('/products',(req,res)=>{
    if(products.length===0){
        res.send({message:"No products"})
    }
    else{
        res.send({message:"The products are",payload:products})
    }
})


productApp.get('/products/:id',(req,res)=>{
    id=Number(req.params.id)
    let product=products.find(element=>element.id===id)
    if(product===undefined){
        res.send({message:"No products with this id"})
    }
    else{
        res.send({message:"Single product",payload:product})
    }
})

productApp.post('/new-product',(req,res)=>{
    let newProduct=req.body
    let product=products.find((element)=>element.id===newProduct.id)
    
    if(product===undefined){
        products.push(newProduct)
        res.send({message:"New product added successfully"})
    }
    else{
        res.send({message:"Product already exists with this id"})
    }
})


productApp.put('/product',(req,res)=>{
    let updatedProduct=req.body
    let index=products.findIndex(element=>element.id===updatedProduct.id)
    if(index!==-1){
        products.splice(index,1,updatedProduct)
        res.send({message:"Product details updated",payload:updatedProduct})
    }
    else{
        res.send("Couldnot find matching id to update")
    }
})

productApp.delete('/product/:id',(req,res)=>{
    let id=Number(req.params.id)
    let index=products.findIndex(element=>element.id===id)
    if(index!==-1){
        products.splice(index,1)
        res.send({message:"Product deleted successfully"})
    }
    else{
        res.send({message:"No matching product id"})
    }
})


module.exports=productApp