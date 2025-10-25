import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, GizmoHelper, GizmoViewport, StatsGl } from '@react-three/drei';
import * as THREE from 'three';
import useEditorStore from '../store/useEditorStore.js';

function GeneratedMesh() {
  const { meshProps, material, lodEnabled } = useEditorStore();

  const geometry = useMemo(() => {
    const res = Math.max(2, meshProps.resolution);
    switch (meshProps.type) {
      case 'sphere':
        return new THREE.SphereGeometry(meshProps.size, res, res);
      case 'cylinder':
        return new THREE.CylinderGeometry(meshProps.size * 0.6, meshProps.size * 0.6, meshProps.size * 1.5, res);
      case 'torus':
        return new THREE.TorusGeometry(meshProps.size * 0.7, meshProps.size * 0.25, Math.floor(res/2), res);
      default:
        return new THREE.BoxGeometry(meshProps.size, meshProps.size, meshProps.size, res, res, res);
    }
  }, [meshProps]);

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.color),
      roughness: material.roughness,
      metalness: material.metalness,
    });
    return m;
  }, [material.color, material.roughness, material.metalness]);

  if (!lodEnabled) {
    return (
      <mesh geometry={geometry} material={mat} castShadow receiveShadow frustumCulled />
    );
  }

  return (
    <lOD>
      <mesh geometry={geometry} material={mat} castShadow receiveShadow frustumCulled onUpdate={(m)=>m.updateMatrix()} />
      <mesh geometry={new THREE.BoxGeometry(meshProps.size, meshProps.size, meshProps.size, 4, 4, 4)} material={mat} position={[0,0,0]} />
    </lOD>
  );
}

export default function Viewport3D() {
  const { gridVisible } = useEditorStore();

  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [3, 2, 4], fov: 50 }} gl={{ antialias: true }} dpr={[1, 2]}>\
        <color attach="background" args={[0.06, 0.06, 0.06]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <group position={[0, 0.5, 0]}>
          <GeneratedMesh />
        </group>
        {gridVisible && (
          <Grid args={[20, 20]} cellSize={0.5} cellThickness={0.6} sectionSize={2} sectionThickness={1.2} sectionColor={new THREE.Color('#26A69A')} fadeDistance={30} fadeStrength={1} position={[0,0,0]} infiniteGrid/>
        )}
        <Environment preset="studio" />
        <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
          <GizmoViewport axisColors={["#ff6b6b", "#6bc1ff", "#26A69A"]} labelColor="white" />
        </GizmoHelper>
        <OrbitControls makeDefault enableDamping dampingFactor={0.1} minDistance={1} maxDistance={50} />
        <StatsGl className="hidden md:block" />
      </Canvas>
    </div>
  );
}
