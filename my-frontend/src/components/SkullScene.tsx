'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

interface SkullProps {
  darkMode?: boolean;
}

function Skull({ darkMode = false }: SkullProps) {
  const [gltfScene, setGltfScene] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Starting to load skull model...');
    const loader = new GLTFLoader();

    loader.load(
      '/allosaurus-skull.glb',
      (gltf) => {
        console.log('Model loaded successfully!', gltf);

        // Calculate bounding box to auto-scale
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 1.8;
        const scale = targetSize / maxDim;

        console.log('Model size:', size.x, size.y, size.z, 'Scale:', scale);

        gltf.scene.scale.setScalar(scale);

        // Enable shadow casting on all meshes
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
          }
        });

        setGltfScene(gltf.scene);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100).toFixed(1) + '%');
      },
      (err) => {
        console.error('Error loading model:', err);
        setError(err.message);
      }
    );
  }, []);

  // Apply material based on dark mode
  useEffect(() => {
    if (!gltfScene) return;

    gltfScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (darkMode) {
          // Clean chrome/mirror material for dark mode
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            roughness: 0.05,
            metalness: 1.0,
            envMapIntensity: 2.0,
          });
        } else {
          // Warm fossil bone material for light mode
          child.material = new THREE.MeshStandardMaterial({
            color: '#c4b396',
            roughness: 0.8,
            metalness: 0.0,
          });
        }
      }
    });
  }, [gltfScene, darkMode]);

  if (error) {
    console.error('Skull load error:', error);
    return null;
  }

  if (!gltfScene) {
    return null;
  }

  return (
    <group position={[1.8, -0.8, 0]}>
      <Center>
        <group rotation={[-0.25, -0.45, 0]}>
          <primitive object={gltfScene} />
        </group>
      </Center>
    </group>
  );
}

interface SkullSceneProps {
  darkMode?: boolean;
}

export default function SkullScene({ darkMode = false }: SkullSceneProps) {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 35 }}
        style={{ background: 'transparent', width: '100%', height: '100%', pointerEvents: 'none' }}
        gl={{ alpha: true, antialias: true }}
        shadows
      >
        {darkMode ? (
          <>
            {/* Dark mode - space/night sky lighting */}
            <ambientLight intensity={0.05} color="#1a1a2e" />

            {/* Main starlight - cool white */}
            <directionalLight
              position={[3, 5, 8]}
              intensity={1.5}
              color="#cce0ff"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={25}
              shadow-camera-near={0.5}
              shadow-camera-left={-5}
              shadow-camera-right={5}
              shadow-camera-top={5}
              shadow-camera-bottom={-5}
              shadow-bias={-0.0001}
            />

            {/* Subtle blue fill from space */}
            <directionalLight position={[-4, 2, 3]} intensity={0.4} color="#6688cc" />

            {/* Rim light - moonlight effect */}
            <directionalLight position={[0, 3, -5]} intensity={0.6} color="#aabbff" />

            {/* Night environment for reflections */}
            <Environment preset="night" />
          </>
        ) : (
          <>
            {/* Light mode - warm parchment lighting */}
            <ambientLight intensity={0.5} color="#f5efe6" />

            <directionalLight
              position={[0, 4, 8]}
              intensity={1.2}
              color="#fffaf5"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={25}
              shadow-camera-near={0.5}
              shadow-camera-left={-5}
              shadow-camera-right={5}
              shadow-camera-top={5}
              shadow-camera-bottom={-5}
              shadow-bias={-0.0001}
            />

            <directionalLight position={[0, 8, 0]} intensity={0.6} color="#fffef8" />
            <directionalLight position={[-3, 1, 2]} intensity={0.2} color="#e8dcc8" />
          </>
        )}

        <Skull darkMode={darkMode} />

        {/* Shadow plane */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[1.8, -1.2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial
            opacity={darkMode ? 0.7 : 0.5}
            color={darkMode ? "#050510" : "#5a4a3a"}
            transparent
          />
        </mesh>
      </Canvas>
    </div>
  );
}
