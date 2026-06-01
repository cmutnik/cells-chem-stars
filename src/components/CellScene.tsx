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

// Two orbiting bodies each driving their own ripple in the spacetime grid.
// Primary (orange, heavier) orbits at r1; secondary (pale, lighter) at r2.
function GravitationalWaveBinary() {
  const N = 30;
  const extent = 4.8;
  const W = N + 1;
  const step = (extent * 2) / N;

  // Orbital parameters — primary is 60 % of total mass so orbits closer to barycentre
  const orbitSpeed = 1.1;
  const separation = 2.4;
  const orbitR1 = separation * 0.40;  // primary orbit radius
  const orbitR2 = separation * 0.60;  // secondary orbit radius

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
        idxs.push(i * W + j, i * W + j + 1);
        idxs.push(j * W + i, (j + 1) * W + i);
      }
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(verts, 3));
    geo.setIndex(idxs);
    return geo;
  }, []);

  const star1Ref = useRef<Mesh>(null);
  const star2Ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const angle = t * orbitSpeed;

    // Barycentre-centred orbital positions (in XZ plane)
    const px1 =  orbitR1 * Math.cos(angle);
    const pz1 =  orbitR1 * Math.sin(angle);
    const px2 = -orbitR2 * Math.cos(angle);
    const pz2 = -orbitR2 * Math.sin(angle);

    star1Ref.current?.position.set(px1, 0, pz1);
    star2Ref.current?.position.set(px2, 0, pz2);

    // Grid: superpose two decaying ripples, one from each orbiting source
    const pos = geometry.attributes.position as BufferAttribute;
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const x = -extent + i * step;
        const z = -extent + j * step;

        const dr1 = Math.sqrt((x - px1) ** 2 + (z - pz1) ** 2);
        const dr2 = Math.sqrt((x - px2) ** 2 + (z - pz2) ** 2);

        const y1 = dr1 < 0.22 ? 0 : (0.34 / (1 + dr1 * 0.3)) * Math.sin(dr1 * 2.1 - t * 3.4);
        const y2 = dr2 < 0.22 ? 0 : (0.26 / (1 + dr2 * 0.3)) * Math.sin(dr2 * 2.1 - t * 3.4);

        pos.setY(i * W + j, y1 + y2);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      {/* Spacetime sheets */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#29b6f6" opacity={0.38} transparent />
      </lineSegments>
      <lineSegments geometry={geometry} rotation={[0, 0, Math.PI / 2]}>
        <lineBasicMaterial color="#29b6f6" opacity={0.20} transparent />
      </lineSegments>

      {/* Individual orbit paths */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitR1, 0.014, 8, 80]} />
        <meshStandardMaterial color="#ff7043" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitR2, 0.012, 8, 80]} />
        <meshStandardMaterial color="#ffccbc" transparent opacity={0.18} />
      </mesh>

      {/* Primary star — larger, orange */}
      <mesh ref={star1Ref}>
        <sphereGeometry args={[0.36, 24, 24]} />
        <meshStandardMaterial color="#ff7043" emissive="#ff4010" emissiveIntensity={0.7} />
      </mesh>

      {/* Secondary star — smaller, pale */}
      <mesh ref={star2Ref}>
        <sphereGeometry args={[0.25, 20, 20]} />
        <meshStandardMaterial color="#ffccbc" emissive="#ffaa80" emissiveIntensity={0.55} />
      </mesh>
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
function BinaryStarModel({ activeFeature, viewMode, crossSection, activeObservation = null }: CommonModelProps) {
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

  const obs = activeObservation;

  // Two-body orbital GW mode: replace static model entirely with animated version
  if (obs === "gravitational-wave-binary") {
    return (
      <group scale={[0.84, 0.84, 0.84]}>
        <GravitationalWaveBinary />
      </group>
    );
  }

  const obsViewMode: ViewMode = obs ? "mesh" : viewMode;
  const starOp   = obs === "gravitational-wave" ? 0.18 : 1.0;
  const streamOp = obs === "gravitational-wave" ? 0.08 : crossSection ? 0.55 : 0.72;
  const orbitOp  = obs === "gravitational-wave" ? 0.08 : 0.28;

  return (
    <group scale={[0.84, 0.84, 0.84]}>
      {/* Single-source GW spacetime grid */}
      {obs === "gravitational-wave" && <GravitationalWaveGrid />}

      {/* Shared orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.022, 8, 100]} />
        <AtomMaterial id="rocheLobes" activeFeature={activeFeature} viewMode={obsViewMode} color="#ff8a65" opacity={orbitOp} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Primary star */}
      <group position={[1.3, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <AtomMaterial id="primaryStar" activeFeature={activeFeature} viewMode={obsViewMode} color="#ff7043" opacity={0.06 * starOp} />
        </mesh>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.05, 40, 40]} />
          <AtomMaterial id="primaryStar" activeFeature={activeFeature} viewMode={obsViewMode} color="#ff7043" opacity={starOp} roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 24, 24]} />
          <AtomMaterial id="primaryStar" activeFeature={activeFeature} viewMode={obsViewMode} color="#fff9c4" opacity={(crossSection ? 0.85 : 0.35) * starOp} roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* Secondary star */}
      <group position={[-1.6, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.15, 16, 16]} />
          <AtomMaterial id="secondaryStar" activeFeature={activeFeature} viewMode={obsViewMode} color="#ffccbc" opacity={0.05 * starOp} />
        </mesh>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.78, 36, 36]} />
          <AtomMaterial id="secondaryStar" activeFeature={activeFeature} viewMode={obsViewMode} color="#ffccbc" opacity={starOp} roughness={0.58} metalness={0.04} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 24, 24]} />
          <AtomMaterial id="secondaryStar" activeFeature={activeFeature} viewMode={obsViewMode} color="#fff9c4" opacity={(crossSection ? 0.85 : 0.28) * starOp} roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* Roche lobe outlines */}
      <mesh position={[1.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.018, 8, 60]} />
        <AtomMaterial id="rocheLobes" activeFeature={activeFeature} viewMode={obsViewMode} color="#ff8a65" opacity={0.22 * (obs === "gravitational-wave" ? 0.3 : 1)} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[-1.6, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.016, 8, 60]} />
        <AtomMaterial id="rocheLobes" activeFeature={activeFeature} viewMode={obsViewMode} color="#ff8a65" opacity={0.18 * (obs === "gravitational-wave" ? 0.3 : 1)} roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Accretion stream */}
      <mesh geometry={streamGeometry}>
        <AtomMaterial id="accretionStream" activeFeature={activeFeature} viewMode={obsViewMode} color="#bf360c" opacity={streamOp} roughness={0.4} metalness={0.25} />
      </mesh>
    </group>
  );
}

// Electron — layered 1s probability cloud + spin axis + point charge core
function ElectronModel({ activeFeature, viewMode }: CommonModelProps) {
  return (
    <group scale={[1.15, 1.15, 1.15]}>
      {/* 1s probability cloud — three nested shells encoding density gradient */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <AtomMaterial id="orbitalCloud" activeFeature={activeFeature} viewMode={viewMode} color="#4fc3f7" opacity={0.06} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <AtomMaterial id="orbitalCloud" activeFeature={activeFeature} viewMode={viewMode} color="#29b6f6" opacity={0.13} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <AtomMaterial id="orbitalCloud" activeFeature={activeFeature} viewMode={viewMode} color="#0288d1" opacity={0.28} />
      </mesh>
      {/* Spin axis — tilted 30° as a reminder spin is not a classical rotation */}
      <mesh rotation={[0.52, 0, 0]}>
        <cylinderGeometry args={[0.026, 0.026, 3.4, 8]} />
        <AtomMaterial id="spin" activeFeature={activeFeature} viewMode={viewMode} color="#b3e5fc" opacity={0.55} />
      </mesh>
      <mesh position={[0, 1.88, 0]} rotation={[0.52, 0, 0]}>
        <coneGeometry args={[0.11, 0.38, 8]} />
        <AtomMaterial id="spin" activeFeature={activeFeature} viewMode={viewMode} color="#b3e5fc" opacity={0.72} />
      </mesh>
      {/* Point charge core */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.19, 24, 24]} />
        <AtomMaterial id="electronCharge" activeFeature={activeFeature} viewMode={viewMode} color="#e1f5fe" roughness={0.28} metalness={0.08} />
      </mesh>
    </group>
  );
}

// Hydrogen Atom — proton nucleus + animated electron on Bohr orbit + energy level rings
function HydrogenAtomModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const orbitalRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (orbitalRef.current) orbitalRef.current.rotation.y = clock.elapsedTime * 0.85;
  });

  return (
    <group scale={[0.9, 0.9, 0.9]}>
      {/* 1s electron probability cloud */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <AtomMaterial id="electronOrbital" activeFeature={activeFeature} viewMode={viewMode} color="#4fc3f7" opacity={0.05} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.55, 32, 32]} />
        <AtomMaterial id="electronOrbital" activeFeature={activeFeature} viewMode={viewMode} color="#29b6f6" opacity={0.09} />
      </mesh>
      {/* Energy level shell rings n=1,2,3 */}
      {([1.55, 2.8, 4.1] as number[]).map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, i * 0.42, 0]}>
          <torusGeometry args={[r, 0.015, 8, 72]} />
          <AtomMaterial id="energyLevels" activeFeature={activeFeature} viewMode={viewMode} color="#e1f5fe" opacity={0.22 - i * 0.05} />
        </mesh>
      ))}
      {/* Bohr orbit ring + electron marker */}
      <group ref={orbitalRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.55, 0.022, 8, 80]} />
          <AtomMaterial id="electronOrbital" activeFeature={activeFeature} viewMode={viewMode} color="#b3e5fc" opacity={0.55} />
        </mesh>
        <Atom id="electronOrbital" position={[1.55, 0, 0]} radius={0.15} color="#29b6f6" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      </group>
      {/* Proton nucleus */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.26, 28, 28]} />
        <AtomMaterial id="protonCore" activeFeature={activeFeature} viewMode={viewMode} color="#ef9a9a" roughness={0.5} metalness={0.08} />
      </mesh>
    </group>
  );
}

// Alpha Particle (He-4) — 4 nucleons in tetrahedral arrangement, strong-force bonds, binding glow
function AlphaParticleModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  // Regular tetrahedron inscribed in sphere of radius k: vertices at (±k, ±k, ±k) choosing
  // even permutations of sign so each vertex is distinct and no two share an axis.
  const k = 0.46;
  const protonPositions: [number, number, number][] = [[ k,  k,  k], [ k, -k, -k]];
  const neutronPositions: [number, number, number][] = [[-k,  k, -k], [-k, -k,  k]];
  const all: [number, number, number][] = [...protonPositions, ...neutronPositions];
  const bonds: [number, number][] = [];
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) bonds.push([i, j]);

  return (
    <group scale={[1.15, 1.15, 1.15]}>
      {/* Nuclear binding glow */}
      <mesh>
        <sphereGeometry args={[0.65, 24, 24]} />
        <AtomMaterial id="nuclearBinding" activeFeature={activeFeature} viewMode={viewMode} color="#ffcc02" opacity={crossSection ? 0.38 : 0.14} />
      </mesh>
      {/* 6 strong-force bonds between all nucleon pairs */}
      {bonds.map(([a, b], i) => (
        <Bond key={i} id="nuclearBinding" from={all[a]} to={all[b]} radius={0.036} color="#ff8f00" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      ))}
      {/* 2 protons (red) */}
      {protonPositions.map((pos, i) => (
        <Atom key={`p-${i}`} id="protonPair" position={pos} radius={0.3} color="#e53935" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      ))}
      {/* 2 neutrons (slate-blue) */}
      {neutronPositions.map((pos, i) => (
        <Atom key={`n-${i}`} id="neutronPair" position={pos} radius={0.3} color="#78909c" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      ))}
    </group>
  );
}

// Neutrino — ghostly sphere + three slowly-rotating flavor rings + propagation arrow
function NeutrinoModel({ activeFeature, viewMode }: CommonModelProps) {
  const flavorRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (flavorRef.current) flavorRef.current.rotation.y = clock.elapsedTime * 0.42;
  });

  return (
    <group>
      {/* Outer halo — barely there */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <AtomMaterial id="masslessness" activeFeature={activeFeature} viewMode={viewMode} color="#ede7f6" opacity={0.04} />
      </mesh>
      {/* Three flavor rings: νₑ (blue), νμ (purple), ντ (green) at different orientations */}
      <group ref={flavorRef}>
        <mesh>
          <torusGeometry args={[1.45, 0.036, 8, 72]} />
          <AtomMaterial id="flavorOscillation" activeFeature={activeFeature} viewMode={viewMode} color="#4fc3f7" opacity={0.50} />
        </mesh>
        <mesh rotation={[Math.PI * 0.66, Math.PI * 0.33, 0]}>
          <torusGeometry args={[1.45, 0.036, 8, 72]} />
          <AtomMaterial id="flavorOscillation" activeFeature={activeFeature} viewMode={viewMode} color="#ce93d8" opacity={0.40} />
        </mesh>
        <mesh rotation={[Math.PI * 0.33, Math.PI * 0.66, 0]}>
          <torusGeometry args={[1.45, 0.036, 8, 72]} />
          <AtomMaterial id="flavorOscillation" activeFeature={activeFeature} viewMode={viewMode} color="#a5d6a7" opacity={0.30} />
        </mesh>
      </group>
      {/* Ghostly particle */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.26, 24, 24]} />
        <AtomMaterial id="masslessness" activeFeature={activeFeature} viewMode={viewMode} color="#f3e5f5" opacity={0.28} roughness={0.2} metalness={0.0} />
      </mesh>
      {/* Propagation arrow (weak interaction direction) */}
      <mesh position={[1.65, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.72, 8]} />
        <AtomMaterial id="weakInteraction" activeFeature={activeFeature} viewMode={viewMode} color="#b39ddb" opacity={0.30} />
      </mesh>
      <mesh position={[2.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.09, 0.40, 8]} />
        <AtomMaterial id="weakInteraction" activeFeature={activeFeature} viewMode={viewMode} color="#b39ddb" opacity={0.38} />
      </mesh>
    </group>
  );
}

// Double-Slit — barrier with two gaps, Huygens wavelets, interference screen, animated particle
function DoubleSlit({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const particleRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!particleRef.current) return;
    const t = (clock.elapsedTime * 0.38) % 1;
    particleRef.current.position.set(-2.8 + t * 5.2, Math.sin(t * Math.PI * 4) * 0.06, 0);
    (particleRef.current.material as MeshStandardMaterial).opacity = t < 0.88 ? 0.9 : ((1 - t) / 0.12) * 0.9;
  });

  const screenDots = useMemo(() => {
    const dots: { y: number; r: number }[] = [];
    for (let i = -9; i <= 9; i++) {
      const y = i * 0.21;
      const I = Math.cos(2.8 * y) ** 2 * Math.exp(-(y * y) / 3.0);
      dots.push({ y, r: Math.max(0.022, I * 0.15) });
    }
    return dots;
  }, []);

  return (
    <group scale={[0.86, 0.86, 0.86]}>
      {/* Source */}
      <Atom id="particleImpact" position={[-3.0, 0, 0]} radius={0.16} color="#ffd740" activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      {/* Barrier — three boxes framing two slits at y ≈ ±0.57 */}
      <mesh position={[0,  1.34, 0]}><boxGeometry args={[0.2, 1.52, 1.0]} /><AtomMaterial id="measurementEffect" activeFeature={activeFeature} viewMode={viewMode} color="#b39ddb" opacity={crossSection ? 0.55 : 0.74} roughness={0.6} metalness={0.1} /></mesh>
      <mesh position={[0,  0,    0]}><boxGeometry args={[0.2, 0.36, 1.0]} /><AtomMaterial id="measurementEffect" activeFeature={activeFeature} viewMode={viewMode} color="#b39ddb" opacity={crossSection ? 0.55 : 0.74} roughness={0.6} metalness={0.1} /></mesh>
      <mesh position={[0, -1.34, 0]}><boxGeometry args={[0.2, 1.52, 1.0]} /><AtomMaterial id="measurementEffect" activeFeature={activeFeature} viewMode={viewMode} color="#b39ddb" opacity={crossSection ? 0.55 : 0.74} roughness={0.6} metalness={0.1} /></mesh>
      {/* Huygens wavelets from each slit */}
      {([0.57, -0.57] as number[]).map((sy, si) =>
        ([0.55, 1.1, 1.65] as number[]).map((r, ri) => (
          <mesh key={`w${si}${ri}`} position={[0, sy, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[r, 0.016, 8, 48]} />
            <AtomMaterial id="waveInterference" activeFeature={activeFeature} viewMode={viewMode} color="#7c4dff" opacity={0.24 - ri * 0.06} />
          </mesh>
        ))
      )}
      {/* Detection screen */}
      <mesh position={[2.55, 0, 0]}><boxGeometry args={[0.07, 4.0, 0.75]} /><AtomMaterial id="waveInterference" activeFeature={activeFeature} viewMode={viewMode} color="#1a237e" opacity={0.45} roughness={0.8} metalness={0} /></mesh>
      {screenDots.map(({ y, r }, i) => (
        <Atom key={i} id="particleImpact" position={[2.52, y, 0]} radius={r} color="#ffd740" opacity={0.82} activeFeature={activeFeature} viewMode={viewMode} crossSection={crossSection} />
      ))}
      {/* Animated quantum particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#ffd740" transparent opacity={0.9} emissive="#ffd740" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Quantum Tunneling — incident wave + barrier + evanescent decay + transmitted wave
function QuantumTunnelingModel({ activeFeature, viewMode, crossSection }: CommonModelProps) {
  const nPts = 36;
  const incidentGeo = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= nPts; i++) {
      const x = -3.1 + (i / nPts) * 2.35;
      pts.push(new Vector3(x, 0.72 * Math.sin((i / nPts) * Math.PI * 3.5), 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 64, 0.055, 8, false);
  }, []);

  const evanescentGeo = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const x = -0.75 + (i / 20) * 1.5;
      const y = 0.72 * Math.exp(-3.2 * (i / 20)) * Math.cos((i / 20) * Math.PI * 1.4);
      pts.push(new Vector3(x, y, 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 48, 0.044, 8, false);
  }, []);

  const transmittedGeo = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= nPts; i++) {
      const x = 0.75 + (i / nPts) * 2.35;
      pts.push(new Vector3(x, 0.28 * Math.sin((i / nPts) * Math.PI * 3.5), 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 64, 0.044, 8, false);
  }, []);

  const reflectedGeo = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const x = -3.1 + (i / 20) * 2.35;
      pts.push(new Vector3(x, -0.22 * Math.sin((i / 20) * Math.PI * 3.5 + 0.6), 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 48, 0.032, 8, false);
  }, []);

  return (
    <group>
      {/* Incident wave */}
      <mesh geometry={incidentGeo} castShadow>
        <AtomMaterial id="incidentWave" activeFeature={activeFeature} viewMode={viewMode} color="#00897b" roughness={0.28} metalness={0.15} />
      </mesh>
      {/* Reflected wave */}
      <mesh geometry={reflectedGeo} castShadow>
        <AtomMaterial id="incidentWave" activeFeature={activeFeature} viewMode={viewMode} color="#4db6ac" opacity={0.6} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Potential barrier */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.4, 0.9]} />
        <AtomMaterial id="barrierRegion" activeFeature={activeFeature} viewMode={viewMode} color="#004d40" opacity={crossSection ? 0.55 : 0.28} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Evanescent decay inside barrier */}
      <mesh geometry={evanescentGeo} castShadow>
        <AtomMaterial id="barrierRegion" activeFeature={activeFeature} viewMode={viewMode} color="#a7ffeb" opacity={0.65} roughness={0.25} metalness={0.1} />
      </mesh>
      {/* Transmitted wave */}
      <mesh geometry={transmittedGeo} castShadow>
        <AtomMaterial id="transmittedWave" activeFeature={activeFeature} viewMode={viewMode} color="#00bfa5" roughness={0.28} metalness={0.15} />
      </mesh>
    </group>
  );
}

// Bloch Sphere — qubit state space with precessing state vector
function BlochSphereModel({ activeFeature, viewMode }: CommonModelProps) {
  const stateRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (stateRef.current) stateRef.current.rotation.y = clock.elapsedTime * 0.65;
  });

  return (
    <group scale={[1.05, 1.05, 1.05]}>
      {/* Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <AtomMaterial id="probabilityAmplitudes" activeFeature={activeFeature} viewMode={viewMode} color="#e8eaf6" opacity={0.07} />
      </mesh>
      {/* Equatorial ring (equal superposition) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.018, 8, 80]} />
        <AtomMaterial id="probabilityAmplitudes" activeFeature={activeFeature} viewMode={viewMode} color="#7986cb" opacity={0.55} />
      </mesh>
      {/* Z axis */}
      <mesh>
        <cylinderGeometry args={[0.022, 0.022, 3.8, 8]} />
        <AtomMaterial id="measurement" activeFeature={activeFeature} viewMode={viewMode} color="#c5cae9" opacity={0.45} />
      </mesh>
      {/* |0⟩ pole (north) */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <AtomMaterial id="measurement" activeFeature={activeFeature} viewMode={viewMode} color="#ffffff" roughness={0.3} />
      </mesh>
      {/* |1⟩ pole (south) */}
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <AtomMaterial id="measurement" activeFeature={activeFeature} viewMode={viewMode} color="#9fa8da" roughness={0.3} />
      </mesh>
      {/* X and Y axis guidelines */}
      {([0, 1, 2] as const).map((i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 3, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 3.0, 6]} />
          <AtomMaterial id="probabilityAmplitudes" activeFeature={activeFeature} viewMode={viewMode} color="#5c6bc0" opacity={0.22} />
        </mesh>
      ))}
      {/* Precessing state vector */}
      <group ref={stateRef} rotation={[0.72, 0, 0]}>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 1.24, 8]} />
          <AtomMaterial id="quantumState" activeFeature={activeFeature} viewMode={viewMode} color="#3949ab" roughness={0.2} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <coneGeometry args={[0.12, 0.38, 8]} />
          <AtomMaterial id="quantumState" activeFeature={activeFeature} viewMode={viewMode} color="#3949ab" roughness={0.2} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Quantum Entanglement — two anti-correlated spin-½ particles orbiting their barycentre
function EntanglementModel({ activeFeature, viewMode }: CommonModelProps) {
  const pairRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (pairRef.current) pairRef.current.rotation.y = clock.elapsedTime * 0.55;
  });

  const sep = 1.9;

  return (
    <group>
      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[sep, 0.014, 8, 80]} />
        <AtomMaterial id="nonLocality" activeFeature={activeFeature} viewMode={viewMode} color="#f48fb1" opacity={0.22} />
      </mesh>
      <group ref={pairRef}>
        {/* Bell pair correlation beam */}
        <Bond id="nonLocality" from={[-sep, 0, 0]} to={[sep, 0, 0]} radius={0.022} color="#f06292" activeFeature={activeFeature} viewMode={viewMode} crossSection={false} />
        {/* Particle A — spin ↑ */}
        <group position={[sep, 0, 0]}>
          <mesh castShadow receiveShadow><sphereGeometry args={[0.32, 24, 24]} /><AtomMaterial id="entangledPair" activeFeature={activeFeature} viewMode={viewMode} color="#e91e63" roughness={0.45} metalness={0.08} /></mesh>
          <mesh position={[0, 0.58, 0]}><cylinderGeometry args={[0.04, 0.04, 0.56, 8]} /><AtomMaterial id="spinCorrelation" activeFeature={activeFeature} viewMode={viewMode} color="#f8bbd0" opacity={0.85} /></mesh>
          <mesh position={[0, 0.98, 0]}><coneGeometry args={[0.1, 0.28, 8]} /><AtomMaterial id="spinCorrelation" activeFeature={activeFeature} viewMode={viewMode} color="#f8bbd0" opacity={0.9} /></mesh>
        </group>
        {/* Particle B — spin ↓ (anti-correlated) */}
        <group position={[-sep, 0, 0]}>
          <mesh castShadow receiveShadow><sphereGeometry args={[0.32, 24, 24]} /><AtomMaterial id="entangledPair" activeFeature={activeFeature} viewMode={viewMode} color="#e91e63" roughness={0.45} metalness={0.08} /></mesh>
          <mesh position={[0, -0.58, 0]} rotation={[Math.PI, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.56, 8]} /><AtomMaterial id="spinCorrelation" activeFeature={activeFeature} viewMode={viewMode} color="#f8bbd0" opacity={0.85} /></mesh>
          <mesh position={[0, -0.98, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.1, 0.28, 8]} /><AtomMaterial id="spinCorrelation" activeFeature={activeFeature} viewMode={viewMode} color="#f8bbd0" opacity={0.9} /></mesh>
        </group>
      </group>
    </group>
  );
}

// Uncertainty Principle — two wave packets showing Δx·Δp trade-off side by side
function UncertaintyPrincipleModel({ activeFeature, viewMode }: CommonModelProps) {
  const narrow = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 50; i++) {
      const x = -2.8 + (i / 50) * 2.6;
      const gauss = Math.exp(-(x * x) / 0.18);
      pts.push(new Vector3(x, 0.85 * gauss * Math.cos(x * 11), 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 64, 0.05, 8, false);
  }, []);

  const broad = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 50; i++) {
      const x = 0.2 + (i / 50) * 2.6;
      const gauss = Math.exp(-((x - 1.5) ** 2) / 1.8);
      pts.push(new Vector3(x, 0.52 * gauss * Math.cos((x - 1.5) * 3.2), 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 64, 0.05, 8, false);
  }, []);

  return (
    <group>
      {/* Narrow (position-localised) wave packet — Δx small */}
      <mesh geometry={narrow} castShadow>
        <AtomMaterial id="positionBasis" activeFeature={activeFeature} viewMode={viewMode} color="#f57c00" roughness={0.28} metalness={0.12} />
      </mesh>
      {/* Δx bracket */}
      <mesh position={[-1.5, -0.5, 0]}><boxGeometry args={[0.6, 0.05, 0.05]} /><AtomMaterial id="positionBasis" activeFeature={activeFeature} viewMode={viewMode} color="#ffcc80" opacity={0.6} /></mesh>
      {/* Broad (momentum-localised) wave packet — Δp small */}
      <mesh geometry={broad} castShadow>
        <AtomMaterial id="momentumBasis" activeFeature={activeFeature} viewMode={viewMode} color="#ffb74d" roughness={0.28} metalness={0.12} />
      </mesh>
      {/* Δp bracket */}
      <mesh position={[1.5, -0.5, 0]}><boxGeometry args={[2.2, 0.05, 0.05]} /><AtomMaterial id="momentumBasis" activeFeature={activeFeature} viewMode={viewMode} color="#ffe082" opacity={0.6} /></mesh>
      {/* Trade-off connector */}
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.016, 0.016, 2.8, 6]} /><AtomMaterial id="tradeoff" activeFeature={activeFeature} viewMode={viewMode} color="#ffe082" opacity={0.3} /></mesh>
    </group>
  );
}

// Quantum Harmonic Oscillator — parabolic well + 5 Hermite-Gauss wavefunctions
function HarmonicOscillatorModel({ activeFeature, viewMode }: CommonModelProps) {
  const yOffsets = [-1.8, -0.9, 0.0, 0.9, 1.8];
  const featureIds = ["zeroPointEnergy", "excitedStates", "excitedStates", "excitedStates", "classicalTurningPoints"];
  const colors = ["#42a5f5", "#1e88e5", "#1565c0", "#7c4dff", "#9575cd"];

  const wavefunctions = useMemo(() => {
    const Hn = (n: number, x: number): number => {
      switch (n) {
        case 0: return 1;
        case 1: return x;
        case 2: return x * x - 0.5;
        case 3: return x * x * x - 1.5 * x;
        case 4: return x ** 4 - 3 * x ** 2 + 0.375;
        default: return 1;
      }
    };
    return yOffsets.map((yOff, n) => {
      const pts: Vector3[] = [];
      for (let i = 0; i <= 48; i++) {
        const x = -2.5 + (i / 48) * 5.0;
        const gauss = Math.exp(-(x * x) / 2.8);
        const amp = 0.38 * Hn(n, x * 1.1) * gauss;
        pts.push(new Vector3(x, yOff + Math.max(-0.4, Math.min(0.4, amp)), 0));
      }
      return new TubeGeometry(new CatmullRomCurve3(pts), 64, 0.04, 8, false);
    });
  }, []);

  const wellGeometry = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = -2.6 + (i / 40) * 5.2;
      pts.push(new Vector3(x, -2.5 + x * x * 0.36, 0));
    }
    return new TubeGeometry(new CatmullRomCurve3(pts), 64, 0.03, 8, false);
  }, []);

  return (
    <group scale={[0.88, 0.88, 0.88]}>
      {/* Potential well outline */}
      <mesh geometry={wellGeometry} castShadow>
        <AtomMaterial id="classicalTurningPoints" activeFeature={activeFeature} viewMode={viewMode} color="#90caf9" opacity={0.45} roughness={0.3} />
      </mesh>
      {/* Energy level reference planes */}
      {yOffsets.map((y, i) => (
        <mesh key={`el-${i}`} position={[0, y, 0]}>
          <boxGeometry args={[5.0, 0.016, 0.6]} />
          <AtomMaterial id={featureIds[i]} activeFeature={activeFeature} viewMode={viewMode} color={colors[i]} opacity={0.3} />
        </mesh>
      ))}
      {/* Wavefunction tubes */}
      {wavefunctions.map((geo, i) => (
        <mesh key={`wf-${i}`} geometry={geo} castShadow>
          <AtomMaterial id={featureIds[i]} activeFeature={activeFeature} viewMode={viewMode} color={colors[i]} roughness={0.25} metalness={0.1} />
        </mesh>
      ))}
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
      {object.modelKind === "emWave" && <EMWaveModel {...common} />}
      {object.modelKind === "proton" && <ProtonModel {...common} />}
      {object.modelKind === "electron" && <ElectronModel {...common} />}
      {object.modelKind === "hydrogenAtom" && <HydrogenAtomModel {...common} />}
      {object.modelKind === "alphaParticle" && <AlphaParticleModel {...common} />}
      {object.modelKind === "neutrino" && <NeutrinoModel {...common} />}
      {object.modelKind === "doubleSlit" && <DoubleSlit {...common} />}
      {object.modelKind === "quantumTunneling" && <QuantumTunnelingModel {...common} />}
      {object.modelKind === "blochSphere" && <BlochSphereModel {...common} />}
      {object.modelKind === "entanglement" && <EntanglementModel {...common} />}
      {object.modelKind === "uncertaintyPrinciple" && <UncertaintyPrincipleModel {...common} />}
      {object.modelKind === "harmonicOscillator" && <HarmonicOscillatorModel {...common} />}
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
