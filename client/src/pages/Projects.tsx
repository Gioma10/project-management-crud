import { useEffect, useState } from "react"
import axios from "axios"
import Button from "../components/Button"
import Card from "../components/Card"
import AddForm from "../components/AddForm"
import EditForm from "../components/EditForm";

const Projects: React.FC = ()=>{

  const [projects, setProjects]= useState<Project[]>([])
  const [loading, setLoading]= useState<boolean>()
  const [addingProject, setAddingProjects] = useState<boolean>(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  interface Project {
    id: string;
    title: string;
    description: string;
  }

  const fecthAPI = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/projects');
      // console.log(response.data.projects);  // Verifica che l'ID sia qui
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

  const handleEdit = (project: Project) => {
    setEditingProject(project); // Imposta il progetto che si sta modificando
  };

  const handleSave = (updatedProject: Project) => {
    setProjects((prevProjects) => 
      prevProjects.map((project) => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };


  useEffect(()=>{
    fecthAPI()
  }, [addingProject])

  // console.log(projects);
  
    return (
        <div className="h-screen bg-[#4D6A6D] gap-12 flex flex-col justify-center items-center text-[#C5C5C5]">
        <h1 className="text-6xl">Projects</h1>
        {loading && <p className="animate-pulse">Loading...</p>}
        {projects.length > 0 ?
          <div className="flex gap-12">
            {projects.map((project)=>{
              return (
                <Card key={project.id} project={project} onDelete={handleDelete} onEdit={handleEdit}/>
              )
            })}
          </div>
          :
          <p>No projects...</p>
        }

        <div className="flex gap-2">
          <Button onSelect={() => setAddingProjects(true)}>Add Projects +</Button>
        </div>

        {addingProject &&
          <div className="fixed h-full w-full bg-black/50 backdrop-blur-xs flex justify-center items-center">
            {/* modulo  */}
              <AddForm 
                onClose={() => setAddingProjects(false)}/>
          </div>
        }

        {editingProject && (
          <div className="fixed h-full w-full bg-black/50 backdrop-blur-xs flex justify-center items-center">
            <EditForm
              project={editingProject}
              onClose={() => setEditingProject(null)}
              onSave={handleSave}
            />
          </div>
        )}

        
      </div>
    )
}

export default Projects;