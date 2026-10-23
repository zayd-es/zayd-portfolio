"use client";

import { Environment, Lightformer, MeshDistortMaterial, PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type ComponentRef } from "react";
import { MathUtils, type Mesh } from "three";

const BASE_DISTORT = 0.32;

function LiquidChrome() {
  const mesh = useRef<Mesh>(null);
  const material = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  // Normalised pointer (-1..1) tracked on the whole window, plus a decaying speed.
  const pointer = useRef({ x: 0, y: 0, speed: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      const p = pointer.current;
      p.speed = Math.min(1, p.speed + Math.hypot(x - p.x, y - p.y));
      p.x = x;
      p.y = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const m = mesh.current;
    const p = pointer.current;
    if (!m || !material.current) return;
    // Low stiffness: the surface drifts after the pointer instead of snapping.
    const k = 1 - Math.exp(-delta * 1.2);
    const t = state.clock.elapsedTime;

    m.rotation.x = MathUtils.lerp(m.rotation.x, -p.y * 0.25 + Math.sin(t * 0.15) * 0.08, k);
    m.rotation.y = MathUtils.lerp(m.rotation.y, p.x * 0.35 + t * 0.04, k);
    m.position.x = MathUtils.lerp(m.position.x, p.x * 0.08, k);
    m.position.y = MathUtils.lerp(m.position.y, p.y * 0.08 + Math.sin(t * 0.4) * 0.03, k);

    material.current.distort = MathUtils.lerp(material.current.distort, BASE_DISTORT + p.speed * 0.1, k);
    p.speed = MathUtils.lerp(p.speed, 0, 1 - Math.exp(-delta));
  });

  return (
    <mesh ref={mesh} scale={1.2}>
      <icosahedronGeometry args={[1, 40]} />
      <MeshDistortMaterial
        ref={material}
        color="#e9d8b4"
        metalness={1}
        roughness={0.26}
        distort={BASE_DISTORT}
        speed={0.7}
      />
    </mesh>
  );
}

/**
 * Soft studio baked into an env map (no HDR download). A large panel behind the
 * camera keeps the centre of the sphere bright, and angled panels avoid the
 * symmetric cross that made a dark centre read as an eye. Panels aim at the
 * origin (Lightformer's default target).
 */
function ChampagneStudio() {
  return (
    <Environment resolution={512} frames={1}>
      <color attach="background" args={["#7d6a4b"]} />
      <Lightformer form="rect" intensity={1.5} color="#e8d6b0" position={[0, 0, 9]} scale={[24, 16, 1]} />
      <Lightformer form="rect" intensity={3} color="#fbf3e2" position={[-3, 7, 3]} scale={[16, 6, 1]} />
      <Lightformer form="rect" intensity={2.2} color="#d4b475" position={[-8, -1, 1]} scale={[6, 16, 1]} />
      <Lightformer form="rect" intensity={1.6} color="#fff8ea" position={[7, 2, -2]} scale={[5, 14, 1]} />
      <Lightformer form="rect" intensity={0.6} color="#5e4826" position={[2, -7, 2]} scale={[18, 6, 1]} />
    </Environment>
  );
}

export default function BlobScene({
  active,
  onReady,
}: {
  active: boolean;
  onReady: () => void;
}) {
  // Start sharp, then trade resolution for frame rate on slower GPUs.
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      aria-hidden
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} flipflops={3} />
      <LiquidChrome />
      <ChampagneStudio />
    </Canvas>
  );
}
