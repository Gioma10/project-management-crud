import { useEffect, useState } from "react"
import axios from "axios"
import Button from "./components/Button"
import Card from "./components/Card"
import AddForm from "./components/AddForm"

function App() {
const [projects, setProjects]= useState<[]>([])
const [loading, setLoading]= useState<boolean>()
const [addingProject, setAddingProjects] = useState<boolean>(false)

const fecthAPI = async ()=>{
  try {
    setLoading(false);
    const response = await axios.get('http://localhost:8080/api/projects')
    setProjects(response.data.projects)
    // console.log(response.data.projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    setLoading(false)
  }
  }
  useEffect(()=>{
    fecthAPI()
  }, [])

  return (
    <>
      <div className="h-screen bg-[#4D6A6D] gap-12 flex flex-col justify-center items-center text-[#C5C5C5]">
        {loading && <p className="animate-pulse">Caricamento...</p>}
        {projects.length > 0 ?
          <div className="flex gap-5">
            {projects.map((project, index)=>{
              console.log(project);
              
              return (
                <Card key={index} project={project}/>
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
    </>
  )
}

export default App
