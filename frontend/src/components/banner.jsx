
export default function Banner(props) {
    return (
        <div className="text-banner">
            <h1>Featured</h1>
            <h2 id="featured-dynamic-text">{props.text}</h2>
        </div>
    );
}

Banner.defaultProps = {

    text: "There are no recipes to display or feature."

}