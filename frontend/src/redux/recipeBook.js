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

export const getRecipes = createAsyncThunk(
  'recipeBook/getRecipes',
  async () => {
    const res = await fetch('http://localhost:8080/api/v1/recipes').then(
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

      if (format == 'peg') {
        
        format = 'jpg';
      }

      imgObj = {
        format: format,
        img: parition[1]
      }

      data.img = null;
    }

    let res = await fetch("http://localhost:8080/api/v1/recipes", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
    });

    res = await res.json()


    if (imgObj != null) {

      console.log('hi');
      imgObj.idx = res.idx;
      
      let img = await fetch("http://localhost:8080/api/v1/recipes/thumbnails", {
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

export const recipeSlice = createSlice({
  name: 'recipeBook',
  initialState,
  reducers: {
    add: (state, action) => {
      state.recipes.push(action.payload);
    },
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

    [getRecipes.rejected]: () => {
      alert('Error: Unable to fetch recipes.')
    }
  }
})

export const { add, show } = recipeSlice.actions

export default recipeSlice.reducer