const fastify = require("fastify")({logger:false});
const PORT = 5000;

const users = [
  {id:1,name:"vishal",age:17},
  {id:2,name:"vivek",age:18},
  {id:3,name:"atharva",age:18}
]

fastify.get("/",(req,res)=> {
  res.send({"Ping":"Pong"})
});



fastify.get("/users",(req,res)=> {
  res.send(users);
})



fastify.post("/users",(req,res)=> {
  const {name,age} = req.body;
  const data = {
    id:users.length+1,
    name,
    age
  }
  users.push(data);
  res.send({name,age});
})

fastify.get("/users/:id",(req,res)=>{
  const {id} = req.params;
  const data = users.find(user=>user.id === Number(id));
  res.send(data);
})


fastify.put("/users/:id",(req,res) => {
  const { id } = req.params;
  const data = users.find(user=>user.id === Number(id))
  if(!data){
    return res.send({"msg":"user not found"});
  }
  const {name,age} = req.body;
  data.name = name;
  data.age = age;
  res.send(data);
})


fastify.delete("/users/:id",(req,res)=> {
  const { id } = req.params;
  console.log(id);
  const data = users.filter(user => user.id !== Number(id));
  console.log(data);
  res.send(data);
})


const start = async () => {
  try{
    await fastify.listen(PORT)
  }catch(error){
    fastify.log.error(error);
    process.exit(1)
  }
}


start();