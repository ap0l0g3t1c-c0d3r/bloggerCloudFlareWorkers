import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode , sign, verify } from "hono/jwt"

const app = new Hono<{Bindings: {
  DATABASE_URL: string,
  SECRET: string
}}>()

app.use("/api/v1/blog/*", async (c, next)=> {
  
  type jwtPayload = {
    id: string
  }

  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

  
  const header = c.req.header("Authorization")

  const token = header?.split(" ")[1] || ""
  
  let responce: jwtPayload
  try {
    responce = await verify(token, c.env.SECRET) as jwtPayload
  } catch (e) {
    c.status(401)
    return c.json({ message: "Invalid or expired token" })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: responce.id
    }
  }) 

  if(!user){
    c.status(401)
    return c.json({"message": "Missing token"})
  }
  await next()

})


app.post("/api/v1/signup", async (c) => {

  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

  const body = await c.req.json()
  
  const resCheck = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  })
  
  if(resCheck){
    return c.json({"message": "User already exists"})
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }})
  
  const token = await sign({id: user.id}, c.env.SECRET)

  return c.json({"jwt": token})
})

app.get("/", async (c)=> {
  return c.json({"message": "This is just get request"})
})

app.post("/api/v1/signin", async (c)=> {
  
  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

  const body = await c.req.json()
  const {email, password} = body
  
  const userCheck = await prisma.user.findUnique({
    where:{
      email: body.email,
      password: body.password
    }
  })
  
  if(!userCheck){
    c.status(403)
    return c.json({"message": "User not found"})
  }

  const token = await sign({id: userCheck.id}, c.env.SECRET)
 
  return c.json({jwt: token})

})

app.put("/api/v1/blog", async (c)=> {
  return c.json({"message": "This is put blog"})

})

app.post("/api/v1/blog", async (c)=> {
  return c.json({"message": "This is post blog"})

})

app.get("/api/v1/blog/:id", async (c)=> {
  return c.json({"message": "This is get blog"})

})

export default app


