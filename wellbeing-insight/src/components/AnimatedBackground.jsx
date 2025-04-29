import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import styled from 'styled-components';

// Styled container for the 3D background
const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.8;
`;

// Dynamic particle system for the background
function ParticleSystem() {
  const count = 2000;
  const mesh = useRef();
  
  // Generate randomized particle positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, []);

  // Calculate vertex positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
    }
    
    return positions;
  }, [particles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const { factor, speed, x, y, z } = particles[i];
      
      // Update positions with wave-like motion
      const curX = positions[i3];
      const curY = positions[i3 + 1];
      const curZ = positions[i3 + 2];

      positions[i3] = x + Math.sin(time * speed) * factor;
      positions[i3 + 1] = y + Math.cos(time * speed) * factor;
      positions[i3 + 2] = z + Math.cos(time * speed) * factor;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the entire particle system
    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, time * 0.05, 0.1);
    mesh.current.rotation.y = MathUtils.lerp(mesh.current.rotation.y, time * 0.05, 0.1);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={2} color="#8a2be2" sizeAttenuation={true} />
    </points>
  );
}

// Slowly rotating 3D shapes for additional visual interest
function FloatingShapes() {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate the first shape
    mesh1.current.rotation.x = Math.sin(t / 4);
    mesh1.current.rotation.y = Math.sin(t / 2);
    mesh1.current.position.y = Math.sin(t / 1.5) * 2;
    
    // Animate the second shape
    mesh2.current.rotation.x = Math.sin(t / 3) * 2;
    mesh2.current.rotation.y = Math.sin(t / 2) * 2;
    mesh2.current.position.x = Math.sin(t / 1.5) * 3;
    
    // Animate the third shape
    mesh3.current.rotation.x = Math.sin(t / 3);
    mesh3.current.rotation.z = Math.sin(t / 2);
    mesh3.current.position.z = Math.sin(t / 1.5) * 2;
  });

  return (
    <group>
      <mesh ref={mesh1} position={[0, 0, -5]}>
        <octahedronGeometry args={[3]} />
        <meshStandardMaterial color="#4F46E5" wireframe opacity={0.2} transparent />
      </mesh>
      
      <mesh ref={mesh2} position={[-8, -2, -10]}>
        <dodecahedronGeometry args={[3]} />
        <meshStandardMaterial color="#10B981" wireframe opacity={0.2} transparent />
      </mesh>
      
      <mesh ref={mesh3} position={[8, 4, -6]}>
        <icosahedronGeometry args={[3]} />
        <meshStandardMaterial color="#F59E0B" wireframe opacity={0.2} transparent />
      </mesh>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <BackgroundContainer>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <ParticleSystem />
        <FloatingShapes />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </BackgroundContainer>
  );
}