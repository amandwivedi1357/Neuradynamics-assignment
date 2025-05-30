import { useNavigate } from "react-router-dom";

export default function InteractiveCard() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    }
  return (
    <div
      onClick={handleNavigate}
      className="relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer text-2xl font-bold bg-yellow-400 text-black
                 hover:shadow-xl hover:shadow-yellow-500/50 transition-shadow duration-300"
    >
      <div className="z-10 absolute w-full h-full peer"></div>
      <div
        className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%]
                   -top-32 -left-16 w-32 h-44 rounded-full bg-yellow-300 transition-all duration-500"
      ></div>
      <div
        className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none
                   peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full
                   -bottom-32 -right-16 w-36 h-44 rounded-full bg-yellow-300 text-black transition-all duration-500"
      >
        Click to Add to Favourites
      </div>
      <div className="w-full h-full items-center text-center justify-center flex uppercase">No Items in favourite</div>
    </div>
  )
}
