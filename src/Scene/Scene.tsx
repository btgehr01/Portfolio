import React, { useEffect, useRef, MutableRefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelSrc from "../../public/Static/headphones1.gltf";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();

    const loadModel = (
      path: string,
      position: { x: number; y: number; z: number },
      modelRef: MutableRefObject<THREE.Object3D | null>
    ) => {
      loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        scene.add(model);
        modelRef.current = model;
      });
    };

    loadModel(modelSrc, { x: 0, y: 0, z: 0 }, modelRef);

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    const resizeHandler = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default ThreeScene;
