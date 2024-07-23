import React, { useEffect, useRef, MutableRefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SpotifyController from "../Screens/Spotify";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const model1Ref = useRef<THREE.Object3D | null>(null);
  const model2Ref = useRef<THREE.Object3D | null>(null);

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
    camera.position.set(0, 0, 20);
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
        console.log("Model loaded:", model);
        model.position.set(position.x, position.y, position.z);
        scene.add(model);
        modelRef.current = model;
      });
    };

    loadModel("/Static/headphones1.gltf", { x: -15, y: 0, z: 0 }, model1Ref);
    loadModel("/Static/headphones1.gltf", { x: 15, y: 0, z: 0 }, model2Ref);

    const animate = () => {
      requestAnimationFrame(animate);

      if (model1Ref.current) {
        model1Ref.current.rotation.y += 0.01;
      }
      if (model2Ref.current) {
        model2Ref.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        minWidth: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 1,
        }}
      >
        <SpotifyController />
      </div>
    </div>
  );
};

export default ThreeScene;
