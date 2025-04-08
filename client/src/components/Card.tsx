
interface CardPorps {
    project: string,
}

const Card: React.FC<CardPorps> = ({project})=>{
    return (
        <div>
            <div
                  className="w-52 h-60 shadow-lg bg-[#4C5B61] flex flex-col justify-center items-center rounded-xl">
                    <h3>{project}</h3>
                </div>
        </div>
    )
}

export default Card;