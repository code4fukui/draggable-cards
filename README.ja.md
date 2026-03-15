# draggable-cards

ドラッグ&ドロップ可能なカードを作成できるJavaScriptライブラリです。カードをスナップさせて重なり順を自動調整することができます。

## デモ
[デモページ](https://code4fukui.github.io/draggable-cards/)で機能を確認できます。

## 機能
- カードをドラッグ&ドロップできる
- カードがスナップする（位置がスナップする）
- カードが重なる際に自動的に重なり順を調整する

## 使い方

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

## ライセンス
MIT License