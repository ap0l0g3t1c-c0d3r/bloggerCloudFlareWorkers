
interface Button{
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    typeValue: "signup" | "signin"
}

export function Button({onclick, typeValue}: Button){
    return(
        <div>
            <button type="button" onClick={onclick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
            font-medium rounded-full w-3xs text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 
            dark:focus:ring-gray-700 dark:border-gray-700">{typeValue === "signup" ? "Sign Up" : "Sign In"}</button>
        </div>
    )
}