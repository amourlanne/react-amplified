import React, { useEffect, useState } from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import { API } from "aws-amplify";

const ViewRecipe = () => {

  let { id } = useParams();
  const history = useHistory()

  const [ recipe, setRecipe ] = useState(null)

  useEffect(() => {
    fetchRecipe(id)
  }, [id])

  async function fetchRecipe(id) {
    try {
      const recipeData = await API.get('recipeapi', `/recipe/${id}`)
      const recipe = recipeData.data
      setRecipe(recipe)
    } catch (err) { console.log('error fetching recipe') }
  }

  async function removeRecipe() {
    try {
      await API.del('recipeapi', `/recipe/${id}`)
      history.push('/');
    } catch (err) {
      console.log('error deleting recipe:', err)
    }
  }

  return (
      <div className="container mt-5">
        <div className="mb-4">
          <Link to="/">← Retour</Link>
          <button onClick={removeRecipe} className="btn btn-danger float-right">Supprimer</button>
        </div>
        {recipe &&
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <div className="row">
              <div className="col">
                <h6 className="card-subtitle mb-2 text-muted">Ingrédients</h6>
                <p className="card-text" style={{ whiteSpace: 'pre-line'}}>{recipe.ingredients}</p>
              </div>
              <div className="col">
                <h6 className="card-subtitle mb-2 text-muted">Préparation</h6>
                <p className="card-text" style={{ whiteSpace: 'pre-line'}}>{recipe.preparation}</p>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
  )
}

export default ViewRecipe;
