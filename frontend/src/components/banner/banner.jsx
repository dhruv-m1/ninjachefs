export default function Banner(props) {
    return (
        <div className="bg-ninja-blue rounded-3xl py-5 px-7 text-white font-poppins flex flex-col grow gap-y-2">

            <h1 className="font-semibold text-2xl font-poppins">Featured</h1>
            {props.text && <h2 className="font-poppins font-medium text-lg" id="featured-dynamic-text">{props.text}</h2>}

            {!props.text && <div className="mt-1 h-7 w-96 rounded-lg bg-[#7e818c] animate-pulse"></div>}
            {!props.text && <div className="mt-1 h-7 w-64 rounded-lg bg-[#7e818c] animate-pulse"></div>}
        </div>
    );
}