import React, { useState, useEffect } from "react";

type Props = {
  key: any;
  id: number;
  className: string;
  initialX: number;
  initialY: number;
  radian: number;
  speed: number;
  flyAwayStart: boolean;
  onFliedAway: (id: number) => void;
};

export type FlyAwayProps = Props;

export default ({
  id,
  className,
  initialX,
  initialY,
  radian,
  speed,
  flyAwayStart,
  onFliedAway
}: Props) => {
  const [posX, setPosX] = useState(initialX);
  const [posY, setPosY] = useState(initialY);
  const [updateTimer, setUpdateTimer] = useState(0);

  useEffect(() => {
    if (flyAwayStart) {
      setUpdateTimer(
        window.setInterval(() => {
          setPosX(posX * Math.cos(radian) * speed);
          setPosY(posY * Math.cos(radian) * speed);
        }, 100)
      );
    }
  }, [flyAwayStart]);

  return (
    <div
      className={className}
      style={{
        position: "fixed",
        width: "100px",
        height: "100px",
        left: `${Math.floor(posX)}px`,
        top: `${Math.floor(posY)}px`
      }}
    >
      <img
        src="images/joy.png"
        className="joy"
        style={{
          position: "fixed",
          width: "100px",
          height: "100px",
          left: `${Math.floor(posX)}px`,
          top: `${Math.floor(posY)}px`
        }}
      />
    </div>
  );
};
