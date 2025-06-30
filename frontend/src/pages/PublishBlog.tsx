import { useState } from "react"
import { AppBar } from "../Components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const PublishBlog = () => {
    
    const [title,setTitle] = useState("")
    const [content, setContent] = useState("") 

    // console.log("title", title)
    // console.log("content", content)
    const navigate = useNavigate()

    async function createBlog(){
        const responce = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content
            } ,
            {
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            }
        )

        if(responce.status > 400){
            alert("Something went wrong. Try changing the title")
        }
        // console.log("responce to check",responce)
        navigate(`/blog/${responce.data.blog.id}`)

    }
    
    return(
        <div>
            <AppBar/>
            <div className="flex justify-center w-full mt-4">
                <div className="mb-6 min-w-1/2 flex flex-col">
                    <div>
                        <input type="text" onChange={(e)=> setTitle(e.target.value)} className="bg-gray-50 text-xl border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500
                    focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                    </div>
                    <div>
                        <TextArea setChange={setContent}/>
                    </div>
                    <div>
                        <button onClick={createBlog} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white 
                            bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                            Publish post
                        </button>    
                    </div>    
                </div>
            </div>
        </div>    
    )
}



interface ContentAPI{
    setChange: (e: string) => void
}



function TextArea({setChange}:ContentAPI){
    return(

   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50  ">
       <div className="flex items-center justify-between px-3">
           <textarea rows={8} onChange={(e)=> setChange(e.target.value)} className="focus:outline-0 block w-full px-0 text-xl text-gray-800 bg-gray-50 focus:ring-0" 
                placeholder="Write an article..." required >
            </textarea>     
        </div>       
    </div>
    )
}