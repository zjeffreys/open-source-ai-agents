import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery, useTheme, IconButton, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import BusinessNameGenerator from "./ai-tools/business-name-generator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import { useState } from "react";
import ADAComplianceChecker from "./ai-tools/ada-compliance-checker";

// Main layout component that handles responsive behavior
const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile drawer when route changes
  React.useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location, mobileOpen]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 250;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Mobile drawer toggle button */}
        {isMobile && (
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              position: 'fixed', 
              left: 16, 
              top: 74, 
              zIndex: 1100,
              bgcolor: 'white',
              boxShadow: 1,
              display: { md: 'none' }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* Mobile drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth, 
                top: '64px',
                height: 'calc(100% - 64px)',
              },
            }}
          >
            <Sidebar />
          </Drawer>
        )}
        
        {/* Desktop permanent sidebar */}
        {!isMobile && <Sidebar />}
        
        {/* Main content area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            p: { xs: 2, sm: 3 },
            pb: 8 // Space for footer
          }}
        >
          {children}
        </Box>
      </Box>
      
      <Footer sx={{ 
        width: '100%', 
        mt: 'auto',
        py: 3,
        px: { xs: 2, sm: 3 },
        bgcolor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0'
      }} />
    </Box>
  );
};

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Normalize CSS */}
      <Routes>
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/ai-tools/business-name-generator" element={<BusinessNameGenerator />} />
              <Route path="/ai-tools/ada-compliance-checker" element={<ADAComplianceChecker />} />
             <Route path="/about" element={<About />} />
              <Route path="/developers" element={<div>Developers Page</div>} />
              <Route path="/popular" element={<div>Popular Tools Page</div>} />
              <Route path="/newest" element={<div>Newest Tools Page</div>} />
              <Route path="/category/*" element={<div>Category Page</div>} />
              <Route path="/tutorials" element={<div>Tutorials Page</div>} />
              <Route path="/api-docs" element={<div>API Documentation</div>} />
              <Route path="/support" element={<div>Support Page</div>} />
              <Route path="/login" element={<div>Login Page</div>} />
              <Route path="/signup" element={<div>Signup Page</div>} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;