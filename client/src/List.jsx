import React, { useState } from "react";
import "./List.css";

const List = (props) => {
  const [inputName, setName] = useState("")
  const handleAddRecipe = (e) => {
    e.preventDefault();
    props.addRecipe();
    resetForm();
  };
 
  

  const handleDeleteRecipe = (recipeId) => {
   
      props.deleteRecipe(recipeId);
    
  };

  const handleSearch = () => {
    const searchInput = document.getElementById("searchInput");
    props.handleSearch(searchInput.value);
  };

  const resetForm = () => {
    props.onChange({
      target: {
        name: "title",
        value: "",
      },
    });
    props.onChange({
      target: {
        name: "img",
        value: "",
      },
    });
    props.onChange({
      target: {
        name: "ingredients",
        value: "",
      },
    });
  };

  return (
    <>
      <div>
        <h1 id="title">Delicious Recipes</h1>
        <input id="searchInput" type="text" placeholder="Search.." />
        <button onClick={handleSearch}>Search</button>
        <form onSubmit={handleAddRecipe}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={props.newRecipe.title}
              onChange={props.onChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="img"
              value={props.newRecipe.img}
              onChange={props.onChange}
            />
          </label>
          <label>
            Ingredients:
            <textarea
              name="ingredients"
              value={props.newRecipe.ingredients}
              onChange={props.onChange}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="recipe-container">
        {Array.isArray(props.recipes) ? (
          props.recipes.map((recipe) => (
            <div key={recipe._id} className="recipe">
              <h2>{recipe.title}</h2>
              <img
                id="img"
                src={recipe.img}
                alt={recipe.title}
                onClick={() => props.onRecipeClick(recipe)} 
              />
              <br />
              <button id="del" onClick={() => handleDeleteRecipe(recipe._id)}>
                Delete
              </button > <input type="text" placeholder="put name" onChange={(e=>{setName(e.target.value)})} />
              <button onClick={()=>props.updateRecipe( inputName,recipe._id)}>update</button>
            </div>
          ))
        ) : (
          <p>No recipes available</p>
        )}
      </div>
    </>
  );
};

export default List;