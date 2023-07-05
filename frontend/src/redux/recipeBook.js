// Cookbook Store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {

  recipes: [],
  display: {
    name: "",
    chef: "",
    preptime: 0,
    type: "",
    steps: [],
    preplist: []
  }

}

const BACKEND_URI = "https://walrus-app-kn6zv.ondigitalocean.app";

export const getRecipes = createAsyncThunk(
  'recipeBook/getRecipes',
  async () => {
    const res = await fetch(`${BACKEND_URI}/api/v1/recipes`).then(
    (data) => data.json()
  )
  return res;
})

export const postRecipe = createAsyncThunk(
  'recipeBook/postRecipe',
  async (data) => {

    let token = data.token;
    delete data.token;

    let imgObj = null;
    if (data.img != null) {

      let parition = data.img.split(";base64,");

      let format = parition[0].slice(-3);

      if (format === 'peg') {
        
        format = 'jpg';
      }

      imgObj = {
        format: format,
        img: parition[1]
      }

      data.img = null;
    }
    //console.log(await getToken());
    let res = await fetch(`${BACKEND_URI}/api/v1/recipes`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      "body": JSON.stringify(data)
    });

    res = await res.json()
    data._id = res._id;

    if (imgObj != null) {

      imgObj.idx = res._id;
      
      let img = await fetch(`${BACKEND_URI}/api/v1/recipes/thumbnails`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      "body": JSON.stringify(imgObj)
    })

    img = await img.json()
    data.img = img.url;

    }

    return data;
})

export const deleteRecipe = createAsyncThunk(
  'recipeBook/deleteRecipe',
  async (data) => {
    let token = data.token;
    await fetch(`${BACKEND_URI}/api/v1/recipes/${data.idx}`, { method: 'DELETE', "headers": { "Authorization": `Bearer ${token}`} }).then(
    (res) => res.json()
  )
  return data.idx;
})

export const recipeSlice = createSlice({
  name: 'recipeBook',
  initialState,
  reducers: {
    show: (state, action) => {
      state.display = action.payload;
    },
  },
  extraReducers: {

    [getRecipes.fulfilled]: (state, { payload }) => {
      state.recipes = payload;
    },

    [postRecipe.fulfilled]: (state, { payload }) => {
      state.recipes.push(payload);
    },

    [deleteRecipe.fulfilled]: (state, { payload }) => {
      let index = state.recipes.findIndex(recipe => recipe._id === payload );
      state.recipes.splice(index, 1);
    },

    [postRecipe.rejected]: (state, { payload }) => {
      alert('Error: Unable to post recipe.');
    },

    [deleteRecipe.rejected]: (state, { payload }) => {
      alert('Error: Unable to delete recipe.');
    },

    [getRecipes.rejected]: (payload) => {
      alert('Error: Unable to fetch recipes.');
      console.log(payload);
    }
  }
})

export const { show } = recipeSlice.actions

export default recipeSlice.reducer