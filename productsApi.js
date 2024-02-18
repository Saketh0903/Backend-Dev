const exp=require('express')
const productApp=exp.Router()

productApp.use(exp.json())

// function getMiddleware(req,res,next){
//     console.log("Fetching the requested data")
//     next()
// }

// function deleteMiddleware(req,res,next){
//     console.log("Deleting the requested product data")
//     next()
// }

// function postMiddleware(req,res,next){
//     console.log("Post middleware for products api")
//     console.log(req.body)
//     next()
// }

// function putMiddleware(req,res,next){
//     console.log("Middleware for put Request")
//     console.log(req.body)
//     next()
// }


// productApp.use('/new-product',postMiddleware)
// productApp.use('/product',putMiddleware)
// productApp.use('/products',getMiddleware)
// productApp.use('/product/:id',deleteMiddleware)






productApp.get('/products',async(req,res)=>{
    const productCollectionObj=req.app.get('productsCollectionObj')
    const products=await productCollectionObj.find().toArray();
    res.send({message:"All products",payload:{products}})
})


productApp.get('/product-by-name/:name',async(req,res)=>{
    const productCollectionObj=req.app.get('productsCollectionObj')
    const productName=req.params.name
    let product=await productCollectionObj.findOne({name:productName})
    res.send(product)
})

productApp.get('/product-by-id/:pid',async(req,res)=>{
    const productCollectionObj=req.app.get('productsCollectionObj')
    const proId=req.params.pid
    const productId=Number(proId)
    let product=await productCollectionObj.findOne({pid:productId})
    res.send({message:"Product",payload:{product}})
})

productApp.post('/new-product',async(req,res)=>{
    const productCollectionObj=req.app.get('productsCollectionObj')
    const newProduct=req.body
    const dbres=await productCollectionObj.insertOne(newProduct)
    res.send({message:"Response",payload:dbres})
})


productApp.put('/product',async(req,res)=>{
    const productCollectionObj=req.app.get('productsCollectionObj')
    const updatedProduct=req.body
    const productName=updatedProduct.name
    const dbres=await productCollectionObj.updateOne({name:productName},{$set:{...updatedProduct}})
    res.send(dbres)
})

productApp.delete('/product/:id',(req,res)=>{
    
})


module.exports=productApp