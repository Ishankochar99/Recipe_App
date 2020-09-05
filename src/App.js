import React,{useEffect,useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () =>{
  const APP_ID="b1cf9ae5";
  const APP_KEY="a48a6d78e9b5d9a42f9399f72e54dec6";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('');

  useEffect(() => {
    wantRecipes();
  }, [query]);

  const wantRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
      setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <h1>Search for your recipe here!!</h1>
      <form onSubmit={getSearch} className="forms">
        <input className="bars" type="text" value={search} onChange={updateSearch} />
        <button className="buttons" type="submit">
          Search
        </button>
      </form>
      <h1>Welcome to the Recipe App</h1>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.number}
            title={recipe.recipe.label} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;