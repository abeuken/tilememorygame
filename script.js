let colours = ["red", "red", "blue", "blue", "green", "green", "yellow", "yellow", "purple", "purple", "pink", "pink"];

let tileObjects = [];
let clickedTiles = [];
let openTiles = 0;

class Tile {
  constructor(_htmlElement, _id) {
    this.index = Math.floor(Math.random() * colours.length);
    this.colour = colours.splice(this.index, 1)[0];
    this.htmlElement = _htmlElement;
    this.id = _id;
  }
}
// creates new tiles and saves in tileObjects array
for (let i = 0; i < 12; i++) {
  let tile = new Tile(document.getElementById(`${i}`), i);
  tileObjects.push(tile);
}

// adds click event listener to each html tile, (applying eventListener to html element)
for (const e of tileObjects) {
  e.htmlElement.addEventListener("click", function () {
    if (clickedTiles.length < 2) {
      let htmlTileElement = e.htmlElement;
      htmlTileElement.style.backgroundColor = e.colour;
      clickedTiles.push(e);
    }

    if (clickedTiles.length === 2) {
      // compares the colour of opened tiles
      if (clickedTiles[0].colour === clickedTiles[1].colour) {
        clickedTiles.forEach((x) => (x.htmlElement.style.border = "#7FFF00 2px solid"));

        openTiles += 2;
        clickedTiles = [];

        //this else block runs when no match is found
      } else {
        setTimeout(() => {
          clickedTiles.forEach((element) => (element.htmlElement.style.backgroundColor = "grey"));
          clickedTiles = [];
        }, 300);
      }
    }
    // check if game is won
    if (openTiles === 12) {
      const won = document.createElement("H1");
      won.textContent = "You won!";
      document.body.appendChild(won);
      let resetButton = document.querySelector("#reset");
      resetButton.addEventListener("click", function () {
        location.reload();
      });
    }
  });
}
