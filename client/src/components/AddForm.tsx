import { GiCancel } from "react-icons/gi";
import Input from "./Input";
import { useState } from "react";

interface FormProps {
    onSelect: ()=>void
}

const AddForm: React.FC<FormProps> = ({onSelect})=>{
    const [title, setTitle]= useState<string>('')
    const [desc, setDesc]= useState<string>('')

const handleSave= (event: any)=> {
    event.preventDefault();
    // console.log('titolo', title + ' descrizione', desc);
    setTitle('');
    setDesc('');
    
}
    return (
        <form action="" className="shadow rounded-xl bg-[#4C5B61] min-w-82 p-10 flex flex-col gap-5 relative text-white">
            <Input label="Title" value={title} handleChange={(e: any)=>setTitle(e.target.value)}/>
            <Input label="Description" isTextArea={true} value={desc} handleChange={(e: any)=>setDesc(e.target.value)}/>
            <GiCancel onClick={onSelect} className="absolute right-2 top-2 cursor-pointer"/>
            <div className="flex justify-center">
                <button onClick={(e)=>handleSave(e)} type="submit" className="hover:border-white border-b-1 border-transparent cursor-pointer">Save</button>
            </div>
        </form>
    )
}

export default AddForm;