import React, { useState } from "react";
import { Box, TextField, Typography, Grid, Card, CardContent, Button, InputAdornment, Chip, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const allTools = [
  { id: 1, name: "Business Name Generator", description: "Generate creative business names.", link: "/ai-tools/business-name-generator", category: "Branding" },
  { id: 2, name: "ADA Compliance Checker", description: "Analyze your website for accessibility issues and ensure ADA compliance.", link: "/ai-tools/ada-compliance-checker", category: "Compliance" },
  // You can add more tools here when ready
];

const Home = () => {
  const [search, setSearch] = useState("");
  const filteredTools = allTools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase()) ||
    (tool.category && tool.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          mt: 2, 
          borderRadius: 2, 
          background: 'linear-gradient(to right, #e0f7fa, #bbdefb)',
          textAlign: 'center'
        }}
      >
        <BusinessIcon sx={{ fontSize: 48, mb: 2, color: '#0277bd' }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          AI Tools for Small Business Success
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Powerful AI solutions designed specifically for small business owners
        </Typography>
        <TextField
          placeholder="Search for tools..."
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ 
            maxWidth: 600, 
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: 1
          }}
        />
      </Paper>

      {/* Main Content */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LightbulbIcon sx={{ color: '#f57c00', mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Popular AI Tools
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Grid item xs={12} sm={6} md={4} key={tool.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">{tool.name}</Typography>
                      <Chip 
                        size="small" 
                        icon={<ThumbUpIcon sx={{ fontSize: '0.9rem !important' }} />} 
                        label="Popular" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                    
                    {tool.category && (
                      <Chip 
                        size="small"
                        label={tool.category}
                        sx={{ alignSelf: 'flex-start', mb: 1, bgcolor: '#e3f2fd' }}
                      />
                    )}
                    
                    <Typography sx={{ mb: 2, flexGrow: 1 }}>
                      {tool.description}
                    </Typography>
                    
                    <Button 
                      component={Link} 
                      to={tool.link} 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      sx={{ mt: 'auto' }}
                    >
                      Try This Tool
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No tools found matching "{search}"
              </Typography>
              <Button 
                onClick={() => setSearch("")} 
                variant="outlined" 
                sx={{ mt: 2 }}
              >
                Clear Search
              </Button>
            </Box>
          )}
        </Grid>
      </Box>

      {/* Value Proposition Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2, 
          bgcolor: '#f5f5f5',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Why Use Our AI Tools?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Save Time
              </Typography>
              <Typography>
                Automate tedious tasks and focus on growing your business
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Reduce Costs
              </Typography>
              <Typography>
                Affordable alternatives to expensive consultants or employees
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Gain Insights
              </Typography>
              <Typography>
                Get smart recommendations tailored to your small business
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;