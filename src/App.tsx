import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import store from "./app/store";
import StoreyIcon from "./assets/icons/storeys.icon";
import Storey from "./features/building/types/Storey.type";
import Plane from "./Plane";

function App() {
  const storeys = useSelector((state: any) => state.storey as Storey[]);

  const addStorey = () => {
    store.dispatch({ type: "storey/increment" });
  };

  return (
    <>
      <ul className="toolbar">
        <li onClick={addStorey}>{<StoreyIcon />}</li>
        <li>{<StoreyIcon />}</li>
      </ul>
      {console.log(storeys)}
      <div className="canva">
        <Canvas>
          {storeys.map((storey) => (
            <Plane position={[0, storey.level, 0]} scale={[10, 0.1, 10]} />
          ))}
          <ArcballControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
