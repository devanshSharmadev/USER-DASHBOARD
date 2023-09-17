import React, { useState,useEffect } from "react";
import "./header.scss";
import Avatar from "@mui/material/Avatar";

const Header = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update the screenWidth state whenever the window is resized
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    // Add an event listener for the "resize" event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {screenWidth > 590 ? (
        <div className="main_div">
          <div className="left">
            <h2>USER'S INVENTORY</h2>
          </div>
          <div className="right">
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>
      ) : (
        <div className="main_div" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <h2>USER'S INVENTORY</h2>
        </div>
      )}
    </>
  );
};

export default Header;
