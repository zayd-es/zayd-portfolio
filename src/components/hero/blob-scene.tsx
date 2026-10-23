"use client";

import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, type ComponentRef } from "react";
import { MathUtils, type Mesh } from "three";

function LiquidBlob() {
  const mesh = useRef<Mesh>(null);
  const material = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  // Normalised pointer (-1..1) tracked on the whole window, plus a decaying speed.
  const pointer = useRef({ x: 0, y: 0, speed: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      const p = pointer.current;
      p.speed = Math.min(1, p.speed + Math.hypot(x - p.x, y - p.y) * 2);
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
    const k = 1 - Math.exp(-delta * 3);

    m.rotation.x = MathUtils.lerp(m.rotation.x, -p.y * 0.5, k);
    m.rotation.y = MathUtils.lerp(m.rotation.y, p.x * 0.7 + state.clock.elapsedTime * 0.08, k);
    m.position.x = MathUtils.lerp(m.position.x, p.x * 0.18, k);
    m.position.y = MathUtils.lerp(m.position.y, p.y * 0.18, k);

    // Fast pointer movement makes the surface wobble harder, then it settles.
    material.current.distort = MathUtils.lerp(material.current.distort, 0.32 + p.speed * 0.28, k);
    p.speed = MathUtils.lerp(p.speed, 0, 1 - Math.exp(-delta * 1.5));
  });

  return (
    <mesh ref={mesh} scale={1.18}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        ref={material}
        color="#f2d7b6"
        metalness={1}
        roughness={0.18}
        distort={0.32}
        speed={1.4}
      />
    </mesh>
  );
}

/** Warm studio lighting baked into an env map: no HDR download needed. */
function EmberStudio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#1a0f0b"]} />
      <Lightformer form="rect" intensity={6} color="#ff5a1f" position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[10, 6, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#f2d7b6" position={[5, 1, 0]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} />
      <Lightformer form="rect" intensity={3} color="#ff8a4c" position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
      <Lightformer form="rect" intensity={1.5} color="#b8341a" position={[0, -5, 1]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
      <Lightformer form="circle" intensity={8} color="#fff4e6" position={[2, 2, 5]} scale={1.2} />
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
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
    >
      <LiquidBlob />
      <EmberStudio />
    </Canvas>
  );
}
