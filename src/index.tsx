import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import FlyAway, { FlyAwayProps } from "./fly-away/FlyAway";
import { suitClassNames } from "suitcss-classnames";

const App = () => {
  const [item, updateItem] = useState<FlyAwayProps[]>([]);
  const [isCold, setCold] = useState(false);

  const awayContainerClassName = suitClassNames({
    component: "away-container",
    states: {
      "is-cold": isCold
    }
  });

  useEffect(() => {
    updateItem(
      item.map(props => ({
        ...props,
        className: awayContainerClassName
      }))
    );
  });

  const onAdd = () => {
    const newItems = [
      ...Array.from(item),
      {
        key: item.length,
        id: item.length,
        className: awayContainerClassName,
        initialX: Math.floor(Math.random() * 500),
        initialY: Math.floor(Math.random() * 300),
        radian: 360 / (Math.floor(Math.random() * 359) + 1),
        speed: Math.floor(Math.random() * 5) + 5,
        flyAwayStart: false,
        onFliedAway: (id: number) => {}
      }
    ];
    updateItem(newItems);
  };

  const onCold = () => {
    setCold(!isCold);
  };

  const onExplosion = () => {
    updateItem(
      item.map(props => ({
        ...props,
        flyAwayStart: true
      }))
    );

    setTimeout(() => {
      updateItem([]);
      setCold(false);
    }, 100);
  };

  return (
    <div>
      <div
        className="container"
        style={{
          width: "100%",
          height: "720px"
        }}
      >
        {item.map(props => (
          <FlyAway {...props} />
        ))}
      </div>
      <hr />
      <button onClick={onAdd}>増やす</button>
      <button onClick={onCold}>{!isCold ? "冷やす" : "戻す"}</button>
      {/* <button onClick={onExplosion}>爆発</button> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
