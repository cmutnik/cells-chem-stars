import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Float, Html, OrbitControls, useProgress } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Group,
  Mesh,
  MeshStandardMaterial,
  TubeGeometry,
  Vector3,
  type MeshStandardMaterialParameters,
} from "three";
import type { CosmicObject, ViewMode } from "../data/cosmicObjects";

type CosmicSceneProps = {
  object: CosmicObject;
  activeFeature: string;
  viewMode: ViewMode;
  crossSection: boolean;
  autoRotate: boolean;
  resetKey: number;
  activeObservation: string | null;
};

type MaterialProps = {
  id: string;
  activeFeature: string;
  viewMode: ViewMode;
  color: string;
  opacity?: number;
  roughness?: number;
  metalness?: number;
};

function AtomMaterial({
  id,
  activeFeature,
  viewMode,
  color,
  opacity = 1,
  roughness = 0.38,
  metalness = 0.12,
}: MaterialProps) {
  const active = id === activeFeature;
  const dimmed = viewMode === "focus" && !active;
  const material: MeshStandardMaterialParameters = {
    color,
    roughness,
    metalness,
    transparent: opacity < 1 || dimmed,
    opacity: dimmed ? Math.min(opacity, 0.14) : opacity,
    emissive: active ? color : "#000000",
    emissiveIntensity: active ? 0.42 : 0,
  };

  return <meshStandardMaterial {...material} />;
}

type CommonModelProps = {
  activeFeature: string;
  viewMode: ViewMode;
  crossSection: boolean;
  activeObservation?: string | null;
};

type AtomProps = CommonModelProps & {
  id: string;
  position: [number, number, number];
  radius: number;
  color: string;
  opacity?: number;
};

function Atom({ id, position, radius, color, opacity = 1, activeFeature, viewMode }: AtomProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 36, 36]} />
      <AtomMaterial id={id} activeFeature={activeFeature} viewMode={viewMode} color={color} opacity={opacity} />
    </mesh>
  );
}

type BondProps = CommonModelProps & {
  id: string;
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color: string;
};

function Bond({ id, from, to, radius = 0.055, color, activeFeature, viewMode }: BondProps) {
  const geometry = useMemo(() => {
    const mid: [number, number, number] = [
      (from[0] + to[0]) / 2,
      (from[1] + to[1]) / 2,
      (from[2] + to[2]) / 2,
    ];
    const curve = new CatmullRomCurve3([from, mid, to].map(([x, y, z]) => new Vector3(x, y, z)));
    return new TubeGeometry(curve, 24, radius, 10, false);
  }, [from, to, radius]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <AtomMaterial id={id} activeFeature={activeFeature} viewMode={viewMode} color={color} roughness={0.44} />
    </mesh>
  );
}

// ── Cosmic object 3D models ───────────────────────────────────────────────────

// Electromagnetic Wave — sinusoidal E and B field tubes, propagation arrow, photon sphere
function EMWaveModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const nPoints = 40;
  const xRange = 3.0;
  const amplitude = 0.9;

  const eFieldGeometry = useMemo(() => {
    const points: Vector3[] = [];
    for (let i = 0; i <= nPoints; i++) {
      const t = i / nPoints;
      const x = (t - 0.5) * xRange * 2;
      const y = amplitude * Math.sin(t * Math.PI * 2.5);
      points.push(new Vector3(x, y, 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(points), 64, 0.06, 10, false);
  }, []);

  const bFieldGeometry = useMemo(() => {
    const points: Vector3[] = [];
    for (let i = 0; i <= nPoints; i++) {
      const t = i / nPoints;
      const x = (t - 0.5) * xRange * 2;
      const z = amplitude * Math.sin(t * Math.PI * 2.5);
      points.push(new Vector3(x, 0, z));
    }
    return new TubeGeometry(new CatmullRomCurve3(points), 64, 0.06, 10, false);
  }, []);

  return (
    <group scale={[0.95, 0.95, 0.95]}>
      {/* Propagation axis */}
      <Bond id="eField" from={[-3.1, 0, 0]} to={[3.1, 0, 0]} radius={0.018} color="#c8c8ff" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      {/* E-field sinusoidal wave (violet, Y-axis oscillation) */}
      <mesh geometry={eFieldGeometry} castShadow>
        <AtomMaterial id="eField" activeFeature={activeFeature} viewMode={viewMode} color="#7c4dff" opacity={crossSection ? 0.55 : 0.88} roughness={0.28} metalness={0.18} />
      </mesh>
      {/* B-field sinusoidal wave (teal, Z-axis oscillation) */}
      <mesh geometry={bFieldGeometry} castShadow>
        <AtomMaterial id="bField" activeFeature={activeFeature} viewMode={viewMode} color="#00897b" opacity={crossSection ? 0.55 : 0.88} roughness={0.28} metalness={0.18} />
      </mesh>
      {/* Photon sphere at E-field wave crest */}
      <Atom id="photonPacket" position={[0, amplitude, 0]} radius={0.24} color="#ffd740" opacity={0.92} activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      {/* Arrow tip marking propagation direction */}
      <Atom id="eField" position={[3.25, 0, 0]} radius={0.13} color="#c8c8ff" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
    </group>
  );
}

// Proton — central nucleon + 3 quark spheres + gluon flux tubes + charge cloud
function ProtonModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const quarkPositions: [number, number, number][] = [
    [0, 0.72, 0],
    [-0.62, -0.36, 0],
    [0.62, -0.36, 0],
  ];
  const quarkColors = ["#e53935", "#e53935", "#1565c0"];

  return (
    <group scale={[1.1, 1.1, 1.1]}>
      {/* Charge cloud (outermost) */}
      <mesh>
        <sphereGeometry args={[1.58, 32, 32]} />
        <AtomMaterial id="charge" activeFeature={activeFeature} viewMode={viewMode} color="#ffd740" opacity={crossSection ? 0.04 : 0.08} />
      </mesh>
      {/* Nucleon body */}
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <AtomMaterial id="charge" activeFeature={activeFeature} viewMode={viewMode} color="#b71c1c" opacity={crossSection ? 0.28 : 0.38} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Gluon flux tube bonds between quarks */}
      {quarkPositions.map((pos, i) => {
        const next = quarkPositions[(i + 1) % 3];
        return (
          <Bond key={`g-${i}`} id="gluon" from={pos} to={next} radius={0.052} color="#ff8f00" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
        );
      })}
      {/* Three quarks */}
      {quarkPositions.map((pos, i) => (
        <Atom key={`q-${i}`} id="quark" position={pos} radius={0.35} color={quarkColors[i]} activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      ))}
    </group>
  );
}

// Main-Sequence Star — layered spheres for zones + corona tori + granule patches
function MainStarModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  return (
    <group scale={[0.82, 0.82, 0.82]}>
      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[2.8, 24, 24]} />
        <AtomMaterial id="corona" activeFeature={activeFeature} viewMode={viewMode} color="#ffe082" opacity={0.04} />
      </mesh>
      {/* Corona wispy torus rings at varied inclinations */}
      {([0, 0.6, 1.1, 1.7] as number[]).map((rotX, i) => (
        <mesh key={`cr-${i}`} rotation={[rotX, i * 0.8, 0]}>
          <torusGeometry args={[2.12 + i * 0.08, 0.055, 8, 80]} />
          <AtomMaterial id="corona" activeFeature={activeFeature} viewMode={viewMode} color="#ffe082" opacity={0.15} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
      {/* Convective zone / photosphere surface */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.85, 48, 48]} />
        <AtomMaterial id="convectiveZone" activeFeature={activeFeature} viewMode={viewMode} color="#ef6c00" roughness={0.6} metalness={0.08} />
      </mesh>
      {/* Surface granule patches */}
      {([
        [1.58, 0.82, 0.22], [-1.42, 1.02, 0.58], [0.38, -1.72, 0.82],
        [1.22, -0.62, 1.42], [-0.82, -1.22, 1.02], [1.58, 0.22, -1.02],
      ] as [number, number, number][]).map((pos, i) => (
        <Atom key={`gr-${i}`} id="convectiveZone" position={pos} radius={0.22} color="#ff8f00" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      ))}
      {/* Radiative zone (inner, partially opaque) */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <AtomMaterial id="radiativeZone" activeFeature={activeFeature} viewMode={viewMode} color="#ff8f00" opacity={crossSection ? 0.7 : 0.3} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Fusion core */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <AtomMaterial id="coreFusion" activeFeature={activeFeature} viewMode={viewMode} color="#fff9c4" roughness={0.3} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Gravitational wave spacetime grid — two perpendicular animated wireframe planes
// showing the GW "+" polarisation deforming the spacetime fabric.
function GravitationalWaveGrid() {
  const N = 30;           // grid lines per axis
  const extent = 4.8;    // half-size in world units
  const W = N + 1;        // vertex count per axis
  const step = (extent * 2) / N;

  // Build a flat NxN grid of line-segment pairs once; Y is animated each frame.
  const geometry = useMemo(() => {
    const verts = new Float32Array(W * W * 3);
    let vi = 0;
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        verts[vi++] = -extent + i * step;
        verts[vi++] = 0;
        verts[vi++] = -extent + j * step;
      }
    }
    const idxs: number[] = [];
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j < N; j++) {
        idxs.push(i * W + j, i * W + j + 1);   // row segments (constant i)
        idxs.push(j * W + i, (j + 1) * W + i); // col segments (constant j)
      }
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(verts, 3));
    geo.setIndex(idxs);
    return geo;
  }, []);

  // Each frame: displace Y with a decaying outward sinusoid (radial GW ripple).
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = geometry.attributes.position as BufferAttribute;
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const x = -extent + i * step;
        const z = -extent + j * step;
        const r = Math.sqrt(x * x + z * z);
        // Amplitude decays as 1/(1 + r·k) to simulate 1/r spreading with a soft near-field floor.
        const y = r < 0.22 ? 0 : (0.46 / (1 + r * 0.28)) * Math.sin(r * 2.1 - t * 3.4);
        pos.setY(i * W + j, y);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      {/* Horizontal spacetime sheet (XZ world plane, wave in Y) */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#29b6f6" opacity={0.38} transparent />
      </lineSegments>
      {/* Vertical spacetime sheet (rotated to YZ world plane, same wave now in X)
          Together the two planes show the "+" polarisation cross-section */}
      <lineSegments geometry={geometry} rotation={[0, 0, Math.PI / 2]}>
        <lineBasicMaterial color="#29b6f6" opacity={0.2} transparent />
      </lineSegments>
    </group>
  );
}

// Neutron Star — dense sphere + magnetosphere loops + pulsed beam cones
// Observation modes: radio shows beams; x-ray shows hot surface; gw shows ripple rings
function NeutronStarModel({ activeFeature, viewMode, crossSection, activeObservation = null }: CommonModelProps) {
  const obs = activeObservation;
  // When an observation is active, disable focus-mode dimming so obs colours dominate
  const obsViewMode: ViewMode = obs ? "mesh" : viewMode;

  // Per-observation opacity overrides
  const glowOp   = obs === "radio-telescope" || obs === "gravitational-wave" ? 0.03 : 0.12;
  const ringOp   = (i: number) => {
    if (obs === "radio-telescope")   return 0.04;
    if (obs === "xray-imaging")      return 0.42 + i * 0.08;
    if (obs === "gravitational-wave") return 0.04;
    return 0.22 + i * 0.07;
  };
  const coreOp   = obs === "radio-telescope" ? 0.15 : 1.0;
  const coreColor = obs === "xray-imaging" ? "#ffffff" : "#e0f7fa";
  const beamOp   = obs === "xray-imaging" ? 0.22
    : obs === "gravitational-wave"   ? 0.05
    : obs === "radio-telescope"      ? 0.92
    : crossSection                   ? 0.24 : 0.48;
  const beamColor = obs === "radio-telescope" ? "#e0f7fa" : "#80deea";

  const beamRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (beamRef.current) {
      // Faster, more dramatic pulse in radio mode
      const freq = obs === "radio-telescope" ? 6.0 : 2.8;
      const amp  = obs === "radio-telescope" ? 0.18 : 0.1;
      const scale = (1 - amp) + amp * Math.abs(Math.sin(clock.elapsedTime * freq));
      beamRef.current.scale.set(1, scale, 1);
    }
  });

  return (
    <group>
      {/* Gravitational wave spacetime grid (gw observation only) */}
      {obs === "gravitational-wave" && <GravitationalWaveGrid />}

      {/* Soft glow shell */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <AtomMaterial id="neutronCore" activeFeature={activeFeature} viewMode={obsViewMode} color="#b3e5fc" opacity={glowOp} />
      </mesh>

      {/* Magnetosphere field-line loops — thicker and more distinct per ring */}
      {([0, 0.7, 1.4] as number[]).map((angle, i) => (
        <mesh key={`mf-${i}`} rotation={[angle, i * 1.2, 0]}>
          <torusGeometry args={[1.5 + i * 0.3, 0.065, 8, 72]} />
          <AtomMaterial id="magnetosphere" activeFeature={activeFeature} viewMode={obsViewMode} color="#0288d1" opacity={ringOp(i)} roughness={0.4} metalness={0.2} />
        </mesh>
      ))}

      {/* Dense neutron core */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.6, 36, 36]} />
        <AtomMaterial id="neutronCore" activeFeature={activeFeature} viewMode={obsViewMode} color={coreColor} opacity={coreOp} roughness={0.55} metalness={0.35} />
      </mesh>

      {/* X-ray polar hot spots at magnetic poles */}
      {obs === "xray-imaging" && (
        <>
          <mesh position={[0, 0.63, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#88ddff" emissiveIntensity={2.4} transparent />
          </mesh>
          <mesh position={[0, -0.63, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#88ddff" emissiveIntensity={2.4} transparent />
          </mesh>
        </>
      )}

      {/* Pulse beams — central shaft + twin cones, animated */}
      <group ref={beamRef}>
        {/* Thin axial beam shaft */}
        <mesh>
          <cylinderGeometry args={[0.038, 0.038, 7.2, 8]} />
          <AtomMaterial id="pulseBeam" activeFeature={activeFeature} viewMode={obsViewMode} color={beamColor} opacity={beamOp * 0.45} roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, 2.2, 0]} castShadow>
          <coneGeometry args={[0.24, 3.8, 16]} />
          <AtomMaterial id="pulseBeam" activeFeature={activeFeature} viewMode={obsViewMode} color={beamColor} opacity={beamOp} roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, -2.2, 0]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[0.24, 3.8, 16]} />
          <AtomMaterial id="pulseBeam" activeFeature={activeFeature} viewMode={obsViewMode} color={beamColor} opacity={beamOp} roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// Black Hole — dark sphere + photon sphere torus + rotating accretion disk + jets + lensing ring
function BlackHoleModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const diskRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (diskRef.current) {
      diskRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Outer gravitational lensing ring */}
      <mesh>
        <torusGeometry args={[3.5, 0.022, 8, 120]} />
        <AtomMaterial id="photonSphere" activeFeature={activeFeature} viewMode={viewMode} color="#eceff1" opacity={0.22} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Photon sphere */}
      <mesh>
        <torusGeometry args={[1.28, 0.04, 8, 80]} />
        <AtomMaterial id="photonSphere" activeFeature={activeFeature} viewMode={viewMode} color="#607d8b" opacity={0.58} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Rotating accretion disk */}
      <group ref={diskRef} rotation={[0.17, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.4, 0.38, 16, 80]} />
          <AtomMaterial id="accretionDisk" activeFeature={activeFeature} viewMode={viewMode} color="#b0bec5" opacity={crossSection ? 0.5 : 0.82} roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Inner hot zone */}
        <mesh>
          <torusGeometry args={[1.6, 0.18, 16, 80]} />
          <AtomMaterial id="accretionDisk" activeFeature={activeFeature} viewMode={viewMode} color="#ff8f00" opacity={crossSection ? 0.5 : 0.88} roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
      {/* Relativistic jets */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 4.5, 10]} />
        <AtomMaterial id="jet" activeFeature={activeFeature} viewMode={viewMode} color="#cfd8dc" opacity={crossSection ? 0.3 : 0.52} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, -2.8, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 4.5, 10]} />
        <AtomMaterial id="jet" activeFeature={activeFeature} viewMode={viewMode} color="#cfd8dc" opacity={crossSection ? 0.3 : 0.52} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Event horizon — near-black sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.85, 36, 36]} />
        <AtomMaterial id="eventHorizon" activeFeature={activeFeature} viewMode={viewMode} color="#1a1a2e" roughness={0.05} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Exoplanet — planet with atmospheric layers + orbit ring + host star
function ExoplanetModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  return (
    <group>
      {/* Host star (distant, smaller sphere) */}
      <group position={[-4.2, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.95, 32, 32]} />
          <AtomMaterial id="hostStar" activeFeature={activeFeature} viewMode={viewMode} color="#ffe082" opacity={0.9} roughness={0.4} metalness={0.0} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.35, 16, 16]} />
          <AtomMaterial id="hostStar" activeFeature={activeFeature} viewMode={viewMode} color="#ffb300" opacity={0.1} />
        </mesh>
      </group>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0.08, 0]}>
        <torusGeometry args={[3.2, 0.026, 8, 100]} />
        <AtomMaterial id="orbitRing" activeFeature={activeFeature} viewMode={viewMode} color="#2e7d32" opacity={0.38} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Atmosphere — three nested translucent shells */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <AtomMaterial id="atmosphere" activeFeature={activeFeature} viewMode={viewMode} color="#ffe082" opacity={crossSection ? 0.04 : 0.07} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.02, 32, 32]} />
        <AtomMaterial id="atmosphere" activeFeature={activeFeature} viewMode={viewMode} color="#aed581" opacity={crossSection ? 0.1 : 0.14} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <AtomMaterial id="atmosphere" activeFeature={activeFeature} viewMode={viewMode} color="#4fc3f7" opacity={crossSection ? 0.16 : 0.22} />
      </mesh>
      {/* Planet body */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.88, 36, 36]} />
        <AtomMaterial id="atmosphere" activeFeature={activeFeature} viewMode={viewMode} color="#43a047" roughness={0.65} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Spiral Galaxy — bulge + disk + 4 logarithmic spiral arms + dark matter halo
function GalaxyModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const spiralGeometries = useMemo(() => {
    return [0, 1, 2, 3].map((armIndex) => {
      const points: Vector3[] = [];
      for (let i = 0; i <= 22; i++) {
        const theta = 0.4 + (i / 22) * 3.8;
        const r = 1.1 * Math.exp(0.28 * theta);
        const x = r * Math.cos(theta + armIndex * Math.PI * 0.5);
        const z = r * Math.sin(theta + armIndex * Math.PI * 0.5);
        const y = (i % 3 - 1) * 0.04;
        points.push(new Vector3(x, y, z));
      }
      return new TubeGeometry(new CatmullRomCurve3(points), 40, 0.1, 8, false);
    });
  }, []);

  return (
    <group rotation={[0.22, 0, 0]} scale={[0.72, 0.72, 0.72]}>
      {/* Dark matter halo — vast transparent sphere */}
      <mesh>
        <sphereGeometry args={[5.8, 16, 16]} />
        <AtomMaterial id="darkMatterHalo" activeFeature={activeFeature} viewMode={viewMode} color="#4a148c" opacity={0.03} />
      </mesh>
      {/* Stellar disk torus */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.22, 8, 80]} />
        <AtomMaterial id="diskStars" activeFeature={activeFeature} viewMode={viewMode} color="#ce93d8" opacity={crossSection ? 0.4 : 0.62} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Spiral arms */}
      {spiralGeometries.map((geo, i) => (
        <mesh key={`arm-${i}`} geometry={geo} castShadow>
          <AtomMaterial id="spiralArms" activeFeature={activeFeature} viewMode={viewMode} color="#e3f2fd" opacity={crossSection ? 0.5 : 0.72} roughness={0.4} metalness={0.15} />
        </mesh>
      ))}
      {/* Central bulge */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <AtomMaterial id="centralBulge" activeFeature={activeFeature} viewMode={viewMode} color="#fff8e1" roughness={0.48} metalness={0.08} />
      </mesh>
    </group>
  );
}

// Binary Star System — primary + secondary spheres, shared orbit ring, Roche lobe tori, accretion stream
function BinaryStarModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const streamGeometry = useMemo(() => {
    const pts = [
      new Vector3(1.05, 0, 0),
      new Vector3(0.4, 0.3, 0),
      new Vector3(0, 0.15, 0),
      new Vector3(-0.35, 0.22, 0),
      new Vector3(-1.0, 0, 0),
    ];
    return new TubeGeometry(new CatmullRomCurve3(pts), 32, 0.04, 8, false);
  }, []);

  return (
    <group scale={[0.84, 0.84, 0.84]}>
      {/* Shared orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.022, 8, 100]} />
        <AtomMaterial id="rocheLobes" activeFeature={activeFeature} viewMode={viewMode} color="#ff8a65" opacity={0.28} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Primary star */}
      <group position={[1.3, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <AtomMaterial id="primaryStar" activeFeature={activeFeature} viewMode={viewMode} color="#ff7043" opacity={0.06} />
        </mesh>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.05, 40, 40]} />
          <AtomMaterial id="primaryStar" activeFeature={activeFeature} viewMode={viewMode} color="#ff7043" roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 24, 24]} />
          <AtomMaterial id="primaryStar" activeFeature={activeFeature} viewMode={viewMode} color="#fff9c4" opacity={crossSection ? 0.85 : 0.35} roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* Secondary star */}
      <group position={[-1.6, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.15, 16, 16]} />
          <AtomMaterial id="secondaryStar" activeFeature={activeFeature} viewMode={viewMode} color="#ffccbc" opacity={0.05} />
        </mesh>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.78, 36, 36]} />
          <AtomMaterial id="secondaryStar" activeFeature={activeFeature} viewMode={viewMode} color="#ffccbc" roughness={0.58} metalness={0.04} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 24, 24]} />
          <AtomMaterial id="secondaryStar" activeFeature={activeFeature} viewMode={viewMode} color="#fff9c4" opacity={crossSection ? 0.85 : 0.28} roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* Roche lobe outlines */}
      <mesh position={[1.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.018, 8, 60]} />
        <AtomMaterial id="rocheLobes" activeFeature={activeFeature} viewMode={viewMode} color="#ff8a65" opacity={0.22} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[-1.6, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.016, 8, 60]} />
        <AtomMaterial id="rocheLobes" activeFeature={activeFeature} viewMode={viewMode} color="#ff8a65" opacity={0.18} roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Accretion stream */}
      <mesh geometry={streamGeometry}>
        <AtomMaterial id="accretionStream" activeFeature={activeFeature} viewMode={viewMode} color="#bf360c" opacity={crossSection ? 0.55 : 0.72} roughness={0.4} metalness={0.25} />
      </mesh>
    </group>
  );
}

// ── Model router ─────────────────────────────────────────────────────────────

function CosmicModel({
  object,
  activeFeature,
  viewMode,
  crossSection,
  autoRotate,
  activeObservation,
}: Omit<CosmicSceneProps, "resetKey">) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  const common: CommonModelProps = { activeFeature, viewMode, crossSection, activeObservation };

  return (
    <group ref={group} position={[0, 0, 0]}>
      {object.modelKind === "mainStar" && <MainStarModel {...common} />}
      {object.modelKind === "neutronStar" && <NeutronStarModel {...common} />}
      {object.modelKind === "blackHole" && <BlackHoleModel {...common} />}
      {object.modelKind === "exoplanet" && <ExoplanetModel {...common} />}
      {object.modelKind === "galaxy" && <GalaxyModel {...common} />}
      {object.modelKind === "binaryStar" && <BinaryStarModel {...common} />}
    </group>
  );
}

function ModelLoadingOverlay({ object }: { object: CosmicObject }) {
  const { progress } = useProgress();
  const displayProgress = Math.max(8, Math.min(100, Math.round(progress)));

  return (
    <Html center className="model-loader">
      <div>
        <span>Loading 3D model</span>
        <strong>{object.name}</strong>
        <i>
          <b style={{ width: `${displayProgress}%` }} />
        </i>
        <em>{displayProgress}%</em>
      </div>
    </Html>
  );
}

export function CosmicScene({
  object,
  activeFeature,
  viewMode,
  crossSection,
  autoRotate,
  resetKey,
  activeObservation,
}: CosmicSceneProps) {
  return (
    <Canvas
      key={resetKey}
      className="cell-canvas"
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      camera={{ position: [0, 0.2, 5.8], fov: 38 }}
    >
      <color attach="background" args={["#080c14"]} />
      <ambientLight intensity={0.28} />
      <hemisphereLight args={["#0d1b3e", "#000010", 0.38]} />
      <directionalLight position={[4.2, 5.2, 5.8]} intensity={1.6} color="#c0d8ff" castShadow />
      <spotLight
        position={[-3.6, 3.2, 4.6]}
        angle={0.42}
        penumbra={0.74}
        intensity={0.6}
        color={object.accentSoft}
      />
      <pointLight
        position={[2.8, -1.2, 3.2]}
        intensity={0.8}
        color={object.accent}
      />
      <Suspense fallback={<ModelLoadingOverlay object={object} />}>
        <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.18}>
          <Center>
            <CosmicModel
              object={object}
              activeFeature={activeFeature}
              viewMode={viewMode}
              crossSection={crossSection}
              autoRotate={autoRotate}
              activeObservation={activeObservation}
            />
          </Center>
        </Float>
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.12}
          scale={7.0}
          blur={2.4}
          far={4.2}
        />
      </Suspense>
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan
        minDistance={3.2}
        maxDistance={8.4}
      />
    </Canvas>
  );
}
