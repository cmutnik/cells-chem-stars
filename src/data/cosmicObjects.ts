export type CosmicKind =
  | "emWave"
  | "proton"
  | "electron"
  | "hydrogenAtom"
  | "alphaParticle"
  | "neutrino";

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
    comparison: "electron",
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
  {
    id: "electron",
    name: "Electron",
    type: "Physics  ·  Lepton  ·  e⁻",
    accent: "#0288d1",
    accentSoft: "#e1f5fe",
    color: "#81d4fa",
    modelKind: "electron",
    defaultFeature: "orbitalCloud",
    comparison: "proton",
    occurrence: {
      title: "Bound to every atom in existence",
      body: "Electrons are fundamental leptons with no known substructure. Every atom's chemistry is determined by its electron configuration — the arrangement of electrons in quantised energy shells. Free electrons form the basis of electric current, and their wave-like nature underpins the entire field of quantum mechanics.",
      motif: "orbit",
    },
    observations: [
      { label: "Cloud Chamber", tone: "#81d4fa", pattern: "cloud-chamber" },
      { label: "Compton Scattering", tone: "#0288d1", pattern: "xray-imaging" },
      { label: "Electron Microscopy", tone: "#01579b", pattern: "optical-photometry" },
    ],
    features: [
      {
        id: "orbitalCloud",
        name: "Probability Cloud",
        subtitle: "The quantum position density",
        color: "#0288d1",
        attributes: [
          { label: "Shape (1s)", value: "Spherically symmetric" },
          { label: "Peak density", value: "Bohr radius (52.9 pm)" },
          { label: "Description", value: "ψ² = probability density" },
        ],
        note: "The electron does not orbit like a planet. Its quantum state is described by a wavefunction ψ; the square of its amplitude |ψ|² gives the probability of finding the electron at any location. For the ground-state hydrogen atom the cloud peaks at the Bohr radius and falls off exponentially.",
        fact: "The electron's charge radius is less than 10⁻¹⁸ m — smaller than a proton by a factor of ~1,000 — yet its probability cloud is 100,000 times larger than the nucleus it surrounds.",
      },
      {
        id: "spin",
        name: "Intrinsic Spin",
        subtitle: "The quantum angular momentum",
        color: "#4fc3f7",
        attributes: [
          { label: "Spin quantum number", value: "s = ½" },
          { label: "Projection", value: "±ℏ/2 (up or down)" },
          { label: "Magnetic moment", value: "−9.285 × 10⁻²⁴ J/T" },
        ],
        note: "Electron spin is an intrinsic form of angular momentum with no classical analogue. A spin-½ particle requires a 720° rotation to return to its original quantum state — not 360°. Spin is the origin of ferromagnetism and the Pauli exclusion principle that prevents electrons from sharing quantum states.",
        fact: "Stern and Gerlach demonstrated spin in 1922 by sending silver atoms through an inhomogeneous magnetic field and observing two discrete deflections instead of a classical smear.",
      },
      {
        id: "electronCharge",
        name: "Electric Charge",
        subtitle: "The −1 fundamental unit",
        color: "#ffd740",
        attributes: [
          { label: "Value", value: "−1.602 × 10⁻¹⁹ C" },
          { label: "Mass", value: "9.109 × 10⁻³¹ kg" },
          { label: "Mass ratio to proton", value: "1 : 1836" },
        ],
        note: "The electron's charge is equal and opposite to the proton's. This precise equality — verified to one part in 10²¹ — ensures atoms are electrically neutral. The electron's mass is 1836× smaller than the proton, making it the lightest massive charged particle known.",
        fact: "If an electron were scaled to the size of a marble, a proton at the same scale would be a 1.8 km sphere — and the hydrogen atom itself would span over 10 km.",
      },
    ],
  },
  {
    id: "hydrogenAtom",
    name: "Hydrogen Atom",
    type: "Physics  ·  Element 1  ·  H",
    accent: "#00acc1",
    accentSoft: "#e0f7fa",
    color: "#80deea",
    modelKind: "hydrogenAtom",
    defaultFeature: "electronOrbital",
    comparison: "alphaParticle",
    occurrence: {
      title: "75% of all atoms in the observable universe",
      body: "Hydrogen is the most abundant element in the universe, making up roughly 75% of all ordinary matter by mass. It was the first element synthesised minutes after the Big Bang, and remains the primary fuel for stellar fusion. The simplest atom — one proton, one electron — its quantum mechanics can be solved exactly and serves as the foundation of all atomic physics.",
      motif: "orbit",
    },
    observations: [
      { label: "Emission Spectrum", tone: "#80deea", pattern: "optical-photometry" },
      { label: "NMR Spectroscopy", tone: "#00acc1", pattern: "radio-telescope" },
      { label: "Laser Cooling", tone: "#b2ebf2", pattern: "optical-interferometry" },
    ],
    features: [
      {
        id: "electronOrbital",
        name: "Electron Orbital",
        subtitle: "The 1s ground state",
        color: "#00acc1",
        attributes: [
          { label: "Principal quantum number", value: "n = 1" },
          { label: "Bohr radius", value: "a₀ = 52.9 pm" },
          { label: "Binding energy", value: "−13.6 eV" },
        ],
        note: "The hydrogen ground state (1s orbital) is the simplest exact solution in quantum mechanics. The electron's binding energy is −13.6 eV — the energy required to remove it entirely. Higher energy levels (n = 2, 3, …) are a factor of n² further out; photons are emitted when electrons fall between levels.",
        fact: "The 21-cm hydrogen line — emitted when the electron spin flips relative to the proton — is used to map the Milky Way's spiral arms and is a candidate frequency for first contact with extraterrestrial intelligence.",
      },
      {
        id: "protonCore",
        name: "Proton Nucleus",
        subtitle: "The sole nuclear constituent",
        color: "#ef9a9a",
        attributes: [
          { label: "Charge", value: "+1" },
          { label: "Mass fraction", value: "99.95% of atom" },
          { label: "Nuclear radius", value: "~0.85 fm" },
        ],
        note: "In hydrogen the nucleus is a single proton. Its positive charge creates the Coulomb potential that binds the electron. The proton carries 99.95% of the hydrogen atom's mass, yet occupies a volume 100,000 times smaller than the atom itself.",
        fact: "Hydrogen's isotopes — deuterium (p + n) and tritium (p + 2n) — are the fuel for fusion reactors. Their nuclei fuse more readily than ordinary hydrogen due to the extra neutrons reducing Coulomb repulsion.",
      },
      {
        id: "energyLevels",
        name: "Energy Levels",
        subtitle: "The quantised Bohr shells",
        color: "#4dd0e1",
        attributes: [
          { label: "Ground state", value: "n = 1, E = −13.6 eV" },
          { label: "Lyman series", value: "n→1 transitions (UV)" },
          { label: "Balmer series", value: "n→2 transitions (visible)" },
        ],
        note: "Electrons can only occupy discrete energy shells. A photon is absorbed when its energy exactly matches a level transition; it is emitted when an electron drops. The Balmer series produces the red Hα line at 656 nm — the first spectral line Ångström catalogued in 1853 and the brightest line in most nebulae.",
        fact: "Rydberg atoms — hydrogen atoms with electrons in very high n levels (up to n ~ 300) — can be centimetres across, making them the largest stable atoms known.",
      },
    ],
  },
  {
    id: "alphaParticle",
    name: "Alpha Particle",
    type: "Physics  ·  He-4 Nucleus  ·  ⁴He²⁺",
    accent: "#ff7043",
    accentSoft: "#fbe9e7",
    color: "#ffab91",
    modelKind: "alphaParticle",
    defaultFeature: "protonPair",
    comparison: "hydrogenAtom",
    occurrence: {
      title: "Product of every helium-fusing star",
      body: "Alpha particles are helium-4 nuclei — two protons and two neutrons in an exceptionally stable arrangement. They are produced in alpha decay of heavy nuclei and as the end product of the proton-proton chain in stars like the Sun. Rutherford used them in the 1909 gold-foil experiment that proved the atomic nucleus exists.",
      motif: "particle",
    },
    observations: [
      { label: "Geiger Counter", tone: "#ff7043", pattern: "particle-accelerator" },
      { label: "Alpha Spectrometry", tone: "#bf360c", pattern: "deep-inelastic" },
      { label: "Rutherford Scattering", tone: "#ff8a65", pattern: "synchrotron-xray" },
    ],
    features: [
      {
        id: "protonPair",
        name: "Proton Pair",
        subtitle: "The two positive charges",
        color: "#e53935",
        attributes: [
          { label: "Count", value: "Z = 2" },
          { label: "Total charge", value: "+2e" },
          { label: "Quark content", value: "uud each" },
        ],
        note: "The two protons repel each other electrostatically, yet remain bound because the residual strong force at femtometre separations more than overcomes Coulomb repulsion. This balance between electrostatics and nuclear binding determines stability for all nuclei heavier than hydrogen.",
        fact: "Rutherford's 1909 gold-foil experiment, firing alpha particles at gold foil, proved the atom has a tiny dense nucleus — overturning the plum-pudding model and founding nuclear physics.",
      },
      {
        id: "neutronPair",
        name: "Neutron Pair",
        subtitle: "The stabilising neutral partners",
        color: "#78909c",
        attributes: [
          { label: "Count", value: "N = 2" },
          { label: "Charge", value: "0" },
          { label: "Quark content", value: "udd each" },
        ],
        note: "Neutrons carry no electric charge but do contribute the residual strong force. Adding neutrons to a nucleus increases binding without adding Coulomb repulsion — up to a point. The alpha particle's 2+2 ratio is optimal for light nuclei, giving it exceptional binding energy of 7.07 MeV per nucleon.",
        fact: "The alpha particle has the highest binding energy per nucleon of any nucleus lighter than iron, which is why alpha emission is energetically favoured for heavy unstable elements.",
      },
      {
        id: "nuclearBinding",
        name: "Nuclear Binding",
        subtitle: "The residual strong force",
        color: "#ff8f00",
        attributes: [
          { label: "Total binding energy", value: "28.3 MeV" },
          { label: "Per nucleon", value: "7.07 MeV/nucleon" },
          { label: "Range", value: "~1–3 fm" },
        ],
        note: "Nuclear binding energy is the energy released when the nucleus assembles from free nucleons. It arises from the residual strong force — a short-range attractive force mediated by virtual pion exchange between nucleons. The alpha particle's closed nuclear shells at Z=2, N=2 (both 'magic numbers') give it extra stability.",
        fact: "Helium-4 is doubly magic — both Z=2 and N=2 are nuclear magic numbers analogous to noble-gas electron shells — explaining why it is vastly more abundant in the universe than lithium or beryllium.",
      },
    ],
  },
  {
    id: "neutrino",
    name: "Neutrino",
    type: "Physics  ·  Lepton  ·  νₑ",
    accent: "#7c4dff",
    accentSoft: "#ede7f6",
    color: "#b39ddb",
    modelKind: "neutrino",
    defaultFeature: "flavorOscillation",
    comparison: "electron",
    occurrence: {
      title: "100 trillion pass through you every second",
      body: "Neutrinos are produced in nuclear reactions everywhere in the universe — stellar fusion, supernovae, radioactive decay, and cosmic ray showers. About 100 trillion solar neutrinos pass through every square centimetre of your body each second without interacting. They carry information from the deepest interiors of stars that no other particle can reach.",
      motif: "wave",
    },
    observations: [
      { label: "IceCube Detector", tone: "#b39ddb", pattern: "gravitational-wave" },
      { label: "Super-Kamiokande", tone: "#9575cd", pattern: "optical-photometry" },
      { label: "Solar Flux", tone: "#7c4dff", pattern: "radio-telescope" },
    ],
    features: [
      {
        id: "flavorOscillation",
        name: "Flavor Oscillation",
        subtitle: "The quantum identity shift",
        color: "#7c4dff",
        attributes: [
          { label: "Flavors", value: "νₑ, νμ, ντ" },
          { label: "Oscillation length", value: "km to megametre scale" },
          { label: "Requires", value: "Non-zero mass" },
        ],
        note: "Neutrinos are produced in a definite flavor state but propagate as quantum superpositions of mass eigenstates. Because these mass states have different phases, the probability of measuring each flavor oscillates as the neutrino travels. This quantum beating was confirmed by Super-Kamiokande in 1998, proving neutrinos have mass and extending the Standard Model.",
        fact: "The 2015 Nobel Prize was awarded for neutrino oscillation discovery — proving the Standard Model is incomplete since it originally assumed massless neutrinos.",
      },
      {
        id: "masslessness",
        name: "Tiny Mass",
        subtitle: "The near-massless ghost",
        color: "#e1bee7",
        attributes: [
          { label: "Upper bound (sum)", value: "< 0.12 eV/c²" },
          { label: "Electron mass", value: "511,000 eV/c²" },
          { label: "Ratio", value: "< 1 part in 4 million" },
        ],
        note: "Neutrino masses are extraordinarily small — at least four million times lighter than the electron and at least a billion times lighter than the proton. Their masses cannot arise from the same Higgs mechanism that gives other fermions mass; the leading explanation is the seesaw mechanism, linking tiny neutrino masses to very heavy undiscovered sterile neutrinos.",
        fact: "Despite their tiny mass, Big Bang relic neutrinos contribute roughly as much mass to the universe as all visible stars combined — because there are ~340 of them in every cubic centimetre of space.",
      },
      {
        id: "weakInteraction",
        name: "Weak Interaction",
        subtitle: "The only force neutrinos feel",
        color: "#ce93d8",
        attributes: [
          { label: "Forces felt", value: "Weak nuclear + gravity" },
          { label: "Carriers", value: "W±, Z⁰ bosons" },
          { label: "Cross-section", value: "~10⁻⁴⁴ cm² at 1 MeV" },
        ],
        note: "Neutrinos interact only via the weak nuclear force and gravity — not electromagnetism or the strong force. Their interaction cross-section is so tiny that a neutrino at MeV energies would need a lead shield one light-year thick to have a 50% chance of being stopped. This makes them extraordinary messengers from environments impenetrable to light.",
        fact: "When SN 1987A exploded, detectors on Earth recorded 24 neutrinos — three hours before the optical light arrived. The neutrinos escaped the collapsing core instantly; photons were delayed by the expanding shock wave.",
      },
    ],
  },
];

export function getCosmicObjectById(id: string): CosmicObject {
  const found = cosmicObjects.find((o) => o.id === id);
  if (!found) throw new Error(`CosmicObject not found: ${id}`);
  return found;
}
