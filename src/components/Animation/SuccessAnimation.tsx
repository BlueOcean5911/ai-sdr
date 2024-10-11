import React from "react";
import Lottie from "lottie-react";
import animationData from "./success.animation.json";

const SuccessAnimation = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={false} // Loop the animation
      autoplay={true} // Start playing automatically
      style={{ width: 300, height: 300 }} // Set size
      //   speed={1} // Set playback speed (1 is normal speed)
    />
  );
};

export default SuccessAnimation;
