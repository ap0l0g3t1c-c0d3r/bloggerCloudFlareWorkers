import { Hono } from "hono";
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ap0l0g3t1ck1ll3r/blog-common"

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
  console.log("token", token)
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

   const body = await c.req.json()
  //  console.log("This is the post body", body)
   
   const userId = c.get('userId')
    
   const { success } = createBlogInput.safeParse(body)

   if(!success){
    c.status(411)
    return c.json({"message": "Input validation failed"})
   }

   const blog = await prisma.blogs.create({
   data:{
        title: body.title,
        content: body.content,
        userId: userId,
        publishedDate: new Date()
    } 
   })
  return c.json({blog})

})

blogRouter.put("/:id", async (c)=> {
   const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL
    })
    
    const body = await c.req.json()
    const blogId = c.req.param("id")
    const userId = c.get('userId')
    console.log("check for blog Id",blogId)
  
    const { success } = updateBlogInput.safeParse({...body,id: blogId})

    if(!success){
      c.status(411)
      return c.json({"message": "Input validation failed"})
    }

    const blog = await prisma.blogs.update({
      where:{
        userId: userId,
        id: blogId
      },
    data:{
        title: body.title,
        content: body.content,
        published: body.published,
        publishedDate: new Date()
      }
    })
    return c.json({blog})  
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

blogRouter.get("", async (c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })
    const blogId = c.get('userId')
    try {
        const blogs = await prisma.blogs.findMany({
        where:{
                userId: blogId
            },
        select: {
            content: true,
            title: true,
            publishedDate: true,
            id: true,
            user: {
              select:{
                username: true
                }
              }
            }
        })
        return c.json({blogs})
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({"message": "could not find the ID"})
    }
})

blogRouter.get("/:id", async (c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })
    const userId = c.get('userId')
    const blogId = c.req.param("id")
    try {
        const blogs = await prisma.blogs.findMany({
            where:{
                userId: userId,
                id: blogId
            },
            select: {
            content: true,
            title: true,
            publishedDate: true,
            id: true,
            user: {
              select:{
                username: true
                }
              }
            }
        })
        return c.json({blogs})
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({"message": "could n ot find the ID"})
    }
})