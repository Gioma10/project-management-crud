interface InputProps {
    label:string,
    isTextArea?: boolean
    value: string
    handleChange: (e: any)=> void,
}

const Input: React.FC<InputProps> = ({isTextArea, value, handleChange, label, ...props})=>{
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="">{label}</label>
            {isTextArea ?
                <textarea onChange={handleChange} value={value} {...props} className="border rounded px-1 py-1 focus:outline-none shadow focus:shadow-[#7ab2b8]"/>
                :
                <input onChange={handleChange} value={value} {...props} className="border rounded px-1 py-1 focus:outline-none shadow focus:shadow-[#7ab2b8]"/>
            }
        </div>
    )
}

export default Input;