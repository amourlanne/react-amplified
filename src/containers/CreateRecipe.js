import { API } from "aws-amplify";
import React, { useState } from 'react'
import {Link, useHistory } from "react-router-dom";

const initialState = { name: '', ingredients: '', preparation: '' }

const CreateRecipe = () => {

  const [formState, setFormState] = useState(initialState)
  const history = useHistory()

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }


  async function addRecipe() {
    try {
      if (!formState.name || !formState.ingredients || !formState.preparation) return
      const recipe = { ...formState }
      setFormState(initialState)
      await API.post('recipeapi', '/recipe', {
        body: recipe, // replace this with attributes you need
      })
      history.push('/');
    } catch (err) {
      console.log('error creating recipe:', err)
    }
  }

  return (
      <div className="container mt-5">
        <div className="mb-4">
          <Link to="/">← Retour</Link>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="nameInput">Nom</label>
            <input
                required
                onChange={event => setInput('name', event.target.value)}
                className="form-control" id="nameInput"/>
          </div>
          <div className="form-group">
            <label htmlFor="ingredientsInput">Ingrédients</label>
            <textarea
                required
                onChange={event => setInput('ingredients', event.target.value)}
                className="form-control" id="ingredientsInput" rows="6"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="preparationInput">Préparation</label>
            <textarea
                required
                onChange={event => setInput('preparation', event.target.value)}
                className="form-control" id="preparationInput" rows="6"></textarea>
          </div>
          <button onClick={addRecipe} className="btn btn-primary">Ajouter</button>
        </div>
      </div>
  )
}

export default CreateRecipe;
