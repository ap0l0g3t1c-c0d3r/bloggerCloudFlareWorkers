import { Link } from "react-router-dom"
import { Input } from "./Input"
import { useState } from "react"
import type { SignupObject } from "@ap0l0g3t1ck1ll3r/blog-common"
import { Button } from "./Button"

export function Auth({type}: {type: "signup" | "signin"}){
    
    const [postInputs, setPostInputs] = useState<SignupObject>({
        email: "",
        password: "",
        name: ""
    })

    function handleClick(){
        console.log(type)
        type=="signup"? console.log("signing up") : console.log("signing in")
    }

    return(
        <div className="flex flex-col h-screen justify-center items-center ">
            <div className="flex flex-col border-red-500 border-2 p-10 min-w-[50%]">
                <div className="justify-center mx-auto mb-2">
                    <div className="text-3xl font-bold mt-4">{(type === "signin" ? "Log in your account" : "Create an account")}</div>
                    <div className="text-slate-500 mt-2">{(type === "signin" ? "Don't have an account" : "Already have an account")}
                        <span className="underline pl-2"> <Link to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign Up?": "Login?"}</Link></span></div>
                </div>
                {type === "signup" && <Input idForLabel="username" labelName="Username" placeholderValue="Johndoes" onChange={(e)=> setPostInputs({...postInputs, name: e.target.value})}/>}
                <Input idForLabel="email" labelName="email" placeholderValue="john@gmail.com" onChange={(e)=> setPostInputs({...postInputs, email: e.target.value})}/>
                <Input idForLabel="password" inputType="password" labelName="password" placeholderValue="password" onChange={(e)=>setPostInputs({...postInputs, password: e.target.value})}/>
                <div className="mt-4 flex justify-center">
                    <Button onclick={handleClick} typeValue={type}/>
                </div>
            </div>
        </div>
    )

}