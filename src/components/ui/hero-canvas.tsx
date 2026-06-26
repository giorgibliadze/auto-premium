'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import type { Mesh } from 'three';
import {
  abs,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
} from 'three/tsl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

// ── Post-processing ───────────────────────────────────────────────────────────
function PostProcessing() {
  const { gl, scene, camera } = useThree();

  const render = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pp = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const sceneColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(sceneColor, 1.1, 0.5, 0.82);
    pp.outputNode = sceneColor.add(bloomPass);
    return pp;
  }, [camera, gl, scene]);

  useFrame(() => { render.renderAsync(); }, 1);

  return null;
}

// ── Procedural dot-grid + scan-line mesh ──────────────────────────────────────
function Scene() {
  const meshRef = useRef<Mesh>(null);

  const uProgress = useMemo(() => uniform(0), []);

  const material = useMemo(() => {
    // Aspect-corrected UV so dots are circular at any viewport size
    const tUv = vec2(uv().x.mul(float(16).div(9)), uv().y);

    // Tiled cell grid
    const tiling = vec2(70.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const cellBrightness = mx_cell_noise_float(tUv.mul(tiling).div(2.0));
    const dist = float(tiledUv.length());
    const dot = smoothstep(float(0.5), float(0.46), dist).mul(cellBrightness);

    // Scan band: a thin slice moves up and down the screen
    const scanBand = oneMinus(smoothstep(float(0), float(0.032), abs(uv().y.sub(uProgress))));

    // Colour: dim gold base → vivid red-orange on the scan
    const baseColor  = vec3(0.55, 0.38, 0.04);   // muted gold for resting dots
    const scanColor  = vec3(1.15, 0.18, 0.02);    // neon red-orange on the scan band
    const dotColor   = mix(baseColor, scanColor, scanBand);

    return new THREE.MeshBasicNodeMaterial({
      colorNode: dot.mul(dotColor),
      transparent: true,
      opacity: 0.92,
    });
  }, [uProgress]);

  const { viewport } = useThree();

  useFrame(({ clock }) => {
    // Scan band oscillates smoothly
    // eslint-disable-next-line react-hooks/immutability
    uProgress.value = Math.sin(clock.getElapsedTime() * 0.42) * 0.5 + 0.5;
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      material={material}
    >
      <planeGeometry />
    </mesh>
  );
}

// ── Exported canvas ────────────────────────────────────────────────────────────
export function HeroCanvas() {
  return (
    <Canvas
      flat
      style={{ width: '100%', height: '100%', background: '#050505' }}
      gl={async (props) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const renderer = new THREE.WebGPURenderer(props as any);
        await renderer.init();
        return renderer;
      }}
    >
      <PostProcessing />
      <Scene />
    </Canvas>
  );
}
