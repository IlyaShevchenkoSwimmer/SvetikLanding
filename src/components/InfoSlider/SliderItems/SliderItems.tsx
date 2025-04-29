import SliderItem from "./SliderItem/SliderItem";

import styles from "./styles.module.scss";

interface SliderItemsProps {
  ref: React.Ref<null>;
}

export default function SliderItems({ ref }: SliderItemsProps) {
  return (
    <section className={styles.sliderItems} ref={ref}>
      <SliderItem />
      <SliderItem />
    </section>
  );
}
