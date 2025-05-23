import { Routes, Route, BrowserRouter } from "react-router";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout"
import Details from "./pages/Details"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />}/> 
          <Route path="projects" element={<Projects />}/> 
          <Route path="projects/details/:id" element={<Details />} />
        </Route>        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
