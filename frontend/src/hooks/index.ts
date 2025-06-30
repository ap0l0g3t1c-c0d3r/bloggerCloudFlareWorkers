import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export interface blogAPI{
    content: string,
    title: string,
    publishedDate: Date,
    user: {
        username: string    
    },
    id: string              
}

export const useBlogwithId = ({id}: {id:string}) => {
    const [isLoadingId, setIsLoadingId] = useState(true)
    const [blogwithId, setblogwithId]= useState<blogAPI>()
    
    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {headers: {Authorization : localStorage.getItem("token")}})
        .then((res)=> {
            setblogwithId(res.data.blogs[0])
            setIsLoadingId(false)
        })
        .catch((err) => console.log(err))
    }, [])

    console.log(blogwithId)

    return(
        { blogwithId , isLoadingId}
    )
}


export const useBlogs = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [blogs, setBlogs] = useState<blogAPI[]>([])
    
    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog`, {headers: {Authorization : localStorage.getItem("token")}})
        .then((res)=> {
            setBlogs(res.data.blogs)
            // console.log("type of blogs",typeof res.data.blogs)
            // console.log(res.data.blogs)
            setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])


    return(
        { blogs , isLoading}
    )
} 