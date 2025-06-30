import { AuthHeader } from "../Components/AuthHeader";
import { Quote } from "../Components/Quote";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import type { SigninObject } from "@ap0l0g3t1ck1ll3r/blog-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SigninRoute(){

    const navigate = useNavigate()
    
    const [postInputs, setPostInputs] = useState<SigninObject>({
            email: "",
            password: "",
        })
    
    async function sendRequest(){
        try {
            const responce = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs)
            localStorage.setItem("token",responce.data.token)
            navigate("/blog")    
        } catch (error) {
            alert("Error while Logging")
            console.log("Error in signin Route",error)
        }
    }    

    return(
       <div className="flex flex-row h-screen border-red-50">
                <div className="w-1/2 max-md:w-full ">
                    <div className="flex flex-col h-screen justify-center items-center ">
                        <div className="flex flex-col border-red-500 border-2 p-10 min-w-[50%]">
                            <AuthHeader type="signin"/>    
                            <Input idForLabel="email" labelName="email" placeholderValue="john@gmail.com" onChange={(e)=> setPostInputs({...postInputs, email: e.target.value})}/>
                            <Input idForLabel="password" inputType="password" labelName="password" placeholderValue="password" onChange={(e)=>setPostInputs({...postInputs, password: e.target.value})}/>
                            <div className="mt-4 flex justify-center">
                                <Button onclick={sendRequest} typeValue={"signin"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 max-md:hidden">
                    <Quote quote={"The Customer support I received was exceptional. The support team were above and beyond to address my concern"} author={"Aditya"} designation={"Front-end developer"}/>
                </div>
            </div>
    )
}