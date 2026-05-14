# draggable-cards

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A lightweight, dependency-free JavaScript library for creating draggable cards with grid-snapping and automatic stacking.

## Demo

See the [live demo](https://code4fukui.github.io/draggable-cards/).

Drag cards around the green area. They will snap to a grid when dropped. Dropping cards near the same position will create a stack.

## Features

-   **Drag and Drop:** Smooth card movement powered by vanilla JavaScript.
-   **Grid Snapping:** Automatically aligns cards to a configurable grid on drop.
-   **Automatic Stacking:** Manages `z-index` to stack cards dropped in the same location. Only the top card of a stack is draggable.
-   **Touch Support:** Works on both desktop (mouse) and mobile (touch) devices.
-   **Dependency-Free:** A single, lightweight ES6 module with no external dependencies.

## Setup

This library requires a specific HTML and CSS structure to function correctly.

1.  **Container:** Create a container element for the cards. This element must have its `position` set to `relative`.
2.  **Cards:** The card elements you want to drag must be direct children of the container and have their `position` set to `absolute`.

### Example HTML & CSS

```html
<style>
  /* 1. The container must be relatively positioned */
  #card-container {
    position: relative;
    width: 100%;
    height: 50vh;
    background-color: darkgreen;
    border: 2px solid black;
    overflow: hidden;
  }

  /* 2. Cards must be absolutely positioned */
  .card {
    position: absolute;
    width: 50px;
    height: 70px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: grab;
    user-select: none;
    /* Optional: for styling */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  }
</style>

<main id="card-container"></main>
```

## Usage

Import the `DraggableCards` class from the ES module, instantiate it, and add your card elements.

```js
import { DraggableCards } from "https://code4fukui.github.io/draggable-cards/DraggableCards.js";

// Get the container element
const main = document.getElementById('card-container');

// Initialize with a 60px horizontal and 80px vertical snap grid
const dcards = new DraggableCards(60, 80);

// Create and add cards
for (let i = 1; i <= 13; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = i;
  main.appendChild(card);
  dcards.add(card);
}
```

## API

### `new DraggableCards(snapw, snaph, maxcards, maxstackv)`

Creates a new `DraggableCards` instance to manage a set of cards.

-   `snapw` (Number, optional): The width of the grid cells for horizontal snapping. Defaults to `0` (no horizontal snap).
-   `snaph` (Number, optional): The height of the grid cells for vertical snapping. Defaults to `0` (no vertical snap).
-   `maxcards` (Number, optional): A large integer used for the `z-index` of the card being dragged to ensure it appears on top. Defaults to `10000`.
-   `maxstackv` (Number, optional): The pixel tolerance to consider cards as being in the same stack. This also controls the visual offset of stacked cards. Defaults to `5`.

### `dcards.add(element)`

Enables dragging for a given HTML element.

-   `element` (HTMLElement): The DOM element to make draggable. The library will add event listeners and manage its position and `z-index`.

## License

MIT License — see [LICENSE](LICENSE).