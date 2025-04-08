import { useEffect } from "react"
import axios from "axios"

function App() {


  const fecthAPI = async ()=>{
     const response = await axios.get('http://localhost:8080/api')
    console.log(response.data.projects);
    
  }

  useEffect(()=>{
    fecthAPI()
  })

  return (
    <>
      <div className="h-screen bg-[#4D6A6D] flex justify-center items-center text-[#C5C5C5]">
        <p>Non ci sono progetti...</p>
      </div>
    </>
  )
}

export default App
