# draggable-cards

グリッドへのスナップ機能と自動スタック機能を備えた、ドラッグ可能なカードを作成するための、軽量で依存関係のないJavaScriptライブラリです。

## デモ

[ライブデモ](https://code4fukui.github.io/draggable-cards/)をご覧ください。

緑色の領域内でカードをドラッグしてみてください。ドロップするとグリッドにスナップします。同じ位置の近くにカードをドロップすると、スタック（山）が作成されます。

## 機能

-   **ドラッグ＆ドロップ:** バニラJavaScriptによるスムーズなカード移動。
-   **グリッドスナップ:** ドロップ時に、設定可能なグリッドに合わせてカードを自動的に整列させます。
-   **自動スタック:** 同じ位置にドロップされたカードの `z-index` を管理してスタックします。スタックの一番上にあるカードのみドラッグ可能です。
-   **タッチサポート:** デスクトップ（マウス）とモバイル（タッチ）の両方のデバイスで動作します。
-   **依存関係なし:** 外部依存関係のない、単一の軽量なES6モジュールです。

## セットアップ

このライブラリが正しく機能するには、特定のHTMLおよびCSS構造が必要です。

1.  **コンテナ:** カード用のコンテナ要素を作成します。この要素は `position` を `relative` に設定する必要があります。
2.  **カード:** ドラッグしたいカード要素は、コンテナの直接の子要素であり、かつ `position` を `absolute` に設定する必要があります。

### 例: HTML & CSS

```html
<style>
  /* 1. コンテナは相対位置指定が必要 */
  #card-container {
    position: relative;
    width: 100%;
    height: 50vh;
    background-color: darkgreen;
    border: 2px solid black;
    overflow: hidden;
  }

  /* 2. カードは絶対位置指定が必要 */
  .card {
    position: absolute;
    width: 50px;
    height: 70px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: grab;
    user-select: none;
    /* オプション: スタイリング用 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  }
</style>

<main id="card-container"></main>
```

## 使い方

ESモジュールから `DraggableCards` クラスをインポートしてインスタンス化し、カード要素を追加します。

```js
import { DraggableCards } from "https://code4fukui.github.io/draggable-cards/DraggableCards.js";

// コンテナ要素を取得
const main = document.getElementById('card-container');

// 60pxの水平グリッドと80pxの垂直グリッドで初期化
const dcards = new DraggableCards(60, 80);

// カードを作成・追加
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

カードのセットを管理するための新しい `DraggableCards` インスタンスを作成します。

-   `snapw` (Number, オプション): 水平方向のスナップに使用するグリッドセルの幅。デフォルトは `0`（水平方向のスナップなし）。
-   `snaph` (Number, オプション): 垂直方向のスナップに使用するグリッドセルの高さ。デフォルトは `0`（垂直方向のスナップなし）。
-   `maxcards` (Number, オプション): ドラッグ中のカードが確実に最前面に表示されるように `z-index` に使用される大きな整数。デフォルトは `10000`。
-   `maxstackv` (Number, オプション): カードが同じスタックにあると見なすためのピクセル許容値。これはスタックされたカードの視覚的なオフセットも制御します。デフォルトは `5`。

### `dcards.add(element)`

指定されたHTML要素のドラッグを有効にします。

-   `element` (HTMLElement): ドラッグ可能にするDOM要素。ライブラリがイベントリスナーを追加し、その位置と `z-index` を管理します。

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
