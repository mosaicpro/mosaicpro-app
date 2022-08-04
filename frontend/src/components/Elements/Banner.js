import React from "react";

function Banner({ background, width, height, opacity, layerColor, children }) {
  return (
    <div
      className="position-relative"
      style={{
        backgroundImage: "url(" + background + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: opacity,
      }}
    >
      <div
        className="position-relative"
        style={{
          width: width,
          height: height,
        }}
      >
        {children}
      </div>

      {layerColor && (
        <div
          className="w-100 h-100 position-absolute top-0 start-0"
          style={{
            backgroundColor: layerColor,
          }}
        ></div>
      )}
    </div>
  );
}

export default Banner;
