
const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const { getAllRecipes, getRecipeBytitle, addRecipe, updateRecipeById, deleteRecipeById } = require("./database/mongodb/index");

app.use(express.json());
app.use(cors());

app.get("/recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

// app.get("/recipes/:name", async (req, res) => {
//   const recipename = req.params.name;
//   const recipe = await getRecipeById(recipename);
//   res.json(recipe);
// });
app.get("/recipes/:name", (req, res) => {
  let name= req.params.name
  getRecipeBytitle(name).then((response) => {
    res.status(200).json(response)
  }).catch((err) => {
    res.status(400).json(err)
  })
})

app.post("/recipes", async (req, res) => {
  const recipeData = req.body;
  await addRecipe(recipeData);
  res.send("Recipe added successfully!");
});

app.put("/recipes/:id", async (req, res) => {
  console.log(req.params,req.body.title)
  const recipeId = req.params.id;
  const updatedData = req.body.title;
  await updateRecipeById(recipeId, updatedData);
  res.json("Recipe updated successfully!");
});

app.delete("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  await deleteRecipeById(recipeId);
  res.json("Recipe deleted successfully!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});