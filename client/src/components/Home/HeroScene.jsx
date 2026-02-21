import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";

const FloatingElements = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8;
      meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 64, 64]} scale={2.5}>
          <MeshDistortMaterial
            color="#3b82f6"
            speed={2}
            distort={0.3}
            radius={1}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </group>
  );
};

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#60a5fa" />
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>
      </Canvas>
    </div>
  );
}
