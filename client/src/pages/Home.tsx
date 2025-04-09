import Button from "../components/Button";
import { Link } from "react-router";

const Home : React.FC = ()=>{
    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-8xl">Welcome to my CRUD</h1>
            <Link to="/projects">
                <Button>View projects</Button>
            </Link>
        </div>
    )
}

export default Home;