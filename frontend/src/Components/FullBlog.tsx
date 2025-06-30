import type { blogAPI } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export function FullBlog({blog}:{blog: blogAPI}){
    return(
        <div>
            <AppBar/>
            <div className="flex flex-row h-screen m-4 justify-between ">
                <div className="flex justify-center px-auto w-4/5">
                    <div className="border-2 border-red-500 px-5 mx-auto min-w-1/2 max-md:w-full">
                        <div className=" text-6xl font-bold min-w-3/4 pt-4">{blog.title}</div>
                        <div className="text-3xl font-thin text-slate-400 pt-4">Posted on {new Date(blog.publishedDate).getDate()}</div>
                        <div className="text-xl pt-4"> {blog.content}</div>
                    </div>
                </div>
                <div className="border-2 border-red-500 m-4 min-w-1/5 max-md:hidden">
                    <div className="m-5">
                        <div className="text-xl">Author</div>
                        <div className="flex flex-row gap-6 mt-4">
                            <div className="flex flex-col justify-center">
                                <Avatar authorName={blog.user.username}/>
                            </div>
                        <div className="flex flex-col">
                            <div className="font-bold">{blog.user.username.toUpperCase()}</div>
                            <div>Random Catchphrase by the author to get the users attention</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )

}