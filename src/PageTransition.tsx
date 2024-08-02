import React, { useEffect } from "react";
import { Fade } from "@mui/material";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactElement;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Fade key={location.pathname} in={true} timeout={1000}>
      <div>{children}</div>
    </Fade>
  );
};

export default PageTransition;
