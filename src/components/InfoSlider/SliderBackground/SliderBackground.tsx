import { useMemo } from "react";
import styles from "./styles.module.scss";

interface SliderBackgroundProps {
  ref: React.Ref<null>;
}

export default function SliderBackground({ ref }: SliderBackgroundProps) {
  const backgroundImages = useMemo(() => {
    const imgArr = [];
    for (let i = 1; i < 8; i++) {
      imgArr.push(
        <div className={styles.background__imgWrapper} key={i}>
          <img src={`/${i}.jpg`} />
        </div>
      );
    }
    return imgArr;
  }, []);

  return (
    <div className={styles.background} ref={ref}>
      {backgroundImages}
    </div>
  );
}
