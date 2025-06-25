import hono, { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign } from "hono/jwt"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string
    }
}>()

userRouter.post("/signup", async (c) => {

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

  return c.json({token})
})

userRouter.post("/signin", async (c)=> {
  
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
 
  return c.json({token})

})
