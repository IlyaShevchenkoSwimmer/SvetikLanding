import "./App.scss";
import InfoSlider from "./components/InfoSlider/InfoSlider";
import VolumeBackground from "./components/VolumeBackground/VolumeBackground";

function App() {
  return (
    <>
      <VolumeBackground imgSrc="/VolumeBackground.jpg" />
      <InfoSlider />
    </>
  );
}

export default App;
