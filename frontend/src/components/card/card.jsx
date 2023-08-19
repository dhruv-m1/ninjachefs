import { Link } from "react-router-dom";
import styles from "./card.module.css";


export default function Card(props) {

    if (props.name) return (
        <Link to={`/recipe/view/${props.obj._id}`}>

            <div className={`font-poppins rounded-lg bg-white shadow-ninja card`} 
            style={{width: props.width, height: props.height}}>
                
                <div className="bg-gray-500 bg-cover h-[150px] w-[90%] relative left-[5%] top-[5%] rounded-[5px] bg-center"
                 style={{backgroundImage: `url('${props.img}')`}}>
                </div>
                
                <div className="font-poppins font-semibold text-lg h-[60px] w-[90%] ml-[5%] mt-[20px] 
                text-ellipsis overflow-hidden text-ninja-blue">

                    <span>{props.name}</span>

                </div>

                <span className="float-left relative top-2 left-[5%] font-normal text-chefs-blue text-sm ">
                    {props.chef}
                </span>
                
                <span className={`float-right relative right-[5%] top-2 text-sm text-right capitalize 
                ${styles[props.type]}` }>
                    {props.type}
                </span>

            </div>

        </Link>
    );

    return (
        <Link to="#">
    
            <div className={`font-poppins rounded-lg bg-white shadow-ninja card`} 
            style={{width: props.width, height: props.height}}>
                
                <div className="bg-slate-200 animate-pulse bg-cover h-[150px] w-[90%] relative left-[5%] top-[5%] rounded-[5px]">
                </div>
                
                <div className="font-poppins font-semibold text-lg h-[60px] w-[90%] ml-[5%] mt-[20px] 
                text-ellipsis overflow-hidden text-ninja-blue">
    
                    <div className="mt-1 h-7 w-52 rounded-lg bg-slate-200 animate-pulse"></div>
    
                </div>
    
                <div className="bg-slate-200 animate-pulse float-left relative top-2 left-[5%] h-5 w-28 rounded-md">
                    
                </div>
                
                <div className="bg-slate-200 animate-pulse float-right relative right-[5%] top-2 h-5 w-20 rounded-md">
                </div>
    
            </div>
    
        </Link>
    );

    

  }