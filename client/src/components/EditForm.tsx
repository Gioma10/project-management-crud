import { useState } from "react";
import axios from "axios";
import Input from "./Input";
import { GiCancel } from "react-icons/gi";

interface Project {
    id: string;
    title: string;
    description: string;
  }

interface EditFormProps {
  project: Project; // Il progetto da modificare
  onClose: () => void; // Funzione per chiudere il form
  onSave: (updatedProject: Project) => void; // Funzione per salvare i cambiamenti
}

const EditForm: React.FC<EditFormProps> = ({ project, onClose, onSave }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedProject = { title, description };
      await axios.put(`http://localhost:8080/api/projects/${project.id}`, updatedProject);
      onSave({ ...project, ...updatedProject });
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="w-1/3 rounded-lg shadow-mdshadow bg-[#4C5B61] min-w-82 p-10 flex flex-col gap-5 relative text-white">
      <GiCancel onClick={onClose} className="absolute right-2 top-2 cursor-pointer text-xl"/>
      <h2 className="text-2xl text-center mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
            label="Title"
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
            />
        <Input
            isTextArea={true}
            label="Description"
            value={description}
            handleChange={(e) => setDescription(e.target.value)}
            />
        <div className="flex gap-2">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
