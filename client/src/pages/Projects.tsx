import { useEffect, useState } from "react"
import axios from "axios"
import Button from "../components/Button"
import Card from "../components/Card"
import AddForm from "../components/AddForm"

const Projects: React.FC = ()=>{
    const [projects, setProjects]= useState<Project[]>([])
const [loading, setLoading]= useState<boolean>()
const [addingProject, setAddingProjects] = useState<boolean>(false)

interface Project {
  id: string;
  title: string;
  description: string;
  timestamp: any; // Puoi specificare un tipo più preciso per `timestamp`, se necessario
}

const fecthAPI = async () => {
  try {
    setLoading(true);
    const response = await axios.get('http://localhost:8080/api/projects');
    console.log(response.data.projects);  // Verifica che l'ID sia qui
    setProjects(response.data.projects);

  } catch (error) {
    console.error('Error fetching projects:', error);
  } finally {
    setLoading(false);
  }
};

const handleDelete = (id: string) => {
  setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
};


  useEffect(()=>{
    fecthAPI()
  }, [])

  // console.log(projects);
  
    return (
        <div className="h-screen bg-[#4D6A6D] gap-12 flex flex-col justify-center items-center text-[#C5C5C5]">
        <h1 className="text-6xl">Projects</h1>
        {loading && <p className="animate-pulse">Caricamento...</p>}
        {projects.length > 0 ?
          <div className="flex gap-12">
            {projects.map((project)=>{
              return (
                <Card key={project.id} project={project} onDelete={handleDelete}/>
              )
            })}
          </div>
          :
          <p>Non ci sono progetti...</p>
        }

        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button onSelect={() => setAddingProjects(true)}>+</Button>
        </div>

        {addingProject &&
          <div className="fixed h-full w-full bg-black/50 backdrop-blur-xs flex justify-center items-center">
            {/* modulo  */}
              <AddForm onSelect={()=>setAddingProjects(false)}/>
          </div>
        }
      </div>
    )
}

export default Projects;