// Cookbook Store

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

const BACKEND_URI = 'https://ninjachefs-api.dhruv.tech';

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

    let res = await fetch(`${BACKEND_URI}/api/v1/recipes`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
    });

    res = await res.json()
    data.idx = res.idx;

    if (imgObj != null) {

      imgObj.idx = res._id;
      
      let img = await fetch(`${BACKEND_URI}/api/v1/recipes/thumbnails`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
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
  async (idx) => {
    await fetch(`${BACKEND_URI}/api/v1/recipes/${idx}`, { method: 'DELETE' }).then(
    (data) => data.json()
  )
  return idx;
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

    [getRecipes.rejected]: () => {
      alert('Error: Unable to fetch recipes.');
    }
  }
})

export const { show } = recipeSlice.actions

export default recipeSlice.reducer