import { useRecipes } from "../providers/recipeContext";


export default function Card(props) {
    const recipes = useRecipes()
    const openModal = async() => {
        await recipes.getSpecific(props.obj._id);
        window.scrollTo({ top: 0, left: 0});
        document.querySelector('.recipe-modal-wrapper').style.display = 'unset';
        document.querySelector('body').style.overflowY = 'hidden';

    }

    return (
        <div className="card" onClick={openModal}>
            <div className="card-thumbnail" style={{backgroundImage: `url('${props.img}')`}}></div>
            <div className="card-title">{props.name}</div>
            <span className="chef-name">{props.chef}</span>
            <span className={`meal-type ${props.type}` }>{props.type}</span>
        </div>
    );
  }