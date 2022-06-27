import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Plane from "./Plane";
import {
  useStoreys,
  useStoreyService,
} from "./services/building/hooks/storey.hooks";

function App() {
  const storeyService = useStoreyService();
  const storeys = Object.values(useStoreys());

  return (
    <>
      <Toolbar />
      <div className="canva">
        <Canvas>
          {storeys.map((storey, index) => (
            <Plane
              key={index}
              position={[0, storey.level, 0]}
              event={() => storeyService.removeStorey(storey.guid)}
            />
          ))}

          <ArcballControls position={[100, 100, 100]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
