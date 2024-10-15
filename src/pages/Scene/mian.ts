import { AmbientLight, AnimationMixer, Group, PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { Land } from "./land";
// import { DirectionController } from "./direction";

export class MainScene {
  private containerWidth: number;
  private containerHeight: number;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private mixer: AnimationMixer | undefined;
  // private directionController: DirectionController;
  private planetModel: Group | undefined;
  private targetCameraPosition: Vector3 | undefined;

  constructor(parentDom: HTMLElement, onModelReady?: () => void) {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    const container = document.createElement("div");
    container.style.width = `${this.containerWidth}px`;
    container.style.height = `${this.containerHeight}px`;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.renderer = new WebGLRenderer({ antialias: true });
    // this.directionController = new DirectionController();

    this.camera.position.set(0, -3, 24);

    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.shadowMap.enabled = true; // 开启阴影

    const light = new AmbientLight(0xffffff, 1);
    const fireLight = new PointLight(0xffa500, 50, 15);

    fireLight.position.set(0, -4, 4);

    const loader = new GLTFLoader();
    loader.load(
      "/src/gltf-modals/model.64b31a81.glb",
      (gltf) => {
        this.planetModel = gltf.scene;
        this.planetModel.scale.set(4, 4, 4);
        this.planetModel.position.set(0, -4, 0);
        this.scene.add(this.planetModel);

        onModelReady?.();

        this.mixer = new AnimationMixer(this.planetModel);
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
    // this.controls.enableZoom = false;
    this.controls.maxPolarAngle = 2;
    this.controls.minPolarAngle = 0.5;
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    // this.controls.addEventListener("change", () => {
    //   console.log(this.camera.position);
    // });

    this.scene.add(light);
    this.scene.add(fireLight);
    // this.scene.add(landMesh!);

    container.appendChild(this.renderer.domElement);
    parentDom.append(container);
    window.addEventListener("resize", () => this.handleWindowResize());

    this.render();
  }

  private render() {
    window.requestAnimationFrame(() => this.render());

    this.mixer && this.mixer.update(0.01);
    this.scene.rotation.y -= 0.001;

    if (this.targetCameraPosition) {
      this.camera.position.lerp(this.targetCameraPosition, 0.05);
      this.controls.update();

      if (this.camera.position.distanceTo(this.targetCameraPosition) < 0.1) {
        this.targetCameraPosition = undefined;
      }
    }

    // console.log(this.camera.position);

    this.renderer.render(this.scene, this.camera);
  }

  private handleWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  moveCameraCloser() {
    if (this.planetModel) {
      // const targetPosition = new Vector3(-3, 0.8, 8.6);
      const targetPosition = new Vector3(this.camera.position.x, this.camera.position.y, 14);
      this.targetCameraPosition = targetPosition;
    }
  }

  moveCameraFar() {
    if (this.planetModel) {
      const targetPosition = new Vector3(this.camera.position.x, this.camera.position.y, 24);
      this.targetCameraPosition = targetPosition;
    }
  }
}
