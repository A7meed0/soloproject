
import React from "react";
import "./RecipeDetail.css"; 

const RecipeDetail = ({ selectedRecipe }) => {
  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-title">{selectedRecipe.title}</h2>
      <img className="recipe-image" src={selectedRecipe.img} alt={selectedRecipe.title} />
      <div className="recipe-details">
        <h3 className="recipe-subtitle">Ingredients:</h3>
        <p className="recipe-ingredients">{selectedRecipe.ingredients}</p>
        <h3 className="recipe-subtitle">Preparation:</h3>
        <p className="recipe-preparation">{selectedRecipe.preparation}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
