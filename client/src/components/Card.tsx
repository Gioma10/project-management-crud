import Button from "./Button";

interface CardPorps {
    project: {title: string, description: string},
}

const Card: React.FC<CardPorps> = ({project})=>{
    return (
        <div>
            <div
                  className="w-52 h-60 shadow-lg bg-[#4C5B61] gap-5 flex flex-col justify-center items-center rounded-xl p-10">
                    <h3 className="text-2xl">{project.title}</h3>
                    <p className="text-sm text-center">{project.description}</p>
                    <Button>Details</Button>
                </div>
        </div>
    )
}

export default Card;