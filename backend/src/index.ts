import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode , sign, verify } from "hono/jwt"
import { userRouter } from "./routes/user"
import { blogRouter } from './routes/blog'

const app = new Hono<{Bindings: {
  DATABASE_URL: string,
  SECRET: string
}}>()

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

app.get("/", async (c)=> {
  return c.json({"message": "This is just get request"})
})

export default app


