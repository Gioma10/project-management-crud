import { Link } from "react-router";
import Button from "./Button";
import { MdCancelPresentation } from "react-icons/md";

interface Project {
    id: string;
    title: string;
    description: string;
  }

interface CardProps {
    project: { id: string; title: string; description: string };
    onDelete: (id: string) => void; // Funzione per aggiornare lo stato dei progetti nel parent
    onEdit: (project: Project) => void;
  }

const Card: React.FC<CardProps> = ({project, onDelete, onEdit})=>{

    // console.log(project);
    

    const handleDelete = async (id: string) => {
    
        try {
          // Invia la richiesta DELETE al backend
          const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
            method: "DELETE",
          });
    
          if (!response.ok) {
            throw new Error("Failed to delete project");
          }
    
          // Notifica il componente padre che il progetto è stato eliminato
          onDelete(id); // Rimuovi il progetto dalla lista (a livello di stato)
        } catch (error) {
          console.error("Error deleting project:", error);
        }
      };
    
    return (
        <div
            className="w-52 h-60 shadow-lg bg-[#4C5B61] gap-5 flex flex-col justify-center items-center rounded-xl p-10 relative group">
                <MdCancelPresentation onClick={() => handleDelete(project.id)} className=" group-hover:block hidden absolute right-2 top-2 cursor-pointer hover:text-red-600 text-xl transitio-all duration-300"/>
                <h3 className="text-2xl">{project.title}</h3>
                <p className="text-sm text-center">{project.description}</p>
                <div className="flex gap-4">
                    <Button onSelect={() => onEdit(project)}>Edit</Button>
                    <Link to={`/projects/details/${project.id}`}>
                        <Button>Details</Button>
                    </Link>
                </div>
        </div>
    )
}

export default Card;