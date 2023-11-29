import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import RecipeDetail from "./RecipeDetail"; 


const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    img: "",
    ingredients: "",
  });
  const [count, setCount] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const handleAddRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:8080/recipes", newRecipe);
      const addedRecipe = response.data;
      setRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);

      setNewRecipe({
        title: "",
        img: "",
        ingredients: "",
      });
      setCount(!count);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };
  
  const updateRecipe=(test,recipeID)=>{
    try{
       axios.put(`http://localhost:8080/recipes/${recipeID}`,{title:test});
      setCount(!count);
    } catch(error){
      if(error) console.log(error);
    }
  }

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:8080/recipes/${recipeId}`);
      setCount(!count);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleSearch = async (title) => {
    try {
      const response = await axios.get(`http://localhost:8080/recipes/${title}`);
      console.log(response.data);
      setRecipes([response.data]);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
 
  

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      {selectedRecipe ? (
       
        <RecipeDetail selectedRecipe={selectedRecipe} />
      ) : (
      
        <List updateRecipe= {updateRecipe}
          recipes={recipes}
          newRecipe={newRecipe}
          onChange={handleChange}
          addRecipe={handleAddRecipe}
          deleteRecipe={handleDeleteRecipe}
          handleSearch={handleSearch}
          onRecipeClick={handleRecipeClick} 
          
        />
      )}
    </div>
  );
};

export default App;
