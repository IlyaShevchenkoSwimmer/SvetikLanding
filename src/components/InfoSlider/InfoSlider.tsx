import { useRef } from "react";

import SliderBackground from "./SliderBackground/SliderBackground";
import SliderItems from "./SliderItems/SliderItems";

import styles from "./styles.module.scss";

export default function InfoSlider() {
  const sliderRef = useRef(null);
  const backgroundRef = useRef(null);
  const sliderItemsRef = useRef(null);

  let pointerDownX: number = 0;
  let initialBackgroundLeft: number = 0;
  let initialSliderItemsLeft: number = 0;
  let scrolledBy: number = 0;

  function handlePointerDown(event: React.PointerEvent) {
    const background = backgroundRef.current as unknown as HTMLElement;
    background.style.transition = `none`;
    const sliderItems = sliderItemsRef.current as unknown as HTMLElement;
    sliderItems.style.transition = `none`;
    document.body.onpointermove = handlePointerMove;
    document.body.onpointerup = handlePointerUp;
    pointerDownX = event.clientX;
    initialBackgroundLeft = background.offsetLeft;
    initialSliderItemsLeft = sliderItems.offsetLeft;
  }

  function handlePointerMove(event: PointerEvent) {
    const background = backgroundRef.current as unknown as HTMLElement;
    const sliderItems = sliderItemsRef.current as unknown as HTMLElement;
    scrolledBy = event.clientX - pointerDownX;
    background.style.left = `${initialBackgroundLeft - scrolledBy}px`;
    sliderItems.style.left = `${initialSliderItemsLeft + scrolledBy}px`;
  }

  function handlePointerUp() {
    const slider = sliderRef.current as unknown as HTMLElement;
    const background = backgroundRef.current as unknown as HTMLElement;
    const backgroundLeft = background.offsetLeft;
    const sliderItems = sliderItemsRef.current as unknown as HTMLElement;
    const sliderItemsLeft = sliderItems.offsetLeft;
    const difference = scrolledBy % slider.offsetWidth;
    const passedCenter =
      Math.abs(difference) > slider.offsetWidth / 2 ? true : false;
    background.style.transition = `all 0.3s ease-out`;
    sliderItems.style.transition = `all 0.3s ease-out`;

    background.style.left = `${
      passedCenter
        ? difference > 0
          ? backgroundLeft - (slider.offsetWidth - Math.abs(difference))
          : backgroundLeft + (slider.offsetWidth - Math.abs(difference))
        : backgroundLeft + difference
    }px`;

    sliderItems.style.left = `${
      passedCenter
        ? difference < 0
          ? sliderItemsLeft - (slider.offsetWidth - Math.abs(difference))
          : sliderItemsLeft + (slider.offsetWidth - Math.abs(difference))
        : sliderItemsLeft - difference
    }px`;

    if (background.offsetLeft > 0) {
      background.style.left = "0";
    }

    if (
      background.offsetLeft <
      -((background.children.length - 1) * slider.offsetWidth)
    ) {
      background.style.left = `-${
        (background.children.length - 1) * slider.offsetWidth
      }px`;
    }

    if (sliderItems.offsetLeft > 0) {
      sliderItems.style.left = "0";
    }

    if (
      sliderItems.offsetLeft <
      -((sliderItems.children.length * 2 - 2) * slider.offsetWidth)
    ) {
      sliderItems.style.left = `-${
        (sliderItems.children.length * 2 - 2) * slider.offsetWidth
      }px`;
    }

    document.body.onpointermove = null;
    document.body.onpointerup = null;
    pointerDownX = 0;
    initialBackgroundLeft = 0;
    initialSliderItemsLeft = 0;
    scrolledBy = 0;
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
      <SliderItems ref={sliderItemsRef} />
    </main>
  );
}
