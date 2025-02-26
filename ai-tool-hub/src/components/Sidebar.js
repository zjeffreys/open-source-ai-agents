import React, { useState } from "react";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider, 
  Box, 
  Typography, 
  Collapse,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Paper
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CategoryIcon from '@mui/icons-material/Category';
import CodeIcon from '@mui/icons-material/Code';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import InsightsIcon from '@mui/icons-material/Insights';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openCategories, setOpenCategories] = useState(true);
  
  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Popular Tools", icon: <LocalFireDepartmentIcon sx={{ color: "#f57c00" }} />, path: "/popular" },
    { name: "Newest Tools", icon: <FiberNewIcon sx={{ color: "#2e7d32" }} />, path: "/newest" },
  ];

  const categories = [
    { name: "Business Planning", icon: <BusinessIcon />, path: "/category/business-planning" },
    { name: "Marketing", icon: <MailOutlineIcon />, path: "/category/marketing" },
    { name: "Document Creation", icon: <DescriptionIcon />, path: "/category/documents" },
    { name: "Data Analysis", icon: <InsightsIcon />, path: "/category/analytics" },
  ];

  const bottomNavItems = [
    { name: "Developers", icon: <CodeIcon />, path: "/developers" },
    { name: "API Docs", icon: <BuildIcon />, path: "/api-docs" },
    { name: "Tutorials", icon: <EventNoteIcon />, path: "/tutorials" },
  ];

  const drawerWidth = 250;

  const drawerContent = (
    <>
      <Box sx={{ py: 2, px: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.7rem', letterSpacing: 1, mb: 1 }}>
          NAVIGATION
        </Typography>
        <List sx={{ p: 0 }}>
          {mainNavItems.map((item) => (
            <ListItem 
              button 
              component={Link} 
              to={item.path}
              key={item.name}
              sx={{ 
                borderRadius: 1.5,
                mb: 0.5,
                bgcolor: isActive(item.path) ? 'rgba(2, 119, 189, 0.08)' : 'transparent',
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '&:hover': {
                  bgcolor: 'rgba(2, 119, 189, 0.08)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: isActive(item.path) ? 'bold' : 'normal'
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      <Box sx={{ py: 2, px: 2 }}>
        <ListItem 
          button 
          onClick={handleCategoriesClick}
          sx={{ 
            borderRadius: 1.5,
            mb: 0.5
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Tool Categories" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: 'medium'
            }} 
          />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openCategories} timeout="auto">
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem 
                button 
                component={Link}
                to={category.path}
                key={category.name}
                sx={{ 
                  py: 0.75,
                  pl: 4,
                  borderRadius: 1.5,
                  mb: 0.5,
                  bgcolor: isActive(category.path) ? 'rgba(2, 119, 189, 0.08)' : 'transparent',
                  color: isActive(category.path) ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'rgba(2, 119, 189, 0.08)',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: isActive(category.path) ? 'primary.main' : 'inherit' }}>
                  {category.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={category.name} 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    fontWeight: isActive(category.path) ? 'bold' : 'normal'
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ pb: 2, px: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.7rem', letterSpacing: 1, mb: 1, ml: 2 }}>
          RESOURCES
        </Typography>
        <List sx={{ p: 0 }}>
          {bottomNavItems.map((item) => (
            <ListItem 
              button 
              component={Link}
              to={item.path}
              key={item.name}
              sx={{ 
                borderRadius: 1.5,
                mb: 0.5,
                bgcolor: isActive(item.path) ? 'rgba(2, 119, 189, 0.08)' : 'transparent',
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '&:hover': {
                  bgcolor: 'rgba(2, 119, 189, 0.08)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: isActive(item.path) ? 'bold' : 'normal'
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Paper 
          elevation={0}
          sx={{ 
            backgroundColor: '#e3f2fd', 
            p: 2, 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Need Help?
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, fontSize: '0.8rem' }}>
            Check out our tutorials or contact support
          </Typography>
          <Box 
            component={Link} 
            to="/support"
            sx={{ 
              textDecoration: 'none',
              color: 'white',
              bgcolor: 'primary.main',
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: '0.8rem',
              fontWeight: 'medium',
              display: 'block',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Get Support
          </Box>
        </Paper>
      </Box>
    </>
  );

  // For mobile, use a temporary drawer
  if (isMobile) {
    return null; // We'd handle mobile navigation differently - typically with a hamburger menu
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { 
          width: drawerWidth, 
          boxSizing: "border-box", 
          top: "64px", 
          height: 'calc(100% - 64px)',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;