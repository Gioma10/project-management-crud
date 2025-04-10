import { GiCancel } from "react-icons/gi";
import Input from "./Input";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Aggiungi Firestore SDK
import { db } from "../utils/firebase"; // Importa il file firebase.js


interface FormProps {
    onClose: ()=>void
    projectId: string
}

const TaskForm: React.FC<FormProps> = ({onClose, projectId})=>{
    const [title, setTitle] = useState<string>(''); // Stato per il titolo del task

    // Funzione per aggiungere un task
        const handleSave = async (event: any) => {

            event.preventDefault();


            console.log("Saving task for projectId:", projectId);
            if (!title) {
                alert("Please provide a title for the task.");
                return;
            }
        
            try {
        
                // Aggiungi un task nella collezione 'tasks' del progetto specifico
                await addDoc(collection(db, "projects", projectId, "tasks"), {
                    title: title,
                    completed: false,
                });
        
                console.log("Task added successfully!");
        
                setTitle('');
                onClose()
            } catch (error) {
                console.error("Error adding task: ", error);
            }
        };

    return (
        <div className="w-1/3 rounded-lg shadow-mdshadow bg-[#4C5B61] min-w-82 p-10 flex flex-col gap-5 relative text-white">
            <GiCancel onClick={onClose} className="absolute right-2 top-2 cursor-pointer text-xl"/>
            <h2 className="text-2xl text-center mb-4">Add Task</h2>
            <form onSubmit={handleSave} className="space-y-6">
                <Input label="Title" value={title} handleChange={(e: any)=>setTitle(e.target.value)}/>
                <div className="flex justify-center">
                    <button type="submit" className="hover:border-white border-b-1 border-transparent cursor-pointer">Save</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;