type quoteProp = {
    quote: string,
    author: string,
    designation: string
}

export function Quote({quote, author, designation} : quoteProp){
    return(
        <div className="bg-slate-200 h-screen flex justify-center 
        items-center">
            <div className="flex flex-col max-w-1/2 text-2xl">
                <div className="font-mono mb-2">
                    "{quote}"
                </div>
                <div className="font-bold">
                    -{author.charAt(0).toUpperCase() + author.slice(1)}
                </div>
                <div className="text-gray-900 text-xl">{designation}</div>
            </div>
        </div>
    )
}