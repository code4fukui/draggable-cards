# draggable-cards

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Draggable cards using vanilla JavaScript.

## Demo
See the [live demo](https://code4fukui.github.io/draggable-cards/).

## Features
- Draggable cards that snap to a grid
- Supports stacking of cards
- Lightweight and dependency-free

## Usage

```js
import { DraggableCards } from "https://code4fukui.github.io/draggable-cards/DraggableCards.js";

const snapw = 60;
const snaph = 80;
const dcards = new DraggableCards(snapw, snaph);
for (let i = 1; i <= 13; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = i;
  main.appendChild(card);
  dcards.add(card);
}
```

## License
MIT License — see [LICENSE](LICENSE).