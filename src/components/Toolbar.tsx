import { useState } from "react";
import StoreyIcon from "../assets/icons/storeys.icon";
import { useStoreyService } from "../services/building/hooks/storey.hooks";
import "./Toolbar.css";

const Toolbar = () => {
  const storeyService = useStoreyService();
  const [curLevel, setCurLevel] = useState(0);

  const addStorey = () => {
    storeyService.addStorey({
      level: curLevel,
      name: `Level ${curLevel}`,
    });

    setCurLevel(curLevel + 2.5);
    console.log(storeyService.current());
  };

  return (
    <div className="toolbar-wrapper">
      {storeyService && storeyService.current().toString()}

      <ul className="toolbar-menu">
        <li onClick={addStorey}>{<StoreyIcon />}</li>
      </ul>
    </div>
  );
};

export default Toolbar;
