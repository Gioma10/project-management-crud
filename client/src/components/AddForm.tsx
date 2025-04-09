import { GiCancel } from "react-icons/gi";
import Input from "./Input";
import { useState } from "react";
import { db } from "../utils/firebase"; // Importa il file firebase.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Aggiungi Firestore SDK

interface FormProps {
    onSelect: ()=>void
}

const AddForm: React.FC<FormProps> = ({onSelect})=>{
    const [title, setTitle]= useState<string>('')
    const [desc, setDesc]= useState<string>('')

// Funzione per salvare nel database Firestore
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

            // Resetta i campi del form dopo il salvataggio
            setTitle('');
            setDesc('');
        } catch (error) {
            console.error("Error saving project: ", error);
        }
    };
    return (
        <form action="" className="shadow rounded-xl bg-[#4C5B61] min-w-82 p-10 flex flex-col gap-5 relative text-white">
            <Input label="Title" value={title} handleChange={(e: any)=>setTitle(e.target.value)}/>
            <Input label="Description" isTextArea={true} value={desc} handleChange={(e: any)=>setDesc(e.target.value)}/>
            <GiCancel onClick={onSelect} className="absolute right-2 top-2 cursor-pointer"/>
            <div className="flex justify-center">
                <button onClick={handleSave} type="submit" className="hover:border-white border-b-1 border-transparent cursor-pointer">Save</button>
            </div>
        </form>
    )
}

export default AddForm;