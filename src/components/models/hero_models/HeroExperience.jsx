import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense, useRef, useEffect } from "react";

const InteractiveRoom = ({ isMobile, canvasRef }) => {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const active = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      if (!active.current) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const handleMouseEnter = () => {
      active.current = true;
    };
    const handleMouseLeave = () => {
      active.current = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasRef]);

  useFrame(() => {
    if (groupRef.current && active.current) {
      groupRef.current.rotation.y +=
        ((mouse.current.x * Math.PI) / 6 - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x +=
        ((-mouse.current.y * Math.PI) / 12 - groupRef.current.rotation.x) *
        0.08;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.7 : 1}
      position={[0, -3.5, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <Room />
    </group>
  );
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const canvasRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }} ref={canvasRef}>
      <ambientLight intensity={0.2} color="#1a1a40" />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableRotate={false}
      />
      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <InteractiveRoom isMobile={isMobile} canvasRef={canvasRef} />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
