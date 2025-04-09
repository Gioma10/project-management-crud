import { Link } from "react-router";

const Navbar: React.FC = ()=>{
    const navElements = [
        {name:'Home', href: '/'}, 
        {name: 'projects', href: '/projects'}
    ]
    return (
        <nav className="fixed top-0">
            <ul className="flex justify-center items-center gap-5 p-2 mt-5 rounded-xl">
                {
                    navElements.map((item, index)=>{
                        return (
                            <Link key={index} to={item.href}className="cursor-pointer hover:border-white border-transparent border-b">
                                <li>
                                    {item.name}
                                </li>
                            </Link>
                        )
                    })
                }
                
            </ul>
        </nav>
    )
}

export default Navbar;