import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface ThreeAudioVisualizerProps {
  isPlaying: boolean;
  audioData?: number[];
}

class SampleLine {
  scene: THREE.Scene;
  data: number[];
  delta: number;
  mesh: THREE.Line;
  dimension: number;

  constructor(scene: THREE.Scene, data: number[], dimension: number = 128) {
    this.scene = scene;
    this.data = data;
    this.delta = 1;
    this.dimension = dimension;
  }

  init() {
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      transparent: true,
    });
    
    const points: THREE.Vector3[] = [];
    const offset = (2 * Math.PI) / this.dimension;
    
    for (let i = 0; i < 2 * Math.PI; i += offset) {
      const r = 1;
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);
      
      if (i === 2 * Math.PI) {
        points.push(new THREE.Vector3(x, y, this.data[0] / 2 || 0));
      } else {
        points.push(new THREE.Vector3(x, y, this.data[points.length] / 2 || 0));
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.mesh = new THREE.Line(geometry, material);
    this.scene.add(this.mesh);
  }

  destroy() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      (this.mesh.material as THREE.Material).dispose();
      this.scene.remove(this.mesh);
    }
  }

  animatemesh(h: number) {
    if (this.mesh) {
      this.mesh.scale.set(this.delta, this.delta, 1);
      (this.mesh.material as THREE.LineBasicMaterial).opacity = 1 - this.delta / 7;
      (this.mesh.material as THREE.LineBasicMaterial).color = new THREE.Color(
        `hsl(${h}, 100%, ${Math.floor(100 - this.delta * 10)}%)`
      );
      this.delta += 0.09;
    }
  }
}

const ThreeAudioVisualizer: React.FC<ThreeAudioVisualizerProps> = ({ 
  isPlaying, 
  audioData 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const composerRef = useRef<EffectComposer>();
  const bloomPassRef = useRef<UnrealBloomPass>();
  const sampleObjRef = useRef<SampleLine[]>([]);
  const animationIdRef = useRef<number>();
  const hRef = useRef<number>(0);

  const options = {
    exposure: 2.8,
    bloomStrength: 4,
    bloomThreshold: 0,
    bloomRadius: 0.1,
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.set(0, -4.3, 2.4);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Post-processing setup
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = options.bloomThreshold;
    bloomPass.strength = options.bloomStrength;
    bloomPass.radius = options.bloomRadius;
    bloomPassRef.current = bloomPass;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    container.appendChild(renderer.domElement);

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      // Cleanup
      sampleObjRef.current.forEach(obj => obj.destroy());
      sampleObjRef.current = [];
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      return;
    }

    let lastTime = 0;
    const fpsInterval = 1000 / 60; // 60 FPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= fpsInterval) {
        lastTime = currentTime;

        // Generate mock audio data if none provided
        const mockAudioData = audioData || Array.from({ length: 128 }, () => Math.random() * 0.5);

        // Manage sample objects
        if (sampleObjRef.current.length === 40) {
          sampleObjRef.current[0].destroy();
          sampleObjRef.current = sampleObjRef.current.slice(1);
        }

        if (sceneRef.current) {
          const samp = new SampleLine(sceneRef.current, mockAudioData);
          samp.init();
          sampleObjRef.current.push(samp);
        }

        // Animate existing objects
        sampleObjRef.current.forEach((element) => {
          element.animatemesh(hRef.current);
        });

        hRef.current += 0.5;
        if (hRef.current >= 360) {
          hRef.current = 0;
        }

        // Update bloom pass
        if (bloomPassRef.current) {
          bloomPassRef.current.threshold = options.bloomThreshold;
          bloomPassRef.current.strength = options.bloomStrength;
          bloomPassRef.current.radius = options.bloomRadius;
        }

        // Render
        if (composerRef.current) {
          composerRef.current.render();
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying, audioData]);

  return (
    <div 
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'transparent',
        zIndex: 1
      }}
    />
  );
};

export default ThreeAudioVisualizer; 