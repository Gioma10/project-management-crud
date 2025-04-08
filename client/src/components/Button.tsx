interface ButtonProps {
    children: React.ReactNode,
    onSelect?: ()=> void,
}

const Button: React.FC<ButtonProps> = ({children, onSelect})=>{
    return (
        <button
            type="button"
            onClick={onSelect} 
            className="border px-3 py-1 rounded-xl shadow hover:shadow-white transition-all duration-200 cursor-pointer">
            {children}
        </button>
    )
}

export default Button;