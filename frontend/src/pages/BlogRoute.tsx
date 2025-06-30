import { AppBar } from "../Components/AppBar"
import { BlogCard } from "../Components/BlogCard"
import { BlogSkeleton } from "../Components/BlogSkeleton"
import { useBlogs } from "../hooks"


export function BlogRoute(){

    const {isLoading, blogs} = useBlogs()

    
    const allblogs = blogs.map((blog) => <BlogCard key={blog.id} authorName={blog.user.username ? blog.user.username : "Anonymous"}
                                                    blogId={blog.id} title={blog.title} 
                                                publishedDate={new Date(blog.publishedDate).toDateString()} content={blog.content} />)

    return(
        <div>
            <AppBar/>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center max-w-1/2 max-md:min-w-[75%]">
            {isLoading && <BlogSkeleton/>}
            {allblogs}
           </div>
        </div>
        </div>
    )
}