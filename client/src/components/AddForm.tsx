import { GiCancel } from "react-icons/gi";
import Input from "./Input";

interface FormProps {
    onSelect: ()=>void
}

const AddForm: React.FC<FormProps> = ({onSelect})=>{
    return (
        <form action="" className="shadow rounded-xl bg-[#4C5B61] min-w-82 p-5 flex flex-col gap-5 relative text-white">
            <Input label="Title"/>
            <Input label="Description" isTextArea={true}/>
            <GiCancel onClick={onSelect} className="absolute right-2 top-2 cursor-pointer"/>
            <div className="flex justify-center">
                <button type="submit" className="hover:border-white border-b-1 border-transparent cursor-pointer">Save</button>
            </div>
        </form>
    )
}

export default AddForm;