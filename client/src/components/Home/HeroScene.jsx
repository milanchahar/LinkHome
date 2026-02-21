import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.4}>
              <MeshDistortMaterial color="#3B82F6" distort={0.4} speed={1.5} />
            </Sphere>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
