import { useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import StoreyIcon from "../assets/icons/storeys.icon";
import { useStoreyService } from "../services/building/hooks/storey.hooks";
import "./Toolbar.css";

const Toolbar = () => {
  const storeyService = useStoreyService();
  const [curLevel, setCurLevel] = useState(0);

  const addStorey = () => {
    const refGuid = Object.keys(storeyService.current())[
      storeyService.nrOfStories() - 1
    ];
    storeyService.addStorey(
      {
        guid: generateUUID(),
        level: 0,
        name: `Level ${curLevel}`,
      },
      { refGuid: refGuid, offset: curLevel + 1 }
    );

    setCurLevel(curLevel + 2.5);
    console.log(storeyService.current());
  };

  const removeStorey = () => {
    const storeys = storeyService.current();
    storeyService.removeStorey(storeys[0].guid);
  };

  return (
    <div className="toolbar-wrapper">
      {storeyService && storeyService.current().toString()}

      <ul className="toolbar-menu">
        <li onClick={addStorey}>{<StoreyIcon />}</li>
        <li onClick={removeStorey}>{<StoreyIcon />}</li>
      </ul>
    </div>
  );
};

export default Toolbar;
