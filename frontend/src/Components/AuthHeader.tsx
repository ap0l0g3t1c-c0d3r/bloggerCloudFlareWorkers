import { Link } from "react-router-dom"

export function AuthHeader({type}: {type: "signup" | "signin"}){

    return(
            <div className="justify-center mx-auto mb-2">
                <div className="text-3xl font-bold mt-4">{(type === "signin" ? "Log in your account" : "Create an account")}</div>
                <div className="text-slate-500 mt-2">{(type === "signin" ? "Don't have an account" : "Already have an account")}
                    <span className="underline pl-2"> <Link to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign Up?": "Login?"}</Link></span></div>
            </div>
                 
    )

}