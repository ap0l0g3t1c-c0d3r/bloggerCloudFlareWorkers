import { BlogSkeleton } from "../Components/BlogSkeleton"
import { useBlogwithId } from "../hooks"
import { FullBlog } from "../Components/FullBlog"
import { useParams } from "react-router-dom"

export function Blogs(){
    
    const {id} = useParams() || "" 

    const { blogwithId, isLoadingId} = useBlogwithId({id: id || ""})

    return(
        <div>
            {isLoadingId && <BlogSkeleton/>}
            {blogwithId && <FullBlog blog={blogwithId}/>}    
        </div>
    )
}


// { content: "Checking the first blog content",
//             title: "This is the first blog in cici2 to be added",
//             publishedDate: "2025-06-29T17:23:03.043Z",
//             id: "859dd42e-45ca-496f-b275-dcb87e7ce08b",
//             user: {
//                 username: "cici"
//             }}