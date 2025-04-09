import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
const RootLayout: React.FC = ()=>{
    return (
        <div className="h-screen bg-[#4D6A6D] flex justify-center items-center text-[#C5C5C5]">
            <Navbar />
            <main >
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout;