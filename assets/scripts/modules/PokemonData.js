export const extractData = (pokemonData) => {
  const id = pokemonData.id;
  const name = pokemonData.name;
  const img = pokemonData.sprites.front_default
  const types = [];
  const cries = pokemonData.cries.latest;
  pokemonData.types.forEach(typeItem => {
    types.push(typeItem.type.name);
  });
  return {id, name, img, types, cries}
}

export const showData = (data) => {
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt=""></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dd>
  </dl>`
  document.querySelector("#js-result").innerHTML = htmlData;
}

//検索したポケモンの鳴き声を再生。
export const cryPokemon = (data) => {
  const audioContext = new ( window.AudioContext || (window).webkitAudioContext )();
  fetch(`${data.cries}`)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    })
    .catch(e => console.error(e));
};