import { Link } from "react-router-dom";
import styles from "./card.module.css";


export default function Card(props) {

    return (
        <Link to={`/recipe/view/${props.obj._id}`}>
            <div className={`${styles.card} card`} style={{width: props.width, height: props.height}}>
                <div className={styles.thumbnail} style={{backgroundImage: `url('${props.img}')`}}></div>
                <div className={styles.title}><span>{props.name}</span></div>
                <span className={styles.chefName}>{props.chef}</span>
                <span className={`${styles.mealType} ${styles[props.type]}` }>{props.type}</span>
            </div>
        </Link>
    );
  }