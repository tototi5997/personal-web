import { AmbientLight, Group, PerspectiveCamera, Scene, SpotLight, WebGLRenderer } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Planet } from "./planet";

export class MainScene {
  private containerWidth: number;
  private containerHeight: number;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private earthGroup: Group;
  // private controls: OrbitControls;

  constructor(parentDom: HTMLElement) {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    const container = document.createElement("div");
    container.style.width = `${this.containerWidth}px`;
    container.style.height = `${this.containerHeight}px`;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.earthGroup = new Group();

    this.camera.position.z = 40;
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.shadowMap.enabled = true; // 开启阴影
    // this.renderer.autoClear = false; // 每次渲染前不自动清除画布

    const light = new AmbientLight(0xffffff, 0.25);
    const spotLight = new SpotLight(0x404040, 2.5);

    const earth = new Planet();
    const earthMesh = earth.getEarth();
    const earthGlow = earth.getEarthGrow();
    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;
    spotLight.target = earthMesh;

    // const loader = new GLTFLoader();
    // loader.load(
    //   "/src/gltf-modals/wolf/Wolf-Blender-2.82a.gltf",
    //   (gltf) => {
    //     const model = gltf.scene;
    //     // model.scale.set(0.01, 0.01, 0.01);
    //     // model.position.set(0, 0, 0);
    //     this.scene.add(model);
    //     spotLight.target = model;
    //   },
    //   undefined,
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    // 事件
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableZoom = false;
    // this.controls.maxPolarAngle = 1.5;
    // this.controls.minPolarAngle = 1;
    // this.controls.enablePan = false;
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.05;
    // this.controls.rotateSpeed = 0.5;

    this.earthGroup.add(earthMesh);
    this.scene.add(spotLight);
    this.scene.add(light);
    this.scene.add(this.earthGroup);
    this.scene.add(earthGlow);

    container.appendChild(this.renderer.domElement);
    parentDom.append(container);
    window.addEventListener("resize", () => this.handleWindowResize());

    this.render();
  }

  private render() {
    window.requestAnimationFrame(() => this.render());
    this.earthGroup.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
  }

  private handleWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
