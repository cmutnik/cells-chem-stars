export type CosmicKind =
  | "mainStar"
  | "neutronStar"
  | "blackHole"
  | "exoplanet"
  | "galaxy"
  | "binaryStar";

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
    id: "mainStar",
    name: "Main-Sequence Star",
    type: "Astrophysics  ·  G2V  ·  ~1 M☉",
    accent: "#ffb300",
    accentSoft: "#fff8e1",
    color: "#ffe082",
    modelKind: "mainStar",
    defaultFeature: "coreFusion",
    comparison: "neutronStar",
    occurrence: {
      title: "Sun-like stars: the most common stable type",
      body: "G-type main-sequence stars like the Sun account for about 7% of stars in the Milky Way. They occupy the stable 'main sequence' on the Hertzsprung-Russell diagram, where they spend 90% of their total lifespan burning hydrogen in their cores.",
      motif: "star",
    },
    observations: [
      { label: "Optical (photosphere)", tone: "#ffe082", pattern: "optical-photometry" },
      { label: "EUV / X-ray (corona)", tone: "#ff8f00", pattern: "xray-imaging" },
      { label: "Helioseismology", tone: "#ffb300", pattern: "radio-telescope" },
    ],
    features: [
      {
        id: "coreFusion",
        name: "Fusion Core",
        subtitle: "The hydrogen-burning engine",
        color: "#ffb300",
        attributes: [
          { label: "Temperature", value: "~15 × 10⁶ K" },
          { label: "Extent", value: "~25% radius" },
          { label: "Reaction", value: "p-p chain" },
        ],
        note: "In the Sun's core, hydrogen nuclei fuse into helium under extreme temperature and pressure, converting 4.3 million tonnes of mass into energy every second. Hydrostatic equilibrium — gravity inward, radiation pressure outward — keeps the star stable for billions of years.",
        fact: "The Sun has burned through half its hydrogen in 4.6 billion years. In ~5 billion more years it will expand into a red giant, engulfing the inner planets.",
      },
      {
        id: "radiativeZone",
        name: "Radiative Zone",
        subtitle: "The photon-scattering layer",
        color: "#ff8f00",
        attributes: [
          { label: "Extent", value: "0.25–0.7 R☉" },
          { label: "Transfer", value: "Radiation (random walk)" },
          { label: "Photon travel time", value: "~100,000 years" },
        ],
        note: "Energy moves outward as photons that scatter off electrons and ions in a random walk. A photon may travel only ~1 cm before deflecting; cumulatively this tortuous path means a photon takes around 100,000 years to cross this zone.",
        fact: "Neutrinos from the fusion core pass through the entire Sun in about two seconds — neutrinos interact so weakly that the Sun is essentially transparent to them.",
      },
      {
        id: "convectiveZone",
        name: "Convective Zone",
        subtitle: "The plasma conveyor belt",
        color: "#ef6c00",
        attributes: [
          { label: "Extent", value: "0.7–1.0 R☉" },
          { label: "Transfer", value: "Convection" },
          { label: "Cell size", value: "~1,000 km (granules)" },
        ],
        note: "In the outer 30% of the Sun's radius, the plasma cools enough for convection to dominate. Hot plasma rises, delivers energy to the surface as granules ~1,000 km across, then sinks. This convection also drives the Sun's magnetic dynamo.",
        fact: "The Sun's magnetic field reverses polarity roughly every 11 years, driven by differential rotation and convection — governing sunspot activity and space weather.",
      },
      {
        id: "corona",
        name: "Corona",
        subtitle: "The mysteriously hot outer atmosphere",
        color: "#ffe082",
        attributes: [
          { label: "Temperature", value: "1–3 × 10⁶ K" },
          { label: "Density", value: "~10⁻¹³ g/cm³" },
          { label: "Extent", value: "Millions of km" },
        ],
        note: "The corona is paradoxically hotter than the photosphere below it — a million degrees versus 5,778 K. This violates intuition and remains an open research problem. Magnetic reconnection events and Alfvén waves are the leading suspects.",
        fact: "The corona is only visible from Earth during total solar eclipses — it is outshone by the photosphere by a factor of a million under normal conditions.",
      },
    ],
  },
  {
    id: "neutronStar",
    name: "Neutron Star",
    type: "Astrophysics  ·  Pulsar  ·  ~1.4 M☉",
    accent: "#00acc1",
    accentSoft: "#e0f7fa",
    color: "#80deea",
    modelKind: "neutronStar",
    defaultFeature: "neutronCore",
    comparison: "mainStar",
    occurrence: {
      title: "Remnants of massive stellar deaths",
      body: "Neutron stars form when massive stars (8–20 M☉) exhaust their nuclear fuel and their cores collapse in a supernova explosion. The collapse takes less than a second, releasing more energy than the Sun will emit in its entire lifetime. An estimated ~100 million neutron stars exist in the Milky Way.",
      motif: "pulse",
    },
    observations: [
      { label: "Radio (pulse timing)", tone: "#80deea", pattern: "radio-telescope" },
      { label: "X-ray (hot surface)", tone: "#00acc1", pattern: "xray-imaging" },
      { label: "Gravitational Waves", tone: "#0288d1", pattern: "gravitational-wave" },
    ],
    features: [
      {
        id: "neutronCore",
        name: "Neutron Core",
        subtitle: "Degenerate nuclear matter",
        color: "#00acc1",
        attributes: [
          { label: "Density", value: "~5 × 10¹⁴ g/cm³" },
          { label: "Radius", value: "~10 km" },
          { label: "Mass", value: "~1.4–2 M☉" },
        ],
        note: "A neutron star's core is composed of neutrons packed so tightly that a teaspoon would weigh about a billion tonnes. Electrons and protons have been compressed together via inverse beta decay, and the pressure is supported by neutron degeneracy pressure — a quantum mechanical effect.",
        fact: "The most massive neutron stars (~2 M☉) challenge our understanding of nuclear matter. Above about 3 M☉ no known force can halt collapse into a black hole.",
      },
      {
        id: "magnetosphere",
        name: "Magnetosphere",
        subtitle: "The extreme magnetic field",
        color: "#0288d1",
        attributes: [
          { label: "Field strength", value: "10⁸–10¹⁵ T" },
          { label: "Earth comparison", value: "~5×10⁻⁵ T" },
          { label: "Source", value: "Magnetic flux conservation" },
        ],
        note: "When a star collapses, its magnetic flux is conserved but compressed into a tiny volume. Neutron stars have the strongest magnetic fields known in the universe. Magnetars — a subclass — have fields up to 10¹¹ T, strong enough to distort electron orbitals at a distance of 1,000 km.",
        fact: "A magnetar at the distance of the Moon would erase every credit card on Earth and could disrupt atomic physics at a range of several thousand km.",
      },
      {
        id: "pulseBeam",
        name: "Pulse Beam",
        subtitle: "The radio lighthouse",
        color: "#00838f",
        attributes: [
          { label: "Rotation", value: "ms to seconds" },
          { label: "Beam", value: "Along magnetic poles" },
          { label: "Precision", value: "Rivals atomic clocks" },
        ],
        note: "Charged particles accelerate in the intense magnetic field and radiate beams of radio waves along the magnetic poles. If those poles sweep past Earth, we detect regular pulses. The first pulsar (1967) was initially nicknamed 'LGM-1' because its regularity seemed artificial.",
        fact: "Millisecond pulsars spin hundreds of times per second and are used as a natural gravitational-wave detector network called the Pulsar Timing Array.",
      },
    ],
  },
  {
    id: "blackHole",
    name: "Black Hole",
    type: "Astrophysics  ·  Stellar Mass  ·  ~10 M☉",
    accent: "#546e7a",
    accentSoft: "#eceff1",
    color: "#90a4ae",
    modelKind: "blackHole",
    defaultFeature: "eventHorizon",
    comparison: "neutronStar",
    occurrence: {
      title: "Endpoints of stellar evolution, engines of galaxies",
      body: "Stellar black holes form from the collapsed cores of the most massive stars. Supermassive black holes — millions to billions of solar masses — lurk at the centres of almost every large galaxy. The Milky Way's own Sgr A* was imaged by the Event Horizon Telescope in 2022.",
      motif: "void",
    },
    observations: [
      { label: "X-ray Binary", tone: "#90a4ae", pattern: "xray-imaging" },
      { label: "EHT (mm-wave VLBI)", tone: "#546e7a", pattern: "vlbi-imaging" },
      { label: "Gravitational Waves", tone: "#607d8b", pattern: "gravitational-wave" },
    ],
    features: [
      {
        id: "eventHorizon",
        name: "Event Horizon",
        subtitle: "The point of no return",
        color: "#546e7a",
        attributes: [
          { label: "Radius (10 M☉)", value: "~30 km" },
          { label: "Formula", value: "rs = 2GM/c²" },
          { label: "Hawking temp.", value: "~10⁻⁷ K" },
        ],
        note: "The event horizon is not a physical surface but a mathematical boundary where escape velocity equals c. Nothing — not even light — that crosses inward can return. From a distant observer, infalling objects appear to freeze and redshift to invisibility.",
        fact: "If the Sun were compressed to a black hole it would be about 6 km across — 228,000 times smaller — but the orbits of the planets would be entirely unchanged.",
      },
      {
        id: "accretionDisk",
        name: "Accretion Disk",
        subtitle: "The swirling matter vortex",
        color: "#b0bec5",
        attributes: [
          { label: "Temperature (inner)", value: "~10⁷ K" },
          { label: "Luminosity", value: "Up to 40% mass-energy" },
          { label: "Rotation", value: "Keplerian" },
        ],
        note: "Gas spiraling into a black hole forms a flat, rapidly rotating disk heated by viscous friction and magnetic turbulence. The inner edge sits at the innermost stable circular orbit (ISCO) — 3rs for a non-spinning black hole — the most efficient power source known outside matter-antimatter annihilation.",
        fact: "The M87* accretion disk, imaged by the Event Horizon Telescope in 2019, is powered by a black hole of 6.5 billion solar masses and is brighter than most entire galaxies.",
      },
      {
        id: "jet",
        name: "Relativistic Jet",
        subtitle: "The bipolar energy beam",
        color: "#78909c",
        attributes: [
          { label: "Speed", value: "~0.99c" },
          { label: "Length", value: "Thousands of light-years" },
          { label: "Power", value: "~10³⁸ W" },
        ],
        note: "Magnetic field lines threading the accretion disk and spinning black hole extract rotational energy (Blandford-Znajek mechanism) and collimate plasma into two opposed jets perpendicular to the disk. These jets can extend thousands of light-years and regulate star formation in the surrounding galaxy.",
        fact: "Supermassive black hole jets are thought to quench star formation in massive elliptical galaxies by heating surrounding gas, preventing it from cooling enough to collapse into stars.",
      },
      {
        id: "photonSphere",
        name: "Photon Sphere",
        subtitle: "The orbit of captured light",
        color: "#607d8b",
        attributes: [
          { label: "Radius", value: "1.5 rs (3GM/c²)" },
          { label: "Stability", value: "Unstable orbit" },
          { label: "Effect", value: "Gravitational lensing ring" },
        ],
        note: "Light grazing the photon sphere enters an unstable circular orbit. Photons slightly inside spiral in; those outside escape. This shell of orbiting photons produces the bright ring seen in the Event Horizon Telescope image — the accretion disk on the far side, lensed around the black hole.",
        fact: "An observer at the photon sphere would see the back of their own head — light from them can orbit the black hole and return.",
      },
    ],
  },
  {
    id: "exoplanet",
    name: "Exoplanet",
    type: "Astronomy  ·  Hot Jupiter  ·  ~1 MJ",
    accent: "#43a047",
    accentSoft: "#e8f5e9",
    color: "#a5d6a7",
    modelKind: "exoplanet",
    defaultFeature: "atmosphere",
    comparison: "mainStar",
    occurrence: {
      title: "Billions of worlds in the Milky Way",
      body: "Statistical studies from the Kepler mission suggest that virtually every star hosts at least one planet. Roughly 20–50% of Sun-like stars have an Earth-sized planet in their habitable zone. As of 2025, over 5,700 exoplanets have been confirmed.",
      motif: "orbit",
    },
    observations: [
      { label: "Transit Photometry", tone: "#a5d6a7", pattern: "transit-curve" },
      { label: "Radial Velocity", tone: "#43a047", pattern: "radio-telescope" },
      { label: "Direct Imaging", tone: "#1b5e20", pattern: "optical-photometry" },
    ],
    features: [
      {
        id: "atmosphere",
        name: "Atmosphere",
        subtitle: "The thermal envelope",
        color: "#43a047",
        attributes: [
          { label: "Composition", value: "H₂ / He / H₂O traces" },
          { label: "Day-side temp.", value: "~1,000–2,500 K" },
          { label: "Detection", value: "Transmission spectroscopy" },
        ],
        note: "Hot Jupiters orbit so close to their stars (< 0.1 AU) that stellar irradiation heats their atmospheres to thousands of degrees. Transmission spectroscopy — measuring which wavelengths of stellar light are absorbed as the planet transits — reveals atmospheric composition.",
        fact: "The James Webb Space Telescope detected CO₂ absorption in an exoplanet atmosphere in 2022, demonstrating the technique that could eventually identify biosignatures on Earth-like worlds.",
      },
      {
        id: "orbitRing",
        name: "Orbital Path",
        subtitle: "The transit geometry",
        color: "#1b5e20",
        attributes: [
          { label: "Period (Hot Jupiter)", value: "1–5 days" },
          { label: "Semi-major axis", value: "0.03–0.1 AU" },
          { label: "Inclination", value: "~90° for transits" },
        ],
        note: "The transit method — measuring the dimming of a star as a planet passes in front of it — has discovered the majority of confirmed exoplanets. Only orbits with inclination near 90° (edge-on) are detectable from Earth. The Kepler space telescope discovered over 2,600 planets this way.",
        fact: "TRAPPIST-1, a red dwarf 40 light-years away, hosts seven Earth-sized planets, three in the habitable zone — the largest such system known.",
      },
      {
        id: "hostStar",
        name: "Host Star",
        subtitle: "The gravitational anchor",
        color: "#8bc34a",
        attributes: [
          { label: "RV wobble", value: "~10–100 m/s" },
          { label: "Transit depth", value: "~1% (Jupiter)" },
          { label: "Method", value: "Doppler + photometry" },
        ],
        note: "The host star is gravitationally central but also the primary scientific instrument — its light, absorbed and re-emitted by the planetary atmosphere, carries spectral information about composition. The star's wobble independently confirms mass; combined with transit data this gives bulk density.",
        fact: "51 Pegasi b (1995) was the first confirmed exoplanet around a Sun-like star, triggering a revolution that ultimately led to the 2019 Nobel Prize in Physics.",
      },
    ],
  },
  {
    id: "galaxy",
    name: "Spiral Galaxy",
    type: "Astronomy  ·  Sb Type  ·  ~10¹¹ M☉",
    accent: "#ab47bc",
    accentSoft: "#f3e5f5",
    color: "#ce93d8",
    modelKind: "galaxy",
    defaultFeature: "spiralArms",
    comparison: "blackHole",
    occurrence: {
      title: "Hundreds of billions of galaxies in the observable universe",
      body: "Galaxies are the fundamental building blocks of large-scale cosmic structure. The observable universe contains an estimated 2 trillion galaxies. They cluster in groups, superclusters, and the cosmic web of filaments and voids that emerges from primordial density fluctuations.",
      motif: "spiral",
    },
    observations: [
      { label: "Optical (Hubble)", tone: "#ce93d8", pattern: "optical-photometry" },
      { label: "Radio 21-cm (HI)", tone: "#ab47bc", pattern: "radio-telescope" },
      { label: "X-ray (hot gas / AGN)", tone: "#7b1fa2", pattern: "xray-imaging" },
    ],
    features: [
      {
        id: "spiralArms",
        name: "Spiral Arms",
        subtitle: "The density-wave structure",
        color: "#ab47bc",
        attributes: [
          { label: "Arms", value: "2–4 major arms" },
          { label: "Width", value: "~1,000 light-years" },
          { label: "Origin", value: "Density wave theory" },
        ],
        note: "Spiral arms are not material structures rotating with the galaxy; they are density waves — regions of slightly higher gravitational potential that travel more slowly than the stars and gas. Stars passing through an arm are compressed, triggering star formation. The bright blue appearance comes from newly formed massive stars.",
        fact: "The Milky Way has four main spiral arms. Our Solar System sits between the Orion and Perseus arms in the Orion Spur, about 26,000 light-years from the galactic centre.",
      },
      {
        id: "centralBulge",
        name: "Central Bulge",
        subtitle: "The dense stellar nucleus",
        color: "#7b1fa2",
        attributes: [
          { label: "Size", value: "~10,000 ly radius" },
          { label: "Stars", value: "Old (Pop. II), red/yellow" },
          { label: "Core", value: "Supermassive black hole" },
        ],
        note: "The central bulge is an older, spherical concentration of mostly red and yellow Population II stars that formed early in the galaxy's history. At its core sits a supermassive black hole whose mass correlates tightly with bulge properties — suggesting co-evolution of black holes and galaxies over cosmic time.",
        fact: "Sgr A*, the Milky Way's central black hole, has a mass of 4 million solar masses but an event horizon smaller than Mercury's orbit. It was imaged by the EHT in 2022.",
      },
      {
        id: "darkMatterHalo",
        name: "Dark Matter Halo",
        subtitle: "The invisible gravitational scaffold",
        color: "#4a148c",
        attributes: [
          { label: "Mass fraction", value: "~90% of total" },
          { label: "Extent", value: "10× disk diameter" },
          { label: "Detection", value: "Rotation curves" },
        ],
        note: "Galaxy rotation curves remain flat far beyond where visible matter ends, implying a large invisible mass distribution extending spherically around the galaxy. This dark matter halo provides the gravitational scaffolding in which the visible disk is embedded.",
        fact: "Fritz Zwicky first inferred dark matter in 1933; Vera Rubin and Kent Ford confirmed it in spiral galaxies in the 1970s. Its nature remains one of the biggest open questions in physics.",
      },
      {
        id: "diskStars",
        name: "Stellar Disk",
        subtitle: "The rotating galactic plane",
        color: "#ce93d8",
        attributes: [
          { label: "Thickness", value: "~1,000 ly (thin disk)" },
          { label: "Diameter", value: "~100,000 light-years" },
          { label: "Composition", value: "Stars + gas + dust" },
        ],
        note: "The thin stellar disk is where most star formation and spiral structure occurs. It is embedded in a thicker, older stellar population (the thick disk) and surrounded by the dark matter halo. The gas fraction decreases as galaxies age as cold gas is consumed by star formation or expelled by stellar feedback.",
        fact: "The Milky Way forms roughly 1–3 new stars per year — a relatively low rate compared to starburst galaxies, which can form hundreds of solar masses of stars per year.",
      },
    ],
  },
  {
    id: "binaryStar",
    name: "Binary Star System",
    type: "Astrophysics  ·  Algol-type  ·  ~2–5 M☉",
    accent: "#ff7043",
    accentSoft: "#fbe9e7",
    color: "#ffab91",
    modelKind: "binaryStar",
    defaultFeature: "primaryStar",
    comparison: "mainStar",
    occurrence: {
      title: "More than half of all stars have a companion",
      body: "Binary and multiple star systems are the rule, not the exception — over 50% of Sun-like stars and up to 80% of massive stars reside in multi-star systems. They form when a collapsing molecular cloud fragments into two or more clumps. Close binaries can exchange mass, producing exotic outcomes like X-ray binaries, cataclysmic variables, and Type Ia supernovae.",
      motif: "orbit",
    },
    observations: [
      { label: "Spectroscopic (radial velocity)", tone: "#ff7043", pattern: "optical-photometry" },
      { label: "Photometric (eclipses)", tone: "#ffab91", pattern: "radio-telescope" },
      { label: "X-ray (mass transfer)", tone: "#bf360c", pattern: "xray-imaging" },
    ],
    features: [
      {
        id: "primaryStar",
        name: "Primary Star",
        subtitle: "The more massive companion",
        color: "#ff7043",
        attributes: [
          { label: "Mass", value: "~2–5 M☉" },
          { label: "Type", value: "A/F main-sequence or subgiant" },
          { label: "Orbital period", value: "Days to years" },
        ],
        note: "In a binary system the more massive star evolves faster, expanding into a subgiant or giant while the secondary is still on the main sequence. When the primary's outer envelope overflows its Roche lobe — the teardrop-shaped gravitational boundary — mass streams onto the companion, altering both stars' evolutionary tracks.",
        fact: "Algol (β Persei), the original 'demon star', is a semi-detached eclipsing binary just 90 light-years away. Its periodic dimming was understood by John Goodricke in 1783, making it the first binary explained scientifically.",
      },
      {
        id: "secondaryStar",
        name: "Secondary Star",
        subtitle: "The lower-mass companion",
        color: "#ffccbc",
        attributes: [
          { label: "Mass", value: "~0.8–2 M☉" },
          { label: "Type", value: "G/K main-sequence" },
          { label: "Separation", value: "0.1–10 AU (close pair)" },
        ],
        note: "The secondary star orbits the common centre of mass (barycentre) and may be a mass gainer in a semi-detached system. Accreted material spins it up, and the influx of hydrogen-rich gas can dramatically change its surface composition and luminosity. In some systems the secondary eventually surpasses the primary in mass — a reversal called the Algol paradox.",
        fact: "The Algol paradox puzzled astronomers for decades: in Algol the less evolved star is the more massive one, seemingly violating stellar evolution theory. Mass transfer is the resolution.",
      },
      {
        id: "rocheLobes",
        name: "Roche Lobes",
        subtitle: "Gravitational equipotential surfaces",
        color: "#ff8a65",
        attributes: [
          { label: "Shape", value: "Teardrop (touching at L1)" },
          { label: "Lagrange point", value: "L1 between the stars" },
          { label: "Overflow condition", value: "Star radius ≥ Roche radius" },
        ],
        note: "The Roche lobe is the critical equipotential surface around each star within which material is gravitationally bound to that star. Where the two lobes touch — the inner Lagrange point L1 — is the gateway for mass transfer. A detached binary has both stars well within their lobes; a semi-detached binary has one star filling its lobe; a contact binary has both stars overflowing, sharing a common envelope.",
        fact: "Édouard Roche derived the tidal radius limit in 1848, originally in the context of why moons don't aggregate too close to planets — the same mathematics governs mass transfer in binary stars.",
      },
      {
        id: "accretionStream",
        name: "Accretion Stream",
        subtitle: "Mass transfer between the stars",
        color: "#bf360c",
        attributes: [
          { label: "Transfer rate", value: "10⁻⁹–10⁻⁷ M☉ / yr" },
          { label: "Velocity", value: "Hundreds of km/s" },
          { label: "Temperature", value: "Up to 10⁵ K (disk rim)" },
        ],
        note: "Gas escaping through L1 forms a narrow stream that spirals into an accretion disk around the mass-gaining star. Viscous dissipation in the disk converts gravitational potential energy to heat and light — in X-ray binaries where the accretor is a neutron star or black hole, this process is extraordinarily efficient, radiating more energy per kilogram than nuclear fusion.",
        fact: "In a Type Ia supernova scenario, a white dwarf accretes mass from a companion until it reaches the Chandrasekhar limit (~1.4 M☉) and undergoes thermonuclear detonation — producing a 'standard candle' used to measure cosmic expansion.",
      },
    ],
  },
];

export function getCosmicObjectById(id: string): CosmicObject {
  const found = cosmicObjects.find((o) => o.id === id);
  if (!found) throw new Error(`CosmicObject not found: ${id}`);
  return found;
}
