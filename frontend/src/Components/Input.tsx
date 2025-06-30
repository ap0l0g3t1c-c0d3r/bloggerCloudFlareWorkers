import type { ChangeEvent } from "react"

interface LabeledInput {
    idForLabel: string,
    labelName: string,
    placeholderValue: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void,
    inputType?: string,

}

export function Input({idForLabel, labelName, placeholderValue, onChange, inputType,} : LabeledInput){
    
    return(
        <div className="p-2">
            <label htmlFor={idForLabel} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
            <input onChange={onChange} type={ inputType || "text"} id={idForLabel} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholderValue} required />
        </div>
    )
}