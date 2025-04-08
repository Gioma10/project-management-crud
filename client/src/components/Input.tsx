interface InputProps {
    label:string,
    isTextArea?: boolean
}

const Input: React.FC<InputProps> = ({isTextArea, label, ...props})=>{
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="">{label}</label>
            {isTextArea ?
                <textarea {...props} className="border rounded px-1 py-1 focus:outline-none shadow focus:shadow-[#7ab2b8]"/>
                :
                <input {...props} className="border rounded px-1 py-1 focus:outline-none shadow focus:shadow-[#7ab2b8]"/>
            }
        </div>
    )
}

export default Input;