export type CosmicKind =
  | "emWave"
  | "proton"
  | "electron"
  | "hydrogenAtom"
  | "alphaParticle"
  | "neutrino"
  | "doubleSlit"
  | "quantumTunneling"
  | "blochSphere"
  | "entanglement"
  | "uncertaintyPrinciple"
  | "harmonicOscillator";

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
  {
    id: "doubleSlit",
    name: "Double-Slit Experiment",
    type: "Quantum Mechanics  ·  Wave-Particle Duality",
    accent: "#ab47bc",
    accentSoft: "#f3e5f5",
    color: "#ce93d8",
    modelKind: "doubleSlit",
    defaultFeature: "waveInterference",
    comparison: "electron",
    occurrence: {
      title: "The most beautiful experiment in physics",
      body: "The double-slit experiment encapsulates the central mystery of quantum mechanics: particles like electrons and photons produce an interference pattern when no one is watching which slit they go through, but act like classical particles when observed. It demonstrates that quantum systems exist in superpositions of all possible paths until measured.",
      motif: "wave",
    },
    observations: [
      { label: "Single Photons", tone: "#ce93d8", pattern: "optical-photometry" },
      { label: "Single Electrons", tone: "#ab47bc", pattern: "deep-inelastic" },
      { label: "Buckyballs (C₆₀)", tone: "#7b1fa2", pattern: "particle-accelerator" },
    ],
    features: [
      {
        id: "waveInterference",
        name: "Wave Interference",
        subtitle: "The two-slit diffraction pattern",
        color: "#ab47bc",
        attributes: [
          { label: "Pattern", value: "cos²(πd sinθ / λ)" },
          { label: "Bright fringes", value: "d sinθ = nλ" },
          { label: "Dark fringes", value: "d sinθ = (n+½)λ" },
        ],
        note: "When no measurement reveals which slit a particle passes through, the wavefunction passes through both simultaneously, interfering with itself. The resulting intensity pattern on a detector screen follows the double-slit diffraction formula — identical whether particles are sent one at a time or in a beam.",
        fact: "In 2019, physicists performed the double-slit experiment with individual molecules of 2,000 atoms — the most massive objects ever observed to exhibit quantum interference.",
      },
      {
        id: "particleImpact",
        name: "Particle Impacts",
        subtitle: "Discrete detection events",
        color: "#ffd740",
        attributes: [
          { label: "Each event", value: "Single, localised hit" },
          { label: "Many events", value: "Reveals interference" },
          { label: "Paradox", value: "Wave guides, particle arrives" },
        ],
        note: "Each individual particle arrives at a single, definite point on the detector — never spread out like a wave. Yet over thousands of events, the cumulative hit pattern forms the continuous interference fringes. This forces us to accept that the interference is not between different particles, but within the wavefunction of each single particle.",
        fact: "Tonomura et al. (1989) built up the electron interference pattern one electron at a time, with clear photographic evidence that each electron 'knows about' both slits.",
      },
      {
        id: "measurementEffect",
        name: "Measurement Effect",
        subtitle: "Which-path information destroys fringes",
        color: "#e1bee7",
        attributes: [
          { label: "Detector at slit", value: "Pattern vanishes" },
          { label: "Complementarity", value: "Wave ↔ particle info" },
          { label: "Principle", value: "Bohr complementarity" },
        ],
        note: "Placing a detector at one slit to determine 'which path' immediately destroys the interference pattern — even if the detector result is never read by a human. The act of the information becoming available in the universe (not the act of human observation) collapses the superposition. The fringe visibility is inversely proportional to path distinguishability.",
        fact: "Wheeler's delayed-choice experiment showed that the 'decision' of which behaviour to exhibit can be made after the particle has already passed the slits — quantum mechanics has no preferred time direction for measurement.",
      },
    ],
  },
  {
    id: "quantumTunneling",
    name: "Quantum Tunneling",
    type: "Quantum Mechanics  ·  Barrier Transmission",
    accent: "#00897b",
    accentSoft: "#e0f2f1",
    color: "#80cbc4",
    modelKind: "quantumTunneling",
    defaultFeature: "incidentWave",
    comparison: "alphaParticle",
    occurrence: {
      title: "Powers the Sun and every transistor",
      body: "Quantum tunneling allows particles to pass through potential-energy barriers that classical physics says are impenetrable. It is responsible for nuclear fusion in stars (protons tunneling through the Coulomb barrier), alpha decay, scanning tunnelling microscopy at atomic resolution, and the operation of tunnel diodes and flash memory in every modern computer.",
      motif: "wave",
    },
    observations: [
      { label: "Scanning Tunnel Microscope", tone: "#80cbc4", pattern: "optical-photometry" },
      { label: "Alpha Decay Spectrum", tone: "#00897b", pattern: "deep-inelastic" },
      { label: "Tunnel Diode I–V", tone: "#004d40", pattern: "particle-accelerator" },
    ],
    features: [
      {
        id: "incidentWave",
        name: "Incident Wave",
        subtitle: "The approaching wavefunction",
        color: "#00897b",
        attributes: [
          { label: "Amplitude", value: "A (full)" },
          { label: "Region", value: "x < 0 (left of barrier)" },
          { label: "Form", value: "A·e^(ikx) + R·e^(−ikx)" },
        ],
        note: "To the left of the barrier, the wavefunction is a superposition of the incident plane wave (travelling right) and a reflected wave (travelling left). The reflection coefficient R depends on the barrier height and width. Classical mechanics predicts total reflection if the particle energy is below the barrier; quantum mechanics predicts partial transmission.",
        fact: "The probability current is conserved: transmission coefficient T plus reflection coefficient R always equals 1, regardless of barrier shape.",
      },
      {
        id: "barrierRegion",
        name: "Evanescent Wave",
        subtitle: "Exponential decay inside the barrier",
        color: "#4db6ac",
        attributes: [
          { label: "Form inside barrier", value: "ψ ∝ e^(−κx)" },
          { label: "Decay constant", value: "κ = √(2m(V₀−E))/ℏ" },
          { label: "Classical verdict", value: "Forbidden region" },
        ],
        note: "Inside the classically forbidden barrier the wavefunction does not oscillate — it decays exponentially. The decay length 1/κ sets how quickly the amplitude drops. For a thin or low barrier, significant amplitude survives to the far side; for a thick or tall barrier, the transmission probability falls exponentially with barrier thickness.",
        fact: "The scanning tunnelling microscope exploits this exponential sensitivity: a 1 Å change in tip-sample separation changes the tunnel current by an order of magnitude, giving sub-atomic vertical resolution.",
      },
      {
        id: "transmittedWave",
        name: "Transmitted Wave",
        subtitle: "The far-side wavefunction",
        color: "#a7ffeb",
        attributes: [
          { label: "Amplitude", value: "T·A (reduced)" },
          { label: "Region", value: "x > barrier width" },
          { label: "T (thin barrier)", value: "e^(−2κd)" },
        ],
        note: "On the far side of the barrier, a reduced-amplitude wave emerges, carrying the tunnelled probability current. The particle's energy is unchanged by tunnelling — it does not lose energy 'climbing' the barrier, because classically speaking it never existed inside. Tunnelling rate drops exponentially with barrier thickness d and the square root of (barrier height − particle energy).",
        fact: "Without quantum tunnelling, the Sun could not fuse protons — the thermal energy at the solar core is only 1% of what classical physics requires to overcome the Coulomb barrier. Tunnelling accounts for the other 99%.",
      },
    ],
  },
  {
    id: "blochSphere",
    name: "Bloch Sphere",
    type: "Quantum Mechanics  ·  Qubit State Space",
    accent: "#3949ab",
    accentSoft: "#e8eaf6",
    color: "#9fa8da",
    modelKind: "blochSphere",
    defaultFeature: "quantumState",
    comparison: "electron",
    occurrence: {
      title: "The geometry of a single qubit",
      body: "The Bloch sphere is the complete geometric picture of a two-level quantum system (qubit). Every possible pure quantum state corresponds to a point on its surface. The north pole is |0⟩, the south pole |1⟩, and the equator contains equal superpositions. Quantum gates are rotations of this sphere — the mathematical backbone of quantum computing.",
      motif: "orbit",
    },
    observations: [
      { label: "NMR / MRI Pulse Sequence", tone: "#9fa8da", pattern: "radio-telescope" },
      { label: "Ramsey Interferometry", tone: "#3949ab", pattern: "optical-interferometry" },
      { label: "Qubit Tomography", tone: "#1a237e", pattern: "xray-imaging" },
    ],
    features: [
      {
        id: "quantumState",
        name: "State Vector",
        subtitle: "The Bloch vector |ψ⟩",
        color: "#3949ab",
        attributes: [
          { label: "General state", value: "cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩" },
          { label: "Polar angle θ", value: "Sets |0⟩ vs |1⟩ mix" },
          { label: "Azimuthal angle φ", value: "Relative phase" },
        ],
        note: "Any pure qubit state can be written as cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩, corresponding to the point (sinθ cosφ, sinθ sinφ, cosθ) on the unit sphere. The polar angle θ sets the probability ratio between |0⟩ and |1⟩; the azimuthal angle φ encodes the relative quantum phase — invisible to a single measurement but observable through interference.",
        fact: "A qubit can be physically realised as the spin of an electron, the polarisation of a photon, the ground/excited states of an ion, or the current direction in a superconducting loop — all described by the same Bloch sphere.",
      },
      {
        id: "probabilityAmplitudes",
        name: "Superposition",
        subtitle: "Equal-weight states on the equator",
        color: "#7986cb",
        attributes: [
          { label: "|+⟩ state", value: "(|0⟩ + |1⟩)/√2  (φ=0)" },
          { label: "|−⟩ state", value: "(|0⟩ − |1⟩)/√2  (φ=π)" },
          { label: "Measurement prob.", value: "50% |0⟩, 50% |1⟩" },
        ],
        note: "On the equator of the Bloch sphere (θ = π/2), the qubit is in an equal superposition of |0⟩ and |1⟩ — the canonical 'both at once' state. The Hadamard gate maps a pole to the equator, creating this superposition from a classical bit. Once measured, the state collapses to a pole with 50/50 probability, but before measurement both amplitudes are simultaneously real.",
        fact: "Shor's quantum factoring algorithm depends critically on maintaining large superpositions — a 300-qubit register can represent 2³⁰⁰ states simultaneously, more than the number of atoms in the observable universe.",
      },
      {
        id: "measurement",
        name: "Measurement & Collapse",
        subtitle: "Projection onto the Z axis",
        color: "#c5cae9",
        attributes: [
          { label: "Outcome |0⟩", value: "Probability cos²(θ/2)" },
          { label: "Outcome |1⟩", value: "Probability sin²(θ/2)" },
          { label: "Post-measurement", value: "State = measured pole" },
        ],
        note: "Measuring a qubit in the Z basis projects the Bloch vector onto the north or south pole. The probability of each outcome is set by θ. After measurement, the superposition is destroyed — the state is now a definite |0⟩ or |1⟩. Measuring in a different basis (X or Y) corresponds to first rotating the sphere, then projecting onto the Z axis.",
        fact: "Quantum error correction can protect quantum information from decoherence without ever measuring the logical qubit — it detects syndromes of errors by measuring ancilla qubits instead.",
      },
    ],
  },
  {
    id: "entanglement",
    name: "Quantum Entanglement",
    type: "Quantum Mechanics  ·  Bell State  ·  EPR Pair",
    accent: "#e91e63",
    accentSoft: "#fce4ec",
    color: "#f48fb1",
    modelKind: "entanglement",
    defaultFeature: "entangledPair",
    comparison: "blochSphere",
    occurrence: {
      title: "Spooky action at a distance",
      body: "Quantum entanglement is a correlation between two particles that persists regardless of the distance between them. Measuring one instantly determines the correlated property of the other — not by sending a signal, but because neither particle had a definite value until measurement. Bell's theorem (1964) proved this cannot be explained by any hidden local variable, and experiments from Aspect (1982) to Delft (2015) have confirmed it.",
      motif: "particle",
    },
    observations: [
      { label: "Bell Inequality Test", tone: "#f48fb1", pattern: "optical-photometry" },
      { label: "Photon Coincidence", tone: "#e91e63", pattern: "optical-interferometry" },
      { label: "Ion Trap Readout", tone: "#880e4f", pattern: "xray-imaging" },
    ],
    features: [
      {
        id: "entangledPair",
        name: "Entangled Pair",
        subtitle: "The Bell state |Φ⁺⟩",
        color: "#e91e63",
        attributes: [
          { label: "State", value: "(|↑↓⟩ − |↓↑⟩)/√2" },
          { label: "Total spin", value: "0 (singlet state)" },
          { label: "Separable?", value: "No — joint state only" },
        ],
        note: "The singlet Bell state (|↑↓⟩ − |↓↑⟩)/√2 cannot be written as a product of individual particle states — the two particles share a single, non-separable quantum state. Neither particle has a definite spin until measured; they exist in a joint superposition. This is fundamentally different from classical correlation, where each particle secretly carries a predetermined spin.",
        fact: "Entanglement has been demonstrated between photons separated by over 1,200 km (Chinese satellite Micius, 2017) with no measurable degradation of correlations.",
      },
      {
        id: "spinCorrelation",
        name: "Spin Correlation",
        subtitle: "Anti-correlated measurement outcomes",
        color: "#f06292",
        attributes: [
          { label: "Same axis", value: "Always opposite spins" },
          { label: "Correlation", value: "−cos(angle between axes)" },
          { label: "Classical bound", value: "Cannot exceed ±½" },
        ],
        note: "If both particles are measured along the same axis, their outcomes are always opposite — one up, one down. If measured along different axes separated by angle α, the correlation is −cos α. This stronger-than-classical correlation is the signature of entanglement and directly violates Bell inequalities, which any local hidden-variable theory must satisfy.",
        fact: "The 2022 Nobel Prize in Physics was awarded to Aspect, Clauser, and Zeilinger for experimental demonstrations that nature violates Bell inequalities — definitively ruling out local hidden-variable theories.",
      },
      {
        id: "nonLocality",
        name: "Non-locality",
        subtitle: "No signal, yet instant correlation",
        color: "#fce4ec",
        attributes: [
          { label: "Signal speed", value: "None — no FTL signalling" },
          { label: "Correlation speed", value: "Instantaneous" },
          { label: "Resolution", value: "Measurement, not signal" },
        ],
        note: "Although the correlation appears instantaneous regardless of separation, no information can be transmitted faster than light via entanglement. The measurement outcome at each site is individually random; only comparing both results reveals the correlation. Quantum non-locality violates local realism but preserves special relativity's prohibition on superluminal signalling.",
        fact: "Quantum teleportation uses entanglement to transfer a quantum state from one location to another — but still requires a classical channel to transmit 2 bits, preventing FTL communication.",
      },
    ],
  },
  {
    id: "uncertaintyPrinciple",
    name: "Uncertainty Principle",
    type: "Quantum Mechanics  ·  Heisenberg Relation",
    accent: "#f57c00",
    accentSoft: "#fff3e0",
    color: "#ffcc80",
    modelKind: "uncertaintyPrinciple",
    defaultFeature: "positionBasis",
    comparison: "electron",
    occurrence: {
      title: "A fundamental limit on nature, not measurement",
      body: "The Heisenberg uncertainty principle (1927) states that position and momentum cannot both be precisely defined simultaneously — not because of measurement disturbance, but because quantum states simply do not possess sharp values for complementary observables at once. The same trade-off applies to energy and time, and to any two non-commuting observables.",
      motif: "wave",
    },
    observations: [
      { label: "Electron Diffraction", tone: "#ffcc80", pattern: "deep-inelastic" },
      { label: "Momentum Spectroscopy", tone: "#f57c00", pattern: "particle-accelerator" },
      { label: "Atomic Force Microscopy", tone: "#e65100", pattern: "optical-photometry" },
    ],
    features: [
      {
        id: "positionBasis",
        name: "Position Localised",
        subtitle: "Narrow Gaussian → broad momentum spread",
        color: "#f57c00",
        attributes: [
          { label: "Δx", value: "Small (sharp spike)" },
          { label: "Δp", value: "Large (many frequencies)" },
          { label: "Wave packet", value: "Narrow, fast oscillation" },
        ],
        note: "A state localised in position is a narrow Gaussian wave packet. By Fourier analysis, a narrow packet requires a broad superposition of momentum eigenstates — high spatial frequency components. Squeezing the wave packet in position always forces the momentum spread to grow, so that Δx · Δp ≥ ℏ/2 is always satisfied.",
        fact: "The zero-point energy of the hydrogen atom's ground state arises directly from the uncertainty principle: confining the electron to a small region forces large kinetic energy fluctuations that balance the Coulomb attraction.",
      },
      {
        id: "momentumBasis",
        name: "Momentum Localised",
        subtitle: "Broad Gaussian → sharp momentum",
        color: "#ffb74d",
        attributes: [
          { label: "Δp", value: "Small (single frequency)" },
          { label: "Δx", value: "Large (spread everywhere)" },
          { label: "Wave packet", value: "Broad, slow oscillation" },
        ],
        note: "A state with a well-defined momentum is an extended sinusoidal wave — delocalised across all space. This is a pure momentum eigenstate: ψ(x) = e^(ipx/ℏ). It has zero momentum uncertainty but completely undefined position. Real quantum states are always intermediate Gaussian wave packets balancing both uncertainties.",
        fact: "The uncertainty principle applies to energy and time too: a quantum state that lasts a finite time Δt must have an energy spread ΔE ≥ ℏ/(2Δt). This is why excited atomic states have finite line widths — they decay after a finite lifetime.",
      },
      {
        id: "tradeoff",
        name: "Δx · Δp ≥ ℏ/2",
        subtitle: "The Robertson bound",
        color: "#ffe082",
        attributes: [
          { label: "Minimum product", value: "ℏ/2 = 5.27 × 10⁻³⁵ J·s" },
          { label: "Saturated by", value: "Gaussian wave packets" },
          { label: "Origin", value: "Non-commuting operators" },
        ],
        note: "The Heisenberg bound Δx · Δp ≥ ℏ/2 follows mathematically from the fact that position and momentum operators do not commute: [x̂, p̂] = iℏ. The inequality is saturated (exactly equal) only for Gaussian wave packets — the 'most classical' quantum states. All other states have a larger product.",
        fact: "Squeezed light — where Δx is pushed below the vacuum level at the cost of increased Δp — is used in LIGO to improve gravitational wave detection sensitivity beyond the standard quantum limit.",
      },
    ],
  },
  {
    id: "harmonicOscillator",
    name: "Quantum Harmonic Oscillator",
    type: "Quantum Mechanics  ·  Quantised Potential Well",
    accent: "#1565c0",
    accentSoft: "#e3f2fd",
    color: "#90caf9",
    modelKind: "harmonicOscillator",
    defaultFeature: "zeroPointEnergy",
    comparison: "hydrogenAtom",
    occurrence: {
      title: "The most important exactly solvable system",
      body: "The quantum harmonic oscillator describes any system near a stable equilibrium — a vibrating molecule, a photon mode in a cavity, a phonon in a crystal, or an ion in a trap. Its equally-spaced energy levels and creation/annihilation operator algebra underpin quantum field theory, which treats every fundamental particle as an excitation of a quantum harmonic oscillator.",
      motif: "wave",
    },
    observations: [
      { label: "Infrared Vibrational Spectroscopy", tone: "#90caf9", pattern: "optical-photometry" },
      { label: "Ion Trap Sideband Cooling", tone: "#1565c0", pattern: "xray-imaging" },
      { label: "Cavity QED Photon Counting", tone: "#0d47a1", pattern: "radio-telescope" },
    ],
    features: [
      {
        id: "zeroPointEnergy",
        name: "Zero-Point Energy",
        subtitle: "E₀ = ½ℏω (never truly at rest)",
        color: "#42a5f5",
        attributes: [
          { label: "Ground state energy", value: "E₀ = ½ℏω" },
          { label: "Classical minimum", value: "0 (at rest at bottom)" },
          { label: "Excess energy", value: "½ℏω above classical" },
        ],
        note: "Even in its ground state n=0 the quantum oscillator has energy ½ℏω — it cannot be at rest at the bottom of the potential. This zero-point energy follows directly from the uncertainty principle: a particle perfectly at rest with zero momentum would violate Δx·Δp ≥ ℏ/2. Zero-point fluctuations drive the Casimir effect and determine the vacuum energy of quantum fields.",
        fact: "Liquid helium never freezes at atmospheric pressure — even at absolute zero — because its zero-point kinetic energy exceeds the intermolecular binding energy. It can only solidify under ~25 atm of pressure.",
      },
      {
        id: "excitedStates",
        name: "Excited States",
        subtitle: "E_n = (n + ½)ℏω, equally spaced",
        color: "#1e88e5",
        attributes: [
          { label: "Energy levels", value: "E_n = (n+½)ℏω" },
          { label: "Level spacing", value: "ℏω (constant)" },
          { label: "Wavefunction nodes", value: "n zeros" },
        ],
        note: "Unlike the hydrogen atom, whose levels crowd together at higher n, the harmonic oscillator has perfectly equally-spaced energy levels — separated by exactly ℏω. Each level has a characteristic wavefunction with n nodes (zero crossings), described by the nth Hermite polynomial multiplied by a Gaussian envelope. This mathematical structure is the foundation of the photon number states in quantum optics.",
        fact: "The ladder operator formalism — creating/annihilating energy quanta by ℏω — invented to solve the harmonic oscillator became the mathematical backbone of all of quantum field theory and the concept of particle creation.",
      },
      {
        id: "classicalTurningPoints",
        name: "Classical Turning Points",
        subtitle: "Where the wavefunction leaks past",
        color: "#90caf9",
        attributes: [
          { label: "Classical limit", value: "x = ±√(2E_n/mω²)" },
          { label: "QM behaviour", value: "Wavefunction extends beyond" },
          { label: "Tunnelling tail", value: "Exponential decay outside" },
        ],
        note: "A classical oscillator turns around at the point where all its energy is potential and kinetic energy is zero. The quantum wavefunction extends beyond these turning points — the particle has a non-zero probability of being found in the classically forbidden region. This is quantum tunnelling applied to the harmonic potential, and is the same effect that allows alpha decay in nuclei.",
        fact: "At very high quantum numbers (large n), the probability density of the quantum harmonic oscillator approaches the classical distribution — peaking near the turning points where a classical oscillator moves most slowly. This is Bohr's correspondence principle in action.",
      },
    ],
  },
];

export function getCosmicObjectById(id: string): CosmicObject {
  const found = cosmicObjects.find((o) => o.id === id);
  if (!found) throw new Error(`CosmicObject not found: ${id}`);
  return found;
}
