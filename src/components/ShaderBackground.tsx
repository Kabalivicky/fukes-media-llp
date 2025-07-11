import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { ShaderMaterial, PlaneGeometry, Mesh } from 'three';
import { motion } from 'framer-motion';

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;
  uniform vec3 u_colorC;
  
  varying vec2 vUv;
  
  // Noise function
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  // Fractal noise
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 st = vUv;
    vec2 pos = st * 3.0;
    
    // Animated noise
    float n1 = fbm(pos + u_time * 0.1);
    float n2 = fbm(pos + vec2(u_time * 0.05, -u_time * 0.03));
    float n3 = fbm(pos - u_time * 0.02);
    
    // Create flowing patterns
    float pattern = sin(n1 * 10.0 + u_time) * cos(n2 * 8.0 - u_time * 0.5);
    pattern += sin(n3 * 6.0 + u_time * 0.3) * 0.5;
    
    // Color mixing
    vec3 color = mix(u_colorA, u_colorB, smoothstep(-1.0, 1.0, pattern));
    color = mix(color, u_colorC, smoothstep(-0.5, 0.5, sin(n1 * 5.0 + u_time * 2.0)));
    
    // Add glow effect
    float glow = smoothstep(0.0, 1.0, abs(pattern));
    color += glow * 0.2;
    
    gl_FragColor = vec4(color, 0.8);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ShaderPlane = () => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: [viewport.width, viewport.height] },
    u_colorA: { value: [0.0, 0.34, 0.72] }, // Fuke's Blue
    u_colorB: { value: [0.84, 0.0, 0.2] },  // Fuke's Red
    u_colorC: { value: [0.0, 0.58, 0.22] }  // Fuke's Green
  }), [viewport]);

  const shaderMaterial = useMemo(() => 
    new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    }), [uniforms]
  );

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
    </mesh>
  );
};

const ShaderBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ShaderPlane />
      </Canvas>
    </motion.div>
  );
};

export default ShaderBackground;