import * as React from "react";
import * as ReactDOM from "react-dom";
import * as THREE from "three";
import { ThreeComponent } from "./three";

ReactDOM.render(
  <div>
    <h1>spike-three-js</h1>
    <ThreeComponent />
  </div>,
  document.getElementById("app")
);
