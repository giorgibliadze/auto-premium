'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/car.glb';
useGLTF.preload(MODEL_PATH);

// ── Premium material presets ──────────────────────────────────────────────────
const DARK_PAINT = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#0e0e10'),
  metalness: 0.9,
  roughness: 0.14,
  clearcoat: 1.0,
  clearcoatRoughness: 0.08,
  reflectivity: 1.0,
  envMapIntensity: 2.5,
});
const CHROME = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#c8c8c8'),
  metalness: 1.0,
  roughness: 0.04,
  envMapIntensity: 3.5,
});
const RUBBER = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0e0e0e'),
  metalness: 0.0,
  roughness: 0.92,
});
const GLASS = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#9bbde0'),
  metalness: 0.05,
  roughness: 0.04,
  transmission: 0.88,
  transparent: true,
  opacity: 0.42,
  envMapIntensity: 2.0,
});

function applyMaterials(scene: THREE.Object3D) {
  scene.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    const name = node.name.toLowerCase();
    if (name.includes('shadow')) { node.visible = false; return; }
    if (name === 'body')                    node.material = DARK_PAINT;
    else if (name.startsWith('rim'))        node.material = CHROME;
    else if (name.startsWith('wheel'))      node.material = RUBBER;
    else if (name === 'glass')              { node.material = GLASS; node.renderOrder = 2; }
    else if (name === 'details' || name === 'steeringwheel') node.material = CHROME;
    node.castShadow = true;
    node.receiveShadow = true;
  });
}

// ── Car mesh ──────────────────────────────────────────────────────────────────
function CarMesh({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    applyMaterials(scene);
    onReady();
  }, [scene, onReady]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[1.05, 1.05, 1.05]}
      position={[0, -0.48, 0]}
      rotation={[0, Math.PI * 0.82, 0]}
    />
  );
}

// ── Cinematic lights ──────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <spotLight position={[-6, 8, 5]}  angle={0.26} penumbra={0.9} intensity={120} color="#ffd48a" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.0005} />
      <spotLight position={[7, 4, -5]}  angle={0.32} penumbra={1.0} intensity={80}  color="#ff3600" />
      <directionalLight position={[5, 3, 6]} intensity={2.0} color="#c8d8ff" />
      <pointLight position={[0, -1.5, 2]} intensity={8} color="#c9a84c" />
      <ambientLight intensity={0.06} />
    </>
  );
}

// Makes the canvas background fully transparent (runs inside Canvas context)
function TransparentBackground() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

// ── Exported component ────────────────────────────────────────────────────────
interface CarModelProps { className?: string }

export default function CarModel({ className = '' }: CarModelProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`w-full h-full relative ${className}`}
      style={{ background: 'transparent' }}
    >
      {/* Loading shimmer rendered OUTSIDE Canvas — avoids drei Html/broken-img issue */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-[1px] bg-white/10 overflow-hidden relative rounded-full">
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"
                style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
              />
            </div>
            <span className="text-[9px] tracking-[0.22em] uppercase text-white/20">Loading</span>
          </div>
        </div>
      )}

      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [3.2, 1.6, 5.0], fov: 46, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: 'transparent', opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        {/* Ensures the WebGL clear color is fully transparent */}
        <TransparentBackground />
        <Lights />

        <Suspense fallback={null}>
          <CarMesh onReady={() => setReady(true)} />
          <ContactShadows
            position={[0, -0.52, 0]}
            opacity={0.55}
            scale={8}
            blur={2.5}
            far={4}
            color="#000000"
          />
          <Environment preset="city" environmentIntensity={0.6} />
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0.1, 0]}
        />
      </Canvas>
    </div>
  );
}
