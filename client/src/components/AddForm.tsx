import { GiCancel } from "react-icons/gi";
import Input from "./Input";
import { useState } from "react";
import { db } from "../utils/firebase"; // Importa il file firebase.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Aggiungi Firestore SDK

interface FormProps {
    onClose: ()=>void
}

const AddForm: React.FC<FormProps> = ({onClose})=>{
    const [title, setTitle]= useState<string>('')
    const [desc, setDesc]= useState<string>('')

    // Funzione per salvare nel database Firestore
    const handleSave = async (event: any) => {
        event.preventDefault();

        try {
            // Aggiungi i dati a Firestore
            const docRef = await addDoc(collection(db, "projects"), {
                title: title,
                description: desc,
                timestamp: serverTimestamp(),
            });

            console.log("Project saved successfully with ID:", docRef.id);

            // Resetta i campi del form 
            setTitle('');
            setDesc('');

            onClose()
        } catch (error) {
            console.error("Error saving project: ", error);
        }
    };
    return (
        <div className="w-1/3 rounded-lg shadow-mdshadow bg-[#4C5B61] min-w-82 p-10 flex flex-col gap-5 relative text-white">
            <GiCancel onClick={onClose} className="absolute right-2 top-2 cursor-pointer text-xl"/>
            <h2 className="text-2xl text-center mb-4">Add Project</h2>
            <form onSubmit={handleSave} className="space-y-6">
                <Input label="Title" value={title} handleChange={(e: any)=>setTitle(e.target.value)}/>
                <Input label="Description" isTextArea={true} value={desc} handleChange={(e: any)=>setDesc(e.target.value)}/>
                <div className="flex justify-center">
                    <button type="submit" className="hover:border-white border-b-1 border-transparent cursor-pointer">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddForm;