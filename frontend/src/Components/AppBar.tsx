import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const AppBar = () => {
    return(
        <div className="border-b border-slate-400 flex justify-between">
            <div className="flex flex-row gap-2 items-center m-2">
                <div className="p-2"><DarkCircle/></div>
                <div className="p-2">Draft in King</div>
                <Link to={"/blog"}>
                    <div className="p-2">Your Blogs</div>
                </Link>
            </div>
            <div className="flex flex-row gap-2 items-center m-2">
                {/* <div className="p-2"><Publish/></div> */}
                {/* <div className="p-2">Three dots</div> */}
                {/* <div className="p-2">Bell Icon</div> */}
                <div className="p-2"> 
                    <Link to={"/publish"}>
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 h-10
                        focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center 
                        me-2 mb-2">Create Blog</button>
                    </Link>
                </div>
                <div className="p-2"><Avatar authorName={"Default Name"}/></div>
            </div>
        </div>
    )
}

function DarkCircle(){
    return(
        <div className="flex flex-row">
            <div className="bg-black rounded-full w-10 h-10"></div>
            <div className="bg-black rounded-full w-5 h-10"></div>
            <div className="bg-black rounded-full w-2 h-10"></div>
        </div>
    )
}

function Publish(){
    return(
        <div className="flex justify-center items-center w-20 rounded-2xl border-2 bg-green-600 border-green-300">
            Publish
        </div>
    )
}