import * as React from "react";
import * as ReactDOM from "react-dom";
import * as THREE from "three";
import { ThreeComponent } from "./three";

let rot = 0; // 角度
let mouseX = 0; // マウス座標

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
  const targetRot = (mouseX / window.innerWidth) * 360;
  // イージングの公式を用いて滑らかにする
  // 値 += (目標値 - 現在の値) * 減速値
  rot += (targetRot - rot) * 0.02;
});

ReactDOM.render(
  <div>
    <h1>spike-three-js</h1>
    <ThreeComponent mouseX={mouseX} rot={rot} />
  </div>,
  document.getElementById("app")
);
