import '../styles/style.css';
import { getPokemonData } from './modules/HttpRequest';
import { extractData, showData , cryPokemon} from './modules/PokemonData';

// 入力値を小文字に変換
const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  return pokeName;
}

// submit処理
const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);
  const pokemonData = await getPokemonData(inputName);
  const extractedData = extractData(pokemonData)
  showData(extractedData);
  cryPokemon(extractedData);
}

// formにsubmit処理を付与
document.querySelector("#js-form").addEventListener("submit", (e) => submitHandler(e));