import { Link } from "react-router-dom";

export default function FeaturedBanner(props) {

    return (
            <div className="bg-ninja-blue rounded-3xl py-5 px-7 text-white font-poppins grow">
                <Link to={`/recipe/view/${props.id}`}>
                    <div className="flex flex-col grow gap-y-2 font-poppins">
                        <h1 className="font-semibold text-lg md:text-2xl font-poppins">Featured</h1>

                        {props.name && <h2 className="lg:hidden font-medium md:text-xl capitalize">{props.author}'s {props.name}</h2>}
                        {props.text && <h2 className="italic font-medium text-sm md:text-base lg:text-lg">{props.text}</h2>}

                        {props.text && 
                            <h3 className="text-sm md:text-base lg:hidden">
                                Take a look &nbsp;
                                <i className="fa-solid fa-arrow-right"></i>
                            </h3>
                        }

                        {!props.text && <div className="mt-1 h-7 w-[96%] xl:w-[82%] rounded-lg bg-[#7e818c] animate-pulse"></div>}
                        {!props.text && <div className="mt-1 h-7 w-[64%] rounded-lg bg-[#7e818c] animate-pulse"></div>}
                        {!props.text && <div className="md:hidden mt-1 h-7 w-[64%] rounded-lg bg-[#7e818c] animate-pulse"></div>}

                    </div>
                </Link>
            </div>
        
    );
}