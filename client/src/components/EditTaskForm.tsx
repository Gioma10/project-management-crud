import { GiCancel } from "react-icons/gi";
import Input from "./Input";
import { useState, useEffect } from "react";
import axios from "axios";

interface FormProps {
  onClose: () => void;
  projectId: string;
  taskId: string;  // ID della task da modificare
  currentTitle: string;  // Titolo attuale della task
}

const EditTaskForm: React.FC<FormProps> = ({ onClose, projectId, taskId, currentTitle }) => {
  const [title, setTitle] = useState<string>(currentTitle); // Inizializza con il titolo della task da modificare

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
        const response = await axios.put(
            `http://localhost:8080/api/projects/${projectId}/tasks/${taskId}`,
            { title: title },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
    );
      
      // Se la richiesta ha successo, chiudi il form
      onClose();
      console.log('Task updated:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Se c'è un errore nella risposta, mostra il messaggio di errore
        console.error('Error updating task:', error.response.data.error);
      } else {
        // Gestisci gli altri errori (network, ecc.)
        console.error('Network error or other issue:', error);
      }
    }
  };

  useEffect(() => {
    setTitle(title);  // Se il titolo cambia, aggiorna lo stato
  }, [title]);

  return (
    <div className="w-1/3 rounded-lg shadow-mdshadow bg-[#4C5B61] min-w-82 p-10 flex flex-col gap-5 relative text-white">
      <GiCancel onClick={onClose} className="absolute right-2 top-2 cursor-pointer text-xl" />
      <h2 className="text-2xl text-center mb-4">Edit Task</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input label="Title" value={title} handleChange={(e: any) => setTitle(e.target.value)} />
        <div className="flex justify-center">
          <button type="submit" className="hover:border-white border-b-1 border-transparent cursor-pointer">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
