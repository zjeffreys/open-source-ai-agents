import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  useScrollTrigger,
  Slide,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // { name: "Tools", path: "/tools" },
    // { name: "Pricing", path: "/pricing" },
  ];

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, mr: { md: 4 } }}>
              <SmartToyIcon sx={{ color: '#0277bd', mr: 1 }} />
              <Typography 
                variant="h6" 
                component={Link} 
                to="/"
                sx={{ 
                  textDecoration: 'none',
                  color: '#0277bd',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                AI Tool Hub
                <Box 
                  component="span" 
                  sx={{ 
                    ml: 1, 
                    fontSize: '0.65rem', 
                    bgcolor: '#e3f2fd', 
                    color: '#0277bd', 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: 1,
                    display: { xs: 'none', sm: 'inline-block' }
                  }}
                >
                  FOR SMALL BUSINESS
                </Box>
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {menuItems.map((item) => (
                  <Button 
                    key={item.name}
                    component={Link} 
                    to={item.path}
                    sx={{ 
                      color: isActive(item.path) ? '#0277bd' : '#757575',
                      mx: 0.5,
                      fontWeight: isActive(item.path) ? 'bold' : 'normal',
                      '&:hover': {
                        backgroundColor: 'rgba(2, 119, 189, 0.08)',
                        color: '#0277bd'
                      },
                      position: 'relative',
                      '&::after': isActive(item.path) ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 8,
                        left: '25%',
                        width: '50%',
                        height: 3,
                        backgroundColor: '#0277bd',
                        borderRadius: 4
                      } : {}
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right side buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && (
                <Button 
                  variant="outlined" 
                  color="primary"
                  component={Link}
                  to="/login"
                  sx={{ mr: 2 }}
                >
                  Log In
                </Button>
              )}
              
              <Button 
                variant="contained" 
                color="primary"
                component={Link}
                to="/signup"
                sx={{ 
                  display: { xs: 'none', sm: 'block' },
                  background: 'linear-gradient(to right, #0277bd, #039be5)',
                  px: { sm: 2, md: 3 }
                }}
              >
                Get Started
              </Button>

              {/* Mobile Menu */}
              {isMobile && (
                <Box>
                  <IconButton
                    edge="end"
                    color="primary"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {menuItems.map((item) => (
                      <MenuItem 
                        key={item.name} 
                        onClick={handleClose}
                        component={Link}
                        to={item.path}
                        selected={isActive(item.path)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                    <MenuItem 
                      onClick={handleClose}
                      component={Link}
                      to="/login"
                    >
                      Log In
                    </MenuItem>
                    <MenuItem 
                      onClick={handleClose}
                      component={Link}
                      to="/signup"
                    >
                      Get Started
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;