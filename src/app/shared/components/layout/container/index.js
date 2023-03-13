import React, { useState, createContext } from "react";
import Footer from "../../../../shared/components/footer";
import Header from "../../../../shared/components/header";
import Sidebar from "../../../../shared/components/sidebar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
const LayoutContext = createContext();
export const Layout = (props) => {
  const [mapStyle, setMapStyle] = useState([]);
  return (
    <div>

      <LayoutContext.Provider
        value={{
          mapStyle,
          setMapStyle,
        }}
      >
        <Header />
          <Box sx={{ display: 'flex' }}>
          <Sidebar/>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Toolbar />
        {props?.children}
              </Box>
          </Box>
        <Footer />
      </LayoutContext.Provider>
    </div>
  );
};

export default LayoutContext;
