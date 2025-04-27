import { useRef } from "react";

import SliderBackground from "./SliderBackground/SliderBackground";

import styles from "./styles.module.scss";

export default function InfoSlider() {
  const sliderRef = useRef(null);
  const backgroundRef = useRef(null);
  const infoItemsRef = useRef(null);

  let pointerDownX = 0;
  let initialBackgroundLeft = 0;

  function handlePointerDown(event: React.PointerEvent) {
    const background = backgroundRef.current as unknown as HTMLElement;
    document.body.onpointermove = handlePointerMove;
    document.body.onpointerup = handlePointerUp;
    pointerDownX = event.clientX;
    initialBackgroundLeft = background.offsetLeft;
  }

  function handlePointerMove(event: PointerEvent) {
    const background = backgroundRef.current as unknown as HTMLElement;
    background.style.left = `${
      initialBackgroundLeft - event.clientX + pointerDownX
    }px`;
  }

  function handlePointerUp(event: PointerEvent) {
    const slider = sliderRef.current as unknown as HTMLElement;
    const background = backgroundRef.current as unknown as HTMLElement;
    const backgroundLeft = background.offsetLeft;
    const differenceLeft = background.offsetLeft % slider.offsetWidth;
    const passedCenter =
      Math.abs(differenceLeft) > slider.offsetWidth / 2 ? true : false;
    console.log(passedCenter);
    background.style.left = `${
      passedCenter
        ? backgroundLeft - differenceLeft
        : backgroundLeft - differenceLeft
    }px`;
    document.body.onpointermove = null;
    document.body.onpointerup = null;
    pointerDownX = 0;
    initialBackgroundLeft = 0;
  }

  return (
    <main
      className={styles.infoSlider}
      onDragStart={(event) => {
        event.preventDefault();
      }}
      onPointerDown={handlePointerDown}
      ref={sliderRef}
    >
      <SliderBackground ref={backgroundRef} />
    </main>
  );
}
