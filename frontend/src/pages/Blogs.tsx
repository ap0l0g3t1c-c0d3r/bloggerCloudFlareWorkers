import { useBlogwithId } from "../hooks"
import { FullBlog } from "../Components/FullBlog"
import { useParams } from "react-router-dom"
import { Spinner } from "../Components/Spinner"
import { AppBar } from "../Components/AppBar"

export function Blogs(){
    
    const {id} = useParams() || "" 

    const { blogwithId, isLoadingId} = useBlogwithId({id: id || ""})

    return(
        <div>
            <AppBar/>
            {isLoadingId && <Spinner/>}
            {blogwithId && <FullBlog blog={blogwithId}/>}    
        </div>
    )
}
