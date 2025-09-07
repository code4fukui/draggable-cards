# draggab-ecards

- [DraggableCards.js](https://code4fukui.github.io/draggable-cards/)

## usage

```js
import { DraggableCards } from "https://code4fukui.github.io/draggable-cards/DraggableCards.js";

const snapw = 60;
const snaph = 80;
const dcards = new DraggableCards(snapw, snaph);
for (let i = 1; i <= 13; i++) {
	const card = document.createElement('div');
	card.className = 'card';
	card.textContent = i;
	//document.body.appendChild(card);
	main.appendChild(card);
	dcards.add(card);
}
```
