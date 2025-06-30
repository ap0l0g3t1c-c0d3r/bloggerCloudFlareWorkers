import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName: string,
    title: string,
    publishedDate: string,
    content: string,
    blogId: string
    }

export function BlogCard({
    authorName,
    title,
    publishedDate,
    content,
 blogId}: BlogCardProps){
    return(
    <Link to={`/blog/${blogId}`}>
        <div className="flex flex-col justify-center gap-4 p-2 mt-2 border-slate-300 border-b cursor-pointer">
            <div className="flex flex-row gap-2 items-center">
                <div><Avatar authorName={authorName}/></div>
                <div>{authorName}</div>
                <Circle/>
                <div>{publishedDate.split("T")[0]}</div>
            </div>
            <div className="font-extrabold text-3xl">{title}</div>
            <div className="font-thin">{content.slice(0,200) + (content.length > 200 && "...")}</div>
            <div className="flex flex-row justify-between">    
                <div className="bg-slate-300 rounded-full w-25 h-10 flex justify-center items-center font-bold text-xs mb-1">{Math.floor(content.length / 100) + "minute read"}</div>
                <div className="bg-slate-300 rounded-full w-80 h-10 flex justify-center items-center font-bold text-xs mb-1">{blogId}</div>
            </div>
        </div>
    </Link>    
    )
}

function Circle(){
    return(
        <div className="bg-slate-400 w-1 h-1 rounded-full">

        </div>
    )
}

export function Avatar({authorName = "Default Name"}: {authorName: string}){
    
    const initialLettersArray: string[] = authorName.split(" ")

    const capitalizeLetters: string = initialLettersArray[0].charAt(0) + (initialLettersArray.length > 1 ? initialLettersArray[1].charAt(0): "")
    // console.log("array", (initialLettersArray[0].charAt(0) + initialLettersArray[1].charAt(0)).toUpperCase())

    return(
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{capitalizeLetters}</span>
        </div>

    )
}