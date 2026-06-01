import {
  ArrowRight,
  BookOpen,
  Box,
  Brain,
  Camera,
  ChevronDown,
  CircleDot,
  Telescope,
  Gauge,
  EyeOff,
  Grid3X3,
  Heart,
  Info,
  MessageCircle,
  Library,
  Plus,
  RotateCcw,
  Settings,
  Sparkles,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { CosmicScene } from "./components/CellScene";
import { cosmicObjects, getCosmicObjectById, type CosmicObject, type ViewMode } from "./data/cosmicObjects";

type ModeOption = {
  id: ViewMode;
  label: string;
  Icon: LucideIcon;
};

const modeOptions: ModeOption[] = [
  { id: "mesh", label: "Mesh", Icon: Box },
  { id: "focus", label: "Focus", Icon: CircleDot },
];

const initialObject = getCosmicObjectById("mainStar");

function Header({ object }: { object: CosmicObject }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-orb" aria-hidden="true">
          <Sparkles size={26} />
        </div>
        <div>
          <h1>Astronomy Explorer</h1>
          <p>Explore stars, black holes, and galaxies</p>
        </div>
      </div>

      <nav className="top-nav" aria-label="Primary">
        <a href="#gallery">
          <Grid3X3 size={24} />
          <span>Gallery</span>
        </a>
        <a href="#library">
          <Library size={24} />
          <span>Library</span>
        </a>
        <a href="#notebooks">
          <BookOpen size={24} />
          <span>Notebooks</span>
        </a>
        <a href="#settings">
          <Settings size={24} />
          <span>Settings</span>
        </a>
        <button className="avatar-button" type="button" aria-label="User menu">
          <span className="avatar-core" style={{ background: object.accentSoft }}>
            <span style={{ background: object.accent }} />
          </span>
          <ChevronDown size={20} />
        </button>
      </nav>
    </header>
  );
}

type SidebarProps = {
  selectedObject: CosmicObject;
  activeFeature: string;
  favorites: Set<string>;
  onSelectObject: (id: string) => void;
  onSelectFeature: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

function MiniObject({ object }: { object: CosmicObject }) {
  return (
    <span className={`mini-cell mini-cell-${object.modelKind}`} style={{ "--thumb": object.accent } as CSSProperties}>
      <span />
      <i />
      <b />
    </span>
  );
}

function Sidebar({
  selectedObject,
  activeFeature,
  favorites,
  onSelectObject,
  onSelectFeature,
  onToggleFavorite,
}: SidebarProps) {
  return (
    <aside className="left-rail">
      <section className="panel cell-type-panel">
        <div className="panel-heading">
          <span>
            <Telescope size={18} />
            Objects
          </span>
          <ChevronDown size={18} />
        </div>

        <div className="cell-list">
          {cosmicObjects.map((object) => {
            const selected = selectedObject.id === object.id;
            return (
              <button
                className={`cell-row ${selected ? "is-active" : ""}`}
                type="button"
                key={object.id}
                onClick={() => onSelectObject(object.id)}
              >
                <MiniObject object={object} />
                <span className="cell-row-copy">
                  <strong>{object.name}</strong>
                  <span>{object.type}</span>
                </span>
                <span
                  className={`favorite-dot ${favorites.has(object.id) ? "is-on" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite(object.id);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Favorite ${object.name}`}
                >
                  <Star size={18} fill="currentColor" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel organelle-panel">
        <div className="panel-heading">
          <span>
            <Sparkles size={16} />
            Features
          </span>
          <ChevronDown size={18} />
        </div>

        <div className="organelle-list">
          {selectedObject.features.map((feature) => (
            <button
              className={`organelle-row ${activeFeature === feature.id ? "is-active" : ""}`}
              type="button"
              key={feature.id}
              onClick={() => onSelectFeature(feature.id)}
            >
              <span className="color-dot" style={{ background: feature.color }} />
              <span>{feature.name}</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}

type StageProps = {
  object: CosmicObject;
  activeFeature: string;
  viewMode: ViewMode;
  crossSection: boolean;
  autoRotate: boolean;
  resetKey: number;
  activeObservation: string | null;
  onModeChange: (mode: ViewMode) => void;
  onCrossSectionChange: (value: boolean) => void;
  onAutoRotateChange: (value: boolean) => void;
  onReset: () => void;
  onToast: (message: string) => void;
};

function Stage({
  object,
  activeFeature,
  viewMode,
  crossSection,
  autoRotate,
  resetKey,
  activeObservation,
  onModeChange,
  onCrossSectionChange,
  onAutoRotateChange,
  onReset,
  onToast,
}: StageProps) {
  return (
    <main className="stage-column">
      <section className="stage-panel">
        <div className="stage-title">
          <div>
            <h2>{object.name}</h2>
            <p>{object.type}</p>
          </div>

          <div className="view-card">
            <span>View Mode</span>
            <div className="mode-switcher">
              {modeOptions.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={viewMode === id ? "is-active" : ""}
                  onClick={() => onModeChange(id)}
                  title={label}
                >
                  <Icon size={22} />
                </button>
              ))}
            </div>
            <label className="toggle-line">
              <span>Cross Section</span>
              <input
                type="checkbox"
                checked={crossSection}
                onChange={(event) => onCrossSectionChange(event.target.checked)}
              />
              <i />
            </label>
          </div>
        </div>

        <div className="canvas-wrap">
          <CosmicScene
            object={object}
            activeFeature={activeFeature}
            viewMode={viewMode}
            crossSection={crossSection}
            autoRotate={autoRotate}
            resetKey={resetKey}
            activeObservation={activeObservation}
          />
        </div>

        <div className="stage-toolbar">
          <button
            type="button"
            className={autoRotate ? "is-active" : ""}
            onClick={() => onAutoRotateChange(!autoRotate)}
          >
            <RotateCcw size={20} />
            Rotate
          </button>
          <button type="button" onClick={() => onModeChange("focus")}>
            <CircleDot size={20} />
            Isolate
          </button>
          <button type="button" onClick={() => onModeChange("focus")}>
            <EyeOff size={20} />
            Hide Others
          </button>
          <button type="button" onClick={onReset}>
            <RotateCcw size={20} />
            Reset View
          </button>
        </div>

        <div className="export-toolbar">
          <button type="button" onClick={() => onToast("Screenshot feature coming soon.")}>
            <Camera size={20} />
            Screenshot
          </button>
          <button type="button" onClick={() => onToast("GLB export pipeline not yet connected.")}>
            <Box size={20} />
            GLB Export
          </button>
        </div>
      </section>
    </main>
  );
}

type RightPanelProps = {
  object: CosmicObject;
  activeFeature: string;
  favorites: Set<string>;
  mastery: number;
  viewedObjectCount: number;
  viewedFeatureCount: number;
  totalFeatureCount: number;
  tutorPrompt: string;
  onToggleFavorite: (id: string) => void;
  onTutorPrompt: (prompt: string) => void;
};

function buildTutorPrompts(object: CosmicObject, feature: CosmicObject["features"][number]) {
  return [
    `Explain ${feature.name} in ${object.name} and its physical significance.`,
    `Quiz me on the observational differences between ${object.name} and ${getCosmicObjectById(object.comparison).name}.`,
    `Guide me through identifying ${feature.name} in the 3D visualization.`,
  ];
}

function RightPanel({
  object,
  activeFeature,
  favorites,
  mastery,
  viewedObjectCount,
  viewedFeatureCount,
  totalFeatureCount,
  tutorPrompt,
  onToggleFavorite,
  onTutorPrompt,
}: RightPanelProps) {
  const feature = object.features.find((item) => item.id === activeFeature) ?? object.features[0];
  const tutorPrompts = buildTutorPrompts(object, feature);

  return (
    <aside className="right-rail">
      <section className="panel details-panel">
        <div className="panel-heading detail-heading">
          <span>Feature Details</span>
          <button type="button" onClick={() => onToggleFavorite(object.id)} aria-label="Toggle favorite">
            <Heart size={22} fill={favorites.has(object.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="detail-hero">
          <span className="organelle-orb" style={{ background: feature.color }} />
          <div>
            <h3>{feature.name}</h3>
            <p>{feature.subtitle}</p>
          </div>
        </div>

        <dl className="attribute-list">
          {feature.attributes.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          <div>
            <dt>Highlight</dt>
            <dd>
              <span className="mini-toggle is-on" />
              <span className="detail-dot" style={{ background: feature.color }} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel notes-panel">
        <div className="panel-heading">
          <span>Astrophysical Notes</span>
        </div>
        <p>{feature.note}</p>
        <div className="fun-fact">
          <span>Fun Fact: {feature.fact}</span>
          <Sparkles size={18} />
        </div>
      </section>

      <section className="panel learning-panel">
        <div className="panel-heading">
          <span>
            <Brain size={17} />
            AI Tutor
          </span>
        </div>

        <div className="mastery-meter" style={{ "--progress": `${mastery}%` } as CSSProperties}>
          <div>
            <Gauge size={18} />
            <span>Mastery</span>
            <strong>{mastery}%</strong>
          </div>
          <i>
            <b />
          </i>
          <small>
            {viewedObjectCount}/{cosmicObjects.length} objects explored · {viewedFeatureCount}/{totalFeatureCount} features inspected
          </small>
        </div>

        <div className="lesson-focus">
          <span>
            <Target size={17} />
            Current lesson focus
          </span>
          <p>
            Identify <strong>{feature.name}</strong>, describe its physics, then compare it to the equivalent feature in{" "}
            {getCosmicObjectById(object.comparison).name}.
          </p>
        </div>

        <div className="tutor-prompt">
          <span>
            <MessageCircle size={17} />
            Prompt staged for AI tutor
          </span>
          <p>{tutorPrompt}</p>
        </div>

        <div className="prompt-list">
          {tutorPrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => onTutorPrompt(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="panel occurrence-panel">
        <div className="panel-heading">
          <span>Found In</span>
        </div>
        <div className={`occurrence-art occurrence-${object.occurrence.motif}`}>
          <span />
          <i />
          <b />
        </div>
        <h4>{object.occurrence.title}</h4>
        <p>{object.occurrence.body}</p>
      </section>
    </aside>
  );
}

type BottomPanelsProps = {
  object: CosmicObject;
  activeObservation: string | null;
  onObservationChange: (pattern: string) => void;
  onCompare: () => void;
  onToast: (message: string) => void;
};

function BottomPanels({ object, activeObservation, onObservationChange, onCompare, onToast }: BottomPanelsProps) {
  const comparedObject = getCosmicObjectById(object.comparison);

  return (
    <section className="bottom-grid">
      <div className="panel microscope-panel">
        <div className="panel-heading">
          <span>
            Observations
            <Info size={16} />
          </span>
        </div>
        <div className="micro-card-row">
          {object.observations.map((image) => (
            <button
              type="button"
              key={image.label}
              className={`micro-card pattern-${image.pattern}${activeObservation === image.pattern ? " is-active" : ""}`}
              style={{ "--micro": image.tone } as CSSProperties}
              onClick={() => onObservationChange(image.pattern)}
            >
              <span />
              <strong>{image.label}</strong>
            </button>
          ))}
          <button type="button" className="micro-card add-card" onClick={() => onToast("Method upload is a planned feature.")}>
            <Plus size={28} />
            <strong>Add Method</strong>
          </button>
        </div>
      </div>

      <div className="panel compare-panel">
        <div className="panel-heading">
          <span>
            Compare Objects
            <Info size={16} />
          </span>
        </div>
        <div className="compare-row">
          <div>
            <MiniObject object={object} />
            <span>
              <strong>{object.name}</strong>
              <em>You are here</em>
            </span>
          </div>
          <b>VS</b>
          <div>
            <span>
              <strong>{comparedObject.name}</strong>
              <em>{comparedObject.type}</em>
            </span>
            <MiniObject object={comparedObject} />
          </div>
        </div>
        <button type="button" className="comparison-button" onClick={onCompare}>
          Open Comparison View
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

type ComparisonModalProps = {
  object: CosmicObject;
  open: boolean;
  onClose: () => void;
};

function ComparisonModal({ object, open, onClose }: ComparisonModalProps) {
  const comparedObject = getCosmicObjectById(object.comparison);
  if (!open) {
    return null;
  }

  const currentFeature = object.features.find((item) => item.id === object.defaultFeature) ?? object.features[0];
  const comparedFeature =
    comparedObject.features.find((item) => item.id === comparedObject.defaultFeature) ?? comparedObject.features[0];

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Cosmic object comparison">
      <div className="comparison-modal">
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
        <div className="comparison-modal-head">
          <h3>Comparison View</h3>
          <p>
            {object.name} compared with {comparedObject.name}
          </p>
        </div>
        <div className="comparison-columns">
          {[object, comparedObject].map((item) => {
            const feature = item.id === object.id ? currentFeature : comparedFeature;
            return (
              <section key={item.id}>
                <MiniObject object={item} />
                <h4>{item.name}</h4>
                <p>{item.type}</p>
                <dl>
                  <div>
                    <dt>Key feature</dt>
                    <dd>{feature.name}</dd>
                  </div>
                  <div>
                    <dt>Description</dt>
                    <dd>{feature.subtitle}</dd>
                  </div>
                  <div>
                    <dt>Found in</dt>
                    <dd>{item.occurrence.title}</dd>
                  </div>
                </dl>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Toast({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }
  return <div className="toast">{message}</div>;
}

export default function App() {
  const [selectedObjectId, setSelectedObjectId] = useState(initialObject.id);
  const [activeFeature, setActiveFeature] = useState(initialObject.defaultFeature);
  const [activeObservation, setActiveObservation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("mesh");
  const [crossSection, setCrossSection] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set([initialObject.id]));
  const [viewedObjects, setViewedObjects] = useState<Set<string>>(() => new Set([initialObject.id]));
  const [viewedFeatureKeys, setViewedFeatureKeys] = useState<Set<string>>(
    () => new Set([`${initialObject.id}:${initialObject.defaultFeature}`]),
  );
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [tutorPrompt, setTutorPrompt] = useState(
    `Guide me through identifying ${initialObject.features[0].name} in the 3D visualization.`,
  );
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const selectedObject = useMemo(() => getCosmicObjectById(selectedObjectId), [selectedObjectId]);
  const totalFeatureCount = useMemo(
    () => cosmicObjects.reduce((total, object) => total + object.features.length, 0),
    [],
  );
  const mastery = useMemo(() => {
    const objectCoverage = viewedObjects.size / cosmicObjects.length;
    const featureCoverage = viewedFeatureKeys.size / totalFeatureCount;
    return Math.round((objectCoverage * 0.42 + featureCoverage * 0.58) * 100);
  }, [totalFeatureCount, viewedObjects, viewedFeatureKeys]);

  useEffect(() => {
    setActiveFeature(selectedObject.defaultFeature);
    setActiveObservation(null);
    setComparisonOpen(false);
  }, [selectedObject]);

  useEffect(() => {
    setViewedObjects((current) => {
      const next = new Set(current);
      next.add(selectedObject.id);
      return next;
    });
    setViewedFeatureKeys((current) => {
      const next = new Set(current);
      next.add(`${selectedObject.id}:${activeFeature}`);
      return next;
    });
  }, [activeFeature, selectedObject.id]);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const shellStyle = {
    "--accent": selectedObject.accent,
    "--accent-soft": selectedObject.accentSoft,
    "--cell-color": selectedObject.color,
  } as CSSProperties;

  return (
    <div className="app-shell" style={shellStyle}>
      <Header object={selectedObject} />

      <div className="app-grid">
        <Sidebar
          selectedObject={selectedObject}
          activeFeature={activeFeature}
          favorites={favorites}
          onSelectObject={setSelectedObjectId}
          onSelectFeature={setActiveFeature}
          onToggleFavorite={toggleFavorite}
        />

        <div className="center-stack">
          <Stage
            object={selectedObject}
            activeFeature={activeFeature}
            viewMode={viewMode}
            crossSection={crossSection}
            autoRotate={autoRotate}
            resetKey={resetKey}
            activeObservation={activeObservation}
            onModeChange={setViewMode}
            onCrossSectionChange={setCrossSection}
            onAutoRotateChange={setAutoRotate}
            onReset={() => {
              setResetKey((key) => key + 1);
              showToast("View reset.");
            }}
            onToast={showToast}
          />
          <BottomPanels
            object={selectedObject}
            activeObservation={activeObservation}
            onObservationChange={(pattern) =>
              setActiveObservation(pattern === activeObservation ? null : pattern)
            }
            onCompare={() => setComparisonOpen(true)}
            onToast={showToast}
          />
        </div>

        <RightPanel
          object={selectedObject}
          activeFeature={activeFeature}
          favorites={favorites}
          mastery={mastery}
          viewedObjectCount={viewedObjects.size}
          viewedFeatureCount={viewedFeatureKeys.size}
          totalFeatureCount={totalFeatureCount}
          tutorPrompt={tutorPrompt}
          onToggleFavorite={toggleFavorite}
          onTutorPrompt={(prompt) => {
            setTutorPrompt(prompt);
            showToast("AI tutor prompt staged.");
          }}
        />
      </div>

      <ComparisonModal object={selectedObject} open={comparisonOpen} onClose={() => setComparisonOpen(false)} />
      <Toast message={toast} />
    </div>
  );
}
