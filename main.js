import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshStandardMaterial({
//     color: 0x00ff83
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const loader = new GLTFLoader();
let model = null;
loader.load(
    "./tennis_ball.glb",
    function (gltf) {
        model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.rotation.x = 10;
        scene.add(model);
    }
);

const pLight = new THREE.PointLight(0xffffff, 300, 100);
pLight.position.set(0, 10, 10);
scene.add(pLight);
const aLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(aLight);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);
camera.position.z = 20;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

renderer.render(scene, camera);

window.addEventListener("resize", () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight); 
});

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};
animate();

let mouseDown = false;
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
window.addEventListener("mousemove", (e) => {
    if(mouseDown){

    }
});