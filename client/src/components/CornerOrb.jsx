import { useRef, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, ChromaticAberration, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false } }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? null : this.props.children }
}

function LetterA() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.elapsedTime * 0.4
  })
  return (
    <group ref={groupRef} rotation={[0.5, -0.4, -0.3]}>
      <Suspense fallback={null}>
        <Center>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={3.17}
            height={0.45}
            curveSegments={16}
            bevelEnabled
            bevelThickness={0.08}
            bevelSize={0.04}
            bevelSegments={10}
          >
            A
            <MeshTransmissionMaterial
              backside
              samples={16}
              resolution={512}
              transmission={0.95}
              thickness={4}
              roughness={0}
              ior={1.8}
              chromaticAberration={0.1}
              color="#ffffff"
              envMapIntensity={1}
              iridescence={1}
              iridescenceIOR={1.3}
              iridescenceThicknessRange={[0, 700]}
            />
          </Text3D>
        </Center>
      </Suspense>
    </group>
  )
}

export default function CornerOrb({ position = 'top-right', size = 820, variant = 'home' }) {
  const presets = {
    home: {
      'top-right':    { top: '-32%',   right: '-18%' },
      'bottom-left':  { bottom: '-32%', left: '-18%' },
      'top-left':     { top: '-32%',   left: '-18%'  },
      'bottom-right': { bottom: '-32%', right: '-18%' },
    },
    projects: {
      'top-right':    { top: '-48%',   right: '-10%' },
      'top-left':     { top: '6%',     left: '-10%'  },
      'bottom-left':  { bottom: '-16%', left: '-10%' },
      'bottom-right': { bottom: '-16%', right: '-10%' },
    },
  }

  const styles = presets[variant] ?? presets.home

  return (
    <div
      className="absolute pointer-events-none z-0 select-none"
      style={{ ...styles[position], width: size, height: size }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        {/* Front key light — bright bevel glints */}
        <directionalLight position={[4, 10, 5]} intensity={4} color="#ffffff" />

        {/* Coloured back lights — glass refracts these, creating visible colour through it */}
        <pointLight position={[0,  2, -6]} intensity={12} color="#0044ff" distance={18} />
        <pointLight position={[3, -2, -6]} intensity={10} color="#aa00ff" distance={18} />
        <pointLight position={[-3, 3, -6]} intensity={8}  color="#00ccff" distance={18} />

        <ambientLight intensity={0.02} />

        <Environment preset="city" />
        <LetterA />

        <ErrorBoundary>
          <EffectComposer multisampling={0}>
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new Vector2(0.006, 0.006)}
            />
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
              blendFunction={BlendFunction.SCREEN}
            />
          </EffectComposer>
        </ErrorBoundary>
      </Canvas>
    </div>
  )
}
