import * as React from "react";
import * as ReactDOM from "react-dom";
import * as THREE from "three";
import { ThreeComponent } from "./three";

export const CameraPositionContext = React.createContext<CameraPositions>({
  x: 0,
  y: 0,
  z: 0,
});

type CameraPositions = {
  x: number;
  y: number;
  z: number;
};

type BUttonsProps = {
  onClickXPlus10: () => void;
  onClickXMinus10: () => void;
  onClickYPlus10: () => void;
  onClickYMinus10: () => void;
  onClickZPlus10: () => void;
  onClickZMinus10: () => void;
};

function Buttons(props: BUttonsProps) {
  return (
    <div>
      <button onClick={props.onClickXPlus10}>X +10</button>
      <button onClick={props.onClickXMinus10}>X -10</button>
      <button onClick={props.onClickYPlus10}>Y +10</button>
      <button onClick={props.onClickYMinus10}>Y -10</button>
      <button onClick={props.onClickZPlus10}>Z +10</button>
      <button onClick={props.onClickZMinus10}>Z -10</button>
    </div>
  );
}

function Main() {
  const [cameraX, setCameraX] = React.useState(400);
  const [cameraY, setCameraY] = React.useState(100);
  const [cameraZ, setCameraZ] = React.useState(500);
  return (
    <CameraPositionContext.Provider
      value={{ x: cameraX, y: cameraY, z: cameraZ }}
    >
      <p>x: {cameraX}</p>
      <p>y: {cameraY}</p>
      <p>z: {cameraZ}</p>
      <Buttons
        onClickXPlus10={() => {
          setCameraX(cameraX + 10);
        }}
        onClickXMinus10={() => {
          setCameraX(cameraX - 10);
        }}
        onClickYPlus10={() => {
          setCameraY(cameraY + 10);
        }}
        onClickYMinus10={() => {
          setCameraY(cameraY - 10);
        }}
        onClickZPlus10={() => {
          setCameraZ(cameraZ + 10);
        }}
        onClickZMinus10={() => {
          setCameraZ(cameraZ - 10);
        }}
      />
      <ThreeComponent />
    </CameraPositionContext.Provider>
  );
}

function App() {
  return (
    <div>
      <h1>spike-three-js</h1>
      <Main />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
