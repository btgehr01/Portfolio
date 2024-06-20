import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface SceneProps {
  width: number;
  height: number;
}

const Scene: React.FC<SceneProps> = ({ width, height }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const musicSymbol = useRef<THREE.Group | null>(null);

  useEffect(() => {
    initScene();
    loadModel();
    animate();

    return () => {
      if (renderer.current) {
        renderer.current.dispose();
      }
    };
  }, []);

  const initScene = () => {
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(width, height);
    if (sceneRef.current) {
      sceneRef.current.appendChild(renderer.current.domElement);
    }

    camera.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.current.position.z = 5;

    scene.current = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.current.add(directionalLight);
  };

  const loadModel = () => {
    const loader = new GLTFLoader();
    loader.load(
      "path_to_your_music_symbol_model.gltf",
      (gltf) => {
        musicSymbol.current = gltf.scene;
        scene.current?.add(musicSymbol.current);

        // Position and scale your model as needed
        if (musicSymbol.current) {
          musicSymbol.current.position.set(0, 0, 0);
          musicSymbol.current.scale.set(0.5, 0.5, 0.5);
        }
      },
      undefined,
      (error) => {
        console.error("Error loading 3D model", error);
      }
    );
  };

  const animate = () => {
    requestAnimationFrame(animate);

    // Update logic here (e.g., rotation based on scroll or mouse movement)
    if (musicSymbol.current) {
      // Example: Rotate based on scroll
      const rotationSpeedScroll = 0.002;
      musicSymbol.current.rotation.y = window.scrollY * rotationSpeedScroll;

      // Example: Rotate based on mouse movement
      if (camera.current && musicSymbol.current) {
        const mouseX = (width / 2 - window.innerWidth / 2) / 100;
        const mouseY = (height / 2 - window.innerHeight / 2) / 100;

        musicSymbol.current.rotation.x = mouseY;
        musicSymbol.current.rotation.y = mouseX;
      }
    }

    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }
  };

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Scene;
