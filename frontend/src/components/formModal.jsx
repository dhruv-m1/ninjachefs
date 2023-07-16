import { useRecipes } from "../providers/recipeContext";

export default function FormModal() {

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
        <div className="add-item-modal-wrapper">

            <section id="item-modal">
                <form id="add-item-form" name="add-item-form">
                    <h1>Add Recipe (all text fields mandatory)</h1>
                    <div><input type="text" id="item-title" name="itemTitle" placeholder="Recipe Title" required/></div>
                    <div><input type="text" id="chef" name="chef" placeholder="Chef Name" required/></div>
                    <div><input type="number" id="prep-time" name="prepTime" placeholder="Cooking Time (mins)" required/></div>

                    
                    <div>
                        <select name="type" id="type" title="diet type" required>
                            <option value="non-vegetarian">Non-Vegetarian</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                        </select>
                    </div>

                    <div><textarea required id="ingredients" name="ingredients" placeholder="List ingredients needed (each on a new line)"></textarea></div>
                    
                    <div>
                        <label htmlFor="thumbnail">Upload Cover Image:</label>
                        <input type="file" id="thumbnail" name="thumbnail" accept="image/gif, image/jpeg, image/png, image/svg"/>
                    </div>

                    <div><textarea id="proceedure" required name="proceedure" placeholder="List the proceedure (each step on a new line)"></textarea></div>
                    
                    <div><input type="button" className="btn green-btn" value="Submit" onClick={addItem}/></div>
                    <div><input type="button" className="btn green-btn" value="Reset" onClick={resetForm}/></div>
                    <div><input className="red-btn btn" type="button" value="Cancel" onClick={closeModal}/></div>

                </form>

            </section>

        </div>
    );
  }