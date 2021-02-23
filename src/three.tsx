import * as React from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { MeshLambertMaterial, Mesh } from "three";
import { CameraPositionContext } from "./main";

const box = {
  h: 248,
  w: 168,
  x: 209,
  y: 88
};

const landMarks = [
  [242, 122, 63.754154205322266],
  [248, 138, 63.718040466308594],
  [229, 177, 63.750240325927734],
  [227, 185, 62.947654724121094],
  [229, 209, 60.66120910644531],
  [238, 240, 52.24430465698242],
  [244, 252, 39.801490783691406],
  [252, 268, 22.042888641357422],
  [268, 283, -4.00954532623291],
  [295, 275, -35.394351959228516],
  [321, 260, -63.07128143310547],
  [337, 252, -85.24523162841797],
  [351, 240, -103.40164184570312],
  [356, 216, -113.74767303466797],
  [360, 201, -118.92949676513672],
  [362, 185, -122.39031982421875],
  [374, 165, -124.07015991210938],
  [217, 130, 44.973907470703125],
  [234, 138, 34.082191467285156],
  [238, 138, 20.348371505737305],
  [252, 130, 7.900325298309326],
  [254, 130, -2.9036269187927246],
  [293, 138, -43.597782135009766],
  [297, 138, -54.79812240600586],
  [311, 138, -67.05826568603516],
  [327, 146, -80.79122924804688],
  [341, 150, -92.71514129638672],
  [276, 161, -21.074724197387695],
  [272, 177, -18.715259552001953],
  [264, 201, -15.093185424804688],
  [266, 209, -13.350228309631348],
  [256, 205, 0.9625438451766968],
  [262, 209, -5.01382303237915],
  [270, 212, -12.346614837646484],
  [278, 212, -21.29645347595215],
  [286, 209, -29.060134887695312],
  [232, 150, 26.97185516357422],
  [238, 146, 18.676767349243164],
  [246, 142, 8.91932487487793],
  [258, 153, 0.005757619626820087],
  [254, 153, 8.887210845947266],
  [240, 153, 19.31583023071289],
  [299, 165, -45.090816497802734],
  [307, 157, -54.50393295288086],
  [317, 157, -63.93351745605469],
  [327, 161, -71.19898986816406],
  [319, 165, -62.738670349121094],
  [307, 165, -52.74661636352539],
  [240, 212, 19.278093338012695],
  [244, 216, 8.954380989074707],
  [262, 220, -2.3620738983154297],
  [268, 220, -9.243645668029785],
  [276, 224, -16.527307510375977],
  [293, 224, -29.328092575073242],
  [307, 228, -41.26905059814453],
  [292, 240, -26.215625762939453],
  [278, 248, -16.094478607177734],
  [268, 248, -7.119112014770508],
  [258, 244, 1.4864948987960815],
  [248, 232, 9.25420093536377],
  [240, 212, 16.42109489440918],
  [260, 224, -0.9329009056091309],
  [268, 224, -9.083539962768555],
  [278, 228, -17.246496200561523],
  [307, 228, -38.4931526184082],
  [278, 240, -16.269901275634766],
  [270, 240, -8.610118865966797],
  [258, 236, -1.2894983291625977]
];

type Content = {
  bbox: {
    h: number;
    w: number;
    x: number;
    y: number;
  };
  landmarks: [number, number, number][];
};

type Props = {};

type DotProps = {
  positionX: number;
  positionY: number;
  positionZ: number;
};

type WallProps = {
  h: number;
  w: number;
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
};

let rot = 0; // 角度
let mouseX = 0; // マウス座標
let mouseY = 0; // マウス座標

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

type RigProps = {
  cameraX: number;
  cameraY: number;
  cameraZ: number;
};

function Rig(props: RigProps) {
  const { camera } = useThree();
  return useFrame(() => {
    const targetRot = (mouseX / window.innerWidth) * 360;
    rot += (targetRot - rot) * 0.02;
    const radian = (rot * Math.PI) / 180;
    camera.position.x = props.cameraX;
    camera.position.z = props.cameraZ;
    camera.position.y = props.cameraY;
  });
}

function Wall(props: WallProps) {
  const ref = React.useRef({} as Mesh);
  useFrame(() => {
    ref.current.rotation.x = props.rotationX;
    ref.current.rotation.y = props.rotationY;
  });

  return (
    <mesh ref={ref} position={[props.x, props.y, props.z]}>
      <planeGeometry attach="geometry" args={[props.h, props.w, 500]} />
      <meshLambertMaterial color="#FFFFFF" />
    </mesh>
  );
}

function Dot(props: DotProps) {
  const ref = React.useRef();

  return (
    <mesh
      ref={ref}
      position={[props.positionX, props.positionY * -1 + 350, props.positionZ]}
    >
      <circleGeometry attach="geometry" args={[5, 5, 5]} />
      <meshLambertMaterial color="#FFFFFF" />
    </mesh>
  );
}

export const ThreeComponent: React.FC<Props> = (props) => {
  const { x, y, z } = React.useContext(CameraPositionContext);
  const [jsonContent, setJsonContent] = React.useState<Content[]>([]);

  React.useEffect(() => {
    const req = new XMLHttpRequest();
    req.open("GET", "sample.json");
    req.send();
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        const json = JSON.parse(req.responseText);
        const res = json.map((c: any[]) => {
          return c[0];
        }) as Content[];
        setJsonContent(res);
      }
    };
  }, []);

  if (jsonContent.length === 0) {
    return null;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Canvas>
        <directionalLight color="#FFFFFF" intensity={1} position={[2, 1, 1]} />
        <mesh position={[200, 200, 500]}>
          <axesHelper />
        </mesh>
        <Wall
          h={box.h}
          w={box.w}
          x={box.x}
          y={box.y}
          z={100}
          rotationX={0}
          rotationY={0}
        />
        <Wall
          h={box.h}
          w={box.w}
          x={box.x + 10}
          y={box.y - 60}
          z={20}
          rotationX={5}
          rotationY={0}
        />
        <Wall
          h={box.h}
          w={box.w}
          x={box.x - 160}
          y={box.y}
          z={0}
          rotationX={0}
          rotationY={5}
        />
        {jsonContent[0].landmarks.map((landMark, idx) => {
          return (
            <Dot
              key={idx}
              positionX={landMark[0]}
              positionY={landMark[1]}
              positionZ={landMark[2]}
            />
          );
        })}
        <Rig cameraX={x} cameraY={y} cameraZ={z} />
      </Canvas>
    </div>
  );
};
