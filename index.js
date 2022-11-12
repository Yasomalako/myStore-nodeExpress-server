const express = require('express');
const app = express();
const cors = require('cors');
const port = 8002;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const products = [
    {
        productName: "Fan",
        description: "good for sumrrdays",
        quantity: 5,
        price: 4,
        img: "",
        id: 0
    },
    {
        productName: "Toster",
        description: "good for toast",
        quantity: 655,
        price: 20,
        img: "",
        id: 1
    },
    {
        productName: "computer",
        description: "good for gaming",
        quantity: 100,
        price: 500,
        img: "",
        id: 2
    },
    {
        productName: "Tv",
        description: "good for moovis",
        quantity: 70,
        price: 600,
        img: "",
        id: 3
    },
    {
        productName: "kybord",
        description: "good for writing",
        quantity: 20,
        price: 60,
        img: "",
        id: 4
    }]
const employs = [
    {
        fullName: "Yaso",
        phoneNumber: "050665153",
        email: "Yaso@gmail.com",
        age: 4,
        id: 0
    },
    {
        fullName: "Natan",
        phoneNumber: "050665153",
        email: "Natan@gmail.com",
        age: 15,
        id: 1
    },
    {
        fullName: "Shlomoo",
        phoneNumber: "050665153",
        email: "Shlomo@gmail.com",
        age: 28,
        id: 2
    },
    {
        fullName: "Ran",
        phoneNumber: "050665153",
        email: "Ran@gmail.com",
        age: 18,
        id: 3
    },
    {
        fullName: "Shimon",
        phoneNumber: "050665153",
        email: "Shomon@gmail.com",
        age: 24,
        id: 4
    }]
const shifts = [{
    morning:
    {
        employsArray:["yaso","shimon","naatan","ran"],
        dayOfWeak: "1",
        startTime: "08:00",
        finishTime: "14:00",
        id: 0
    }
},
{
    afterNoon: {
        employsArray:["yaso","shimon","naatan","ran"],
        dayOfWeak: "1",
        startTime: "14:00",
        finishTime: "20:00",
        id: 2
    }
},{
    afterNoon: {
        employsArray:["yaso","shimon","naatan","ran"],
        dayOfWeak: "1",
        startTime: "20:00",
        finishTime: "01:00",
        id: 3
    }
}
]
app.get('/products', (req, res) => {
    products ?
        res.send({ message: "get all products", data: products }) :
        res.send("error products bot found")
})
app.post('/products/addProducts', (req, res) => {
    products.push(req.body.product)
    res.send("products add successfully")
})
app.put('/product/uppdateProduc/:id', (req, res) => {
    const productIndex = findProductIndex(req);
    if (productIndex > -1) {
        products[productIndex] = req.body.product;
        return res.send(" the product was uppdate")
    }
})
app.delete('/products/delete/:id', (req, res) => {
    const startIndex = findProductIndex(req);
    const as = products.splice(startIndex, 1)
    as ? res.send(products) : res.send("error deleting this product")
})
app.get('/products/getById/:id', (req, res) => {
    const productIndex = products.find(product => product.id == req.params.id);
    productIndex ? res.send(productIndex) : res.send("error didnot find this index");
})
app.get('/employ', (req, res) => {
    employs ?
        res.send({ message: "employs ready to work", data: employs }) :
        res.send('error ')
})
app.post('/employ/addEmploy', (req, res) => {
    employs.push(req.body.employ)
    res.send("employ add cuccessfully")
})
app.put('/employ/uppdate/:id', (req, res) => {
    const employIndex = findEmployIndex(req);
    if (employIndex > -1) {
        employs[employIndex] = req.body.employ;
        return res.send("success ")
    }
    res.send("user not found");
})
app.delete('/employs/delete/:id', (req, res) => {
    const startIndex = employs.find(employ => employ.id == req.params.id);
    const as = employs.splice(startIndex, 1);
    as ? res.send(employs) : res.send("error wit delelting")
})
app.get('/employs/getByEmail/:email', (req, res) => {
    const employEmail = employs.find(email => email.email == req.params.email)
    employEmail ? res.send(employEmail) : res.send("error email not find")
})
app.get('/employs/getByAge/:age', (req, res) => {
    const employAge = employs.filter(empAge => empAge.age == req.params.age);
    if (employAge > 18) {
        res.send(employAge)
    }
    res.send("employ didnt exist or wrong age")
})
app.get('/shifts',(req,res) => {
shifts?
res.send(shifts) : res.send("error with shift");
})
app.post('/shifts/createShift',(req,res)=>{
    shifts.push(req.body.shift)
    res.send("shift creeat cecuccesfully")
})
app.put('/shift/uppDate/:id',(req,res)=>{
    const shiftUpdate = shifts.find(shift => shift.id == req.params.id);
    if(shiftUpdate > -1){
        shifts[shiftUpdate]= req.body.shift
       return res.send(shiftUpdate)
    }
    res.send("error shift didnt update")
})
    app.listen(port, () => {
        console.log(`the server is online on port: ${port} `);
    })


function findProductIndex(req) {
    const productItem = products.find(product => product.id == req.params.id);
    const startIndex = products.indexOf(productItem);
    return startIndex;
}
function findEmployIndex(req) {
    const employItem = employs.find(employ => employ.id == req.params.id);
    const startIndex = employs.indexOf(employItem);
    return startIndex;
}
function findShiftIndex(req) {
    const shiftItem = shifts.find(shift => shift.id == req.params.id);
    const startIndex = shifts.indexOf(shiftItem);
    return startIndex;
}