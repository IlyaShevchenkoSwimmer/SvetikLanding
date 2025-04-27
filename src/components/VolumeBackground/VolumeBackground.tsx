import { useRef } from "react";
import styles from "./styles.module.scss";

interface VolumeBackgroundProps {
  imgSrc: string;
}

export default function VolumeBackground({ imgSrc }: VolumeBackgroundProps) {
  const backgroundRef = useRef(null);
  const backgroundShadowRef = useRef(null);

  function handlePointerMove(event: React.PointerEvent) {
    const background = backgroundRef.current as unknown as HTMLElement;
    const backgroundShadow =
      backgroundShadowRef.current as unknown as HTMLElement;
    const halfBodyWidth = document.body.offsetWidth / 2;
    const halfBodyHeight = document.body.offsetHeight / 2;
    const xPosition = event.clientX;
    const yPosition = event.clientY;
    const xAngle = Math.floor((xPosition - halfBodyWidth) / 30);
    const yAngle = Math.floor((yPosition - halfBodyHeight) / 30);
    const xShadow = Math.floor((xPosition / (halfBodyWidth * 2)) * 100);
    const yShadow = Math.floor((yPosition / (halfBodyHeight * 2)) * 100);
    background.style.transform = `rotateX(${-yAngle}deg) rotateY(${xAngle}deg)`;
    backgroundShadow.style.background = `radial-gradient(at ${xShadow}% ${yShadow}%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.8) 60%)`;
  }

  return (
    <div
      className={styles.background}
      onPointerMove={handlePointerMove}
      ref={backgroundRef}
    >
      <img src={imgSrc} />
      <div
        className={styles.background__shadow}
        ref={backgroundShadowRef}
      ></div>
    </div>
  );
}
