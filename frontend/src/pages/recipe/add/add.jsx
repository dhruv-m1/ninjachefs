import { useRecipes } from "../../../providers/recipeContext"

import styles from "./formModal.module.css";

export default function AddRecipe({form, setForm}) {

    const recipes = useRecipes();

    const closeModal = () => {
        document.querySelector('.add-item-modal-wrapper').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
    }

    const resetForm = () => {
        document.querySelector('form').reset();
    }

    const addItem = async() => {

        let formdata = new FormData(document.querySelector("#add-item-form"));

        let values = [];
        values.push(formdata.get("itemTitle"));
        values.push(formdata.get("chef"));
        values.push(formdata.get("prepTime"));
        values.push(formdata.get("type"));
        values.push(formdata.get("ingredients"));
        values.push(formdata.get("proceedure"));

        let file = formdata.get("thumbnail");
        
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async() => {

            let proceed = true;

            for (let value of values) {

                if (!value || value === '') {
                    alert('all text fields are mandatory, pls try again.');
                    proceed = false;
                    break;
                }
        
            }

            //alert(proceed);

            if (proceed === true) {
                if (file.name !== '') {
                    values.push(reader.result);
                } else {
                    values.push(null);
                }
            
                let item = {
                    name: values[0],
                    chef: values[1],
                    preptime: values[2],
                    type: values[3],
                    preplist: values[4].split('\n'),
                    steps: values[5].split('\n'),
                    img: values[6]
                }
                
                await recipes.add(item);
                //dispatch(postRecipe(item));
                closeModal();
                resetForm();
                
            }
        };

    }

    return (
        <div>
            
        </div>
    );
  }