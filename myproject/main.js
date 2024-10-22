import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30)
renderer.render(scene, camera);

const gm = new THREE.TorusGeometry(10,3,16,100)
const mt = new THREE.MeshStandardMaterial({ color: 0xFF6347});
scene.add(torus)
const pl = new THREE.PointLight(0xffffff)
pl.position.set(5,5,5)
const al = new THREE.PointLight(0xffffff)
scene.add(pl, al)
const lh = new THREE.PointLightHelper(pl)
const gridhelper = new THREE.gridhelper(200, 50);
scene.add(lh. gridhelper)
const control = new OrbitControls(camera, renderer.domElement);

function addstar(){
  const geometry = new THREE.SphereGeometry(0, 25, 24, 24 );
  const materal = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, materal);
  const[ x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addstar)
const st = new THREE.TextureLoader().load('space.jpg');
scene.background = st;

const jeffTexture = new THREE.TextureLoader().load('k_3.jpg');

const kk = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(kk);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

kk.position.z = -5;
kk.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  kk.rotation.y += 0.01;
  kk.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

function Animate(){
  requestAnimationFrame(Animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  control.update();
  renderer.render(scene, camera);
}

Animate()