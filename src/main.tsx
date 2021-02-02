import * as React from "react";
import * as ReactDOM from "react-dom";
import * as THREE from "three";

let rot = 0; // 角度
let mouseX = 0; // マウス座標

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
});

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
  [258, 236, -1.2894983291625977],
];

window.addEventListener("DOMContentLoaded", () => {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  // レンダラーのサイズを設定
  renderer.setSize(800, 600);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  const scene = new THREE.Scene();

  const axes = new THREE.AxesHelper(250);
  axes.position.set(200, 200, 500);
  scene.add(axes);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000);
  camera.position.set(200, 200, 500);

  for (let landMark of landMarks) {
    const circleGeometry = new THREE.Mesh(
      new THREE.CircleGeometry(5, 5, 5),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
      })
    );
    circleGeometry.position.set(landMark[0], landMark[1], landMark[2]);
    scene.add(circleGeometry);
  }

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    requestAnimationFrame(tick);

    const targetRot = (mouseX / window.innerWidth) * 360;
    // イージングの公式を用いて滑らかにする
    // 値 += (目標値 - 現在の値) * 減速値
    rot += (targetRot - rot) * 0.02;

    // ラジアンに変換する
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 描画
    renderer.render(scene, camera);
  };
  tick();

  console.log("Hello Three.js");
});

ReactDOM.render(<h1>spike-three-js</h1>, document.getElementById("app"));
