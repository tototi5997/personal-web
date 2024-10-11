import { AmbientLight, AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Land } from "./land";

export class MainScene {
  private containerWidth: number;
  private containerHeight: number;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private mixer: AnimationMixer | undefined;

  constructor(parentDom: HTMLElement) {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    const container = document.createElement("div");
    container.style.width = `${this.containerWidth}px`;
    container.style.height = `${this.containerHeight}px`;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.renderer = new WebGLRenderer({ antialias: true });

    this.camera.position.set(0, 25, 50);

    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.shadowMap.enabled = true; // 开启阴影

    const light = new AmbientLight(0xffffff, 1);

    const grassLand = new Land();
    const landMesh = grassLand.getLand();

    const loader = new GLTFLoader();
    loader.load(
      "/src/gltf-modals/wolf/Wolf-Blender-2.82a.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(10, 10, 10);
        model.position.set(0, 0, 0);
        this.scene.add(model);

        this.mixer = new AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          this.mixer?.clipAction(clip).play();
        });
      },
      undefined,
      (err) => {
        console.log(err);
      }
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = 1.5;
    this.controls.minPolarAngle = 1;
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;

    this.scene.add(light);
    this.scene.add(landMesh!);

    container.appendChild(this.renderer.domElement);
    parentDom.append(container);
    window.addEventListener("resize", () => this.handleWindowResize());

    this.render();
  }

  private render() {
    window.requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);

    this.mixer && this.mixer.update(0.01);
  }

  private handleWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
