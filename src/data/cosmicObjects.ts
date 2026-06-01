export type CosmicKind =
  | "emWave"
  | "proton";

export type ViewMode = "mesh" | "focus";

export type CosmicFeature = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  attributes: Array<{
    label: string;
    value: string;
  }>;
  note: string;
  fact: string;
};

export type CosmicObject = {
  id: string;
  name: string;
  type: string;
  accent: string;
  accentSoft: string;
  color: string;
  modelKind: CosmicKind;
  defaultFeature: string;
  comparison: string;
  occurrence: {
    title: string;
    body: string;
    motif: string;
  };
  observations: Array<{
    label: string;
    tone: string;
    pattern: string;
  }>;
  features: CosmicFeature[];
};

export const cosmicObjects: CosmicObject[] = [
  {
    id: "emWave",
    name: "Electromagnetic Wave",
    type: "Physics  ·  Transverse Wave",
    accent: "#7c4dff",
    accentSoft: "#ede7f6",
    color: "#b39ddb",
    modelKind: "emWave",
    defaultFeature: "eField",
    comparison: "proton",
    occurrence: {
      title: "Radio waves to gamma rays",
      body: "The electromagnetic spectrum spans 24 orders of magnitude in frequency, from ELF radio waves used in submarine communication to gamma rays released in nuclear decay. The visible band — the tiny slice humans perceive — covers less than one octave of frequency.",
      motif: "wave",
    },
    observations: [
      { label: "Radio Telescope", tone: "#b39ddb", pattern: "radio-telescope" },
      { label: "Interferometry", tone: "#9575cd", pattern: "optical-interferometry" },
      { label: "Gamma-ray Detector", tone: "#7c4dff", pattern: "gamma-detector" },
    ],
    features: [
      {
        id: "eField",
        name: "Electric Field",
        subtitle: "The oscillating E-field",
        color: "#7c4dff",
        attributes: [
          { label: "Orientation", value: "Transverse" },
          { label: "Amplitude", value: "Peak E (V/m)" },
          { label: "Plane", value: "⊥ to propagation" },
        ],
        note: "The electric field oscillates perpendicular to the direction of travel. Its changing magnitude induces the perpendicular magnetic field in a self-sustaining cycle — the mechanism behind electromagnetic self-propagation in vacuum.",
        fact: "Light in glass slows to ~0.67c because the E-field interacts with electron clouds of glass atoms, creating a phase delay.",
      },
      {
        id: "bField",
        name: "Magnetic Field",
        subtitle: "The oscillating B-field",
        color: "#00897b",
        attributes: [
          { label: "Orientation", value: "⊥ to E-field" },
          { label: "Ratio", value: "|E|/|B| = c" },
          { label: "Units", value: "Tesla (T)" },
        ],
        note: "The magnetic field oscillates 90° out of phase with the electric field in space but exactly in phase in time. The ratio of their amplitudes always equals the speed of light in vacuum.",
        fact: "Maxwell predicted electromagnetic waves in 1865 from pure mathematics, nine years before Hertz measured them experimentally.",
      },
      {
        id: "photonPacket",
        name: "Photon Packet",
        subtitle: "The quantum of light",
        color: "#ffd740",
        attributes: [
          { label: "Energy", value: "E = hf" },
          { label: "Momentum", value: "p = hf/c" },
          { label: "Rest mass", value: "0 (massless)" },
        ],
        note: "While the wave describes the probability amplitude, individual photons are detected as discrete packets of energy. The photoelectric effect proved that light cannot be split below this minimum quantum.",
        fact: "A photon traveling from the Sun's core to its surface takes ~100,000 years due to random scattering; the 8-minute journey to Earth is comparatively trivial.",
      },
    ],
  },
  {
    id: "proton",
    name: "Proton",
    type: "Physics  ·  Baryon  ·  p⁺",
    accent: "#e53935",
    accentSoft: "#ffebee",
    color: "#ef9a9a",
    modelKind: "proton",
    defaultFeature: "quark",
    comparison: "emWave",
    occurrence: {
      title: "Every atom in the visible universe",
      body: "Protons are among the most abundant stable particles in the universe, comprising roughly half the mass of all ordinary matter. In a hydrogen atom, a lone proton is the entire nucleus. In heavier atoms, protons cluster with neutrons, bound by the residual strong force.",
      motif: "particle",
    },
    observations: [
      { label: "Particle Accelerator", tone: "#ef9a9a", pattern: "particle-accelerator" },
      { label: "Deep Inelastic Scattering", tone: "#e53935", pattern: "deep-inelastic" },
      { label: "Synchrotron X-ray", tone: "#ff8f00", pattern: "synchrotron-xray" },
    ],
    features: [
      {
        id: "quark",
        name: "Quark Triplet",
        subtitle: "The valence core",
        color: "#e53935",
        attributes: [
          { label: "Composition", value: "2 up + 1 down" },
          { label: "Charge", value: "+⅔ +⅔ −⅓ = +1" },
          { label: "Confinement", value: "~1 fm" },
        ],
        note: "Quarks are never found in isolation; the strong force increases with distance, making it impossible to pull quarks apart without creating new quark-antiquark pairs. This property — confinement — means free quarks are never observed.",
        fact: "The proton's mass (~938 MeV/c²) is ~100× larger than the sum of its three quark masses — most proton mass comes from gluon field energy via E=mc².",
      },
      {
        id: "gluon",
        name: "Gluon Field",
        subtitle: "The color-force carrier",
        color: "#ff8f00",
        attributes: [
          { label: "Mediates", value: "Strong force" },
          { label: "Charge", value: "Color charge" },
          { label: "Range", value: "~1 fm" },
        ],
        note: "Gluons carry color charge themselves, unlike photons which are electrically neutral. This self-interaction causes the strong force to grow with distance and gives rise to the color flux tube — a string of gluons between quarks that acts like a rubber band.",
        fact: "About 50% of the proton's spin comes from gluons — the proton spin crisis (1987) showed quarks alone account for only ~30% of spin.",
      },
      {
        id: "charge",
        name: "Electric Charge",
        subtitle: "The +1 electrostatic property",
        color: "#ffd740",
        attributes: [
          { label: "Value", value: "+1.602 × 10⁻¹⁹ C" },
          { label: "Charge radius", value: "~0.85 fm" },
          { label: "Field", value: "Coulomb 1/r²" },
        ],
        note: "The proton's +1 charge is the exact opposite of the electron's −1 charge. This precise equality, accurate to at least 1 part in 10²¹, is one of the great unexplained coincidences of physics.",
        fact: "The proton is 1836× more massive than the electron; if a proton were the size of a baseball, its hydrogen electron orbit would be roughly 2 km away.",
      },
    ],
  },
];

export function getCosmicObjectById(id: string): CosmicObject {
  const found = cosmicObjects.find((o) => o.id === id);
  if (!found) throw new Error(`CosmicObject not found: ${id}`);
  return found;
}
