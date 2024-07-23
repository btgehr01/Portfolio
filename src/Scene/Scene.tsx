import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import SpotifyController from "../Screens/Spotify";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

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
    camera.position.z = 15;
    camera.position.y = -5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry1 = new THREE.BoxGeometry(3, 3, 3);
    const material1 = new THREE.MeshBasicMaterial({ color: "lightgreen" });
    const cube1 = new THREE.Mesh(geometry1, material1);
    cube1.position.x = -13;
    scene.add(cube1);

    const geometry2 = new THREE.BoxGeometry(3, 3, 3);
    const material2 = new THREE.MeshBasicMaterial({ color: "lightgreen" });
    const cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.x = 13;
    scene.add(cube2);

    const animate = () => {
      requestAnimationFrame(animate);
      cube1.rotation.x += 0.01;
      cube1.rotation.y += 0.01;
      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
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
