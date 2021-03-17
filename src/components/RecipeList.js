import { API } from "aws-amplify";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const RecipeList = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchRecipes()
  }, [])

  async function fetchRecipes() {
    try {
      const recipeData = await API.get('recipeapi', '/recipe')
      const recipes = recipeData.data
      setRecipes(recipes)
    } catch (err) { console.log('error fetching recipes') }
  }

  return (
      <div className="container mt-5">
        <div className="text-right">
          <Link className="btn btn-primary" to="/create">Ajouter</Link>
        </div>
        {
          recipes.map((recipe, index) => (
              <div className="card mb-4" key={index} style={styles.recipe}>
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.ingredients.length > 12 ? recipe.ingredients.substring(0, 35) + "..." : recipe.ingredients}</p>
                  <Link to={`/recipe/${recipe.id}`} className="card-link">Recette</Link>
                </div>
              </div>
          ))
        }
      </div>
  )
}

const styles = {
  recipe: {  width: "18rem" },
  recipeName: { fontSize: 20, fontWeight: 'bold' },
  recipeIngredients: { marginBottom: 0, whiteSpace: 'pre-line'},
  recipePreparation: { marginBottom: 0 },
}

export default RecipeList;
