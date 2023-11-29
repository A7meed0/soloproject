const { text } = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Recipe')
.then(() => {
  console.log("Connected to MongoDB !")
})



  // ADD your Schema here!
  const Schema = mongoose.Schema;
  const recipeSchema = new Schema({
    title: String,
    ingredients: [String],
    img: String,
    preparation:String
  });
  // ADD the Model compiled from the above Schema
  const Recipe = mongoose.model('Recipe', recipeSchema);

  // ADD Functions to interact with the Schema
  const addRecipe = async (recipeData) => {
    try {
     
      await Recipe.create(recipeData);
      console.log('Recipe added successfully.');
    } catch (error) {
      console.error('Err add recipe:', error);
    }
  };

  const getAllRecipes = async () => {
    try {
      const recipes = await Recipe.find();
      return recipes;
    } catch (error) {
      console.error('Err get recipes:', error);
      return [];
    }
  };


  const getRecipeBytitle= async (title) => {
    try {
      const recipe = await Recipe.findOne({title});
      return recipe;
    } catch (error) {
      console.error('Err get recipe by title:', error);
      return null;
    }
  };


  const deleteRecipeById = async (recipeId) => {
    try {
      await Recipe.findByIdAndDelete(recipeId);
      console.log('Recipe deleted successfully.');
    } catch (error) {
      console.error('Error deleting recipe by ID:', error);
    }
  };


  
  const updateRecipeById = async (recipeId, name) => {
    try {
      await Recipe.findByIdAndUpdate(recipeId, {title: name});
      console.log('Recipe updated successfully.');
    } catch (error) {
      console.error('Error updating recipe by ID:', error);
    }
  };

  

// Don't forget to export your functions!
module.exports = {
  addRecipe,getAllRecipes,getRecipeBytitle,deleteRecipeById,updateRecipeById
};