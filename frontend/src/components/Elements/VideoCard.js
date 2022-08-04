import React, { useRef, useState } from "react";

function VideoCard({ video, title }) {
  const [showLayer, setShowLayer] = useState(false);
  const videoRef = useRef(null);
  const setLayerAndPause = (vref) => {
    setShowLayer(false);
    vref.current.pause();
  };

  const setLayerAndPlay = (vref) => {
    setShowLayer(true);
    vref.current.play();
  };

  return (
    <div
      className="h-100 w-100 parent"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setLayerAndPlay(videoRef)}
      onMouseLeave={() => setLayerAndPause(videoRef)}
    >
      <video className="child" ref={videoRef} loop autoPlay={false} muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showLayer ? (
        <div
          className={
            "child w-100 justify-content-center align-items-center avalon "
          }
          style={{
            height: "100%",
            backgroundColor: "rgba(108,61,215,0.3)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <h4 className="text-light">{title}</h4>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default VideoCard;
