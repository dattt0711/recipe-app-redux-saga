import axios from "axios";

const YOUR_APP_KEY = 'ffda89a3b3b9c100904f80fba4830f24';
const YOUR_APP_ID = 'fc13fffa';

export const getRecipes = async (query) =>{
    
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await axios.get(url);
}