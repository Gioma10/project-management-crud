import { useEffect, useState } from "react"
import axios from "axios"

function App() {
const [projects, setProjects]= useState<[]>([])

const fecthAPI = async ()=>{
  const response = await axios.get('http://localhost:8080/api')
    setProjects(response.data.projects)
    console.log(response.data.projects);
  }
  useEffect(()=>{
    fecthAPI()
  }, [])


  return (
    <>
      <div className="h-screen bg-[#4D6A6D] flex justify-center items-center text-[#C5C5C5]">
        {projects.length > 0 ?
          <div className="flex gap-5">
            {projects.map((project, index)=>{
              return (
                <div 
                  key={index}
                  className="w-52 h-60 shadow-lg bg-[#4C5B61] flex flex-col justify-center items-center">
                    <h3>{project}</h3>
                </div>
              )
            })}
          </div>
          :
          <p>Non ci sono progetti...</p>
        }
      </div>
    </>
  )
}

export default App
