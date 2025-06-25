import { Hono } from "hono";
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string
    }
    Variables:{
        userId: string,
    }
}>()

blogRouter.use("/*", async (c, next)=> {
  
  type jwtPayload = {
    id: string
  }

  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  
  const token = c.req.header("Authorization") || ""
  console.log(token)

  let responce: jwtPayload
  try {
    responce = await verify(token, c.env.SECRET) as jwtPayload
  } catch (e) {
    console.log(e)
    c.status(401)
    return c.json({ message: "something went wront with the token " })
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
  c.set('userId', user.id)
  await next()
})


blogRouter.post("/", async (c)=> {
   const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate())

   console.log("This is the post blog")
   const body = await c.req.json()

   const blogId = c.get('userId')

   const blog = await prisma.blogs.create({
   data:{
        title: body.title,
        content: body.client,
        userId: blogId
    } 
   })
  return c.json({blog})

})

blogRouter.put("/", async (c)=> {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
   })
   const body = await c.req.json()
   const blogId = c.get('userId')
   
   const blog = await prisma.blogs.update({
    where:{
        id: blogId
    },
    data:{
        title: body.title,
        content: body.client,
    }
   })
   
  return c.json({blog})

})

blogRouter.get("/:id", async (c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })
    const blogId = c.get('userId')
    try {
        const blogs = await prisma.blogs.findMany({
        where:{
                id: blogId
            }
        })
        return c.json({blogs})
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({"message": "could n ot find the ID"})
    }
})

//Todo: add pagination
blogRouter.get("/bulk", async (c)=> {
  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
  })
  const blogs = await prisma.blogs.findMany({
    where:{
            published: true
        }
  })
  return c.json({blogs})

})