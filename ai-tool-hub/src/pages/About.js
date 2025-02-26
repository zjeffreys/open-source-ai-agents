import React from "react";
import { Box, Typography, Grid, Container, Paper, Button, Card, CardContent } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SavingsIcon from '@mui/icons-material/Savings';
import GitHubIcon from '@mui/icons-material/GitHub';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Link } from "react-router-dom";

const About = () => {
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
        <InfoIcon sx={{ fontSize: 48, mb: 2, color: '#0277bd' }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Our Mission
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Empowering small businesses with accessible AI tools
        </Typography>
      </Paper>

      {/* Main Mission Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CodeIcon sx={{ color: '#f57c00', mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Our Open Source Initiative
          </Typography>
        </Box>
        
        <Paper
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: 2,
            bgcolor: '#f8f9fa'
          }}
        >
          <Typography variant="body1" paragraph>
            Welcome to AI Tool Hub, an open source project dedicated to creating accessible AI tools for small business owners. We believe that artificial intelligence shouldn't be a privilege limited to large corporations with deep pockets.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is simple: to provide free and low-cost AI solutions that help entrepreneurs and small business owners save time and money on routine tasks. Whether it's generating creative content, analyzing data, or automating workflows, our tools are designed specifically for the unique challenges of running a small business.
          </Typography>
          <Typography variant="body1">
            While we offer premium AI agents for more complex business needs, our core commitment is to maintain an ever-growing library of free tools that anyone can access and use to make their business operations more efficient and effective.
          </Typography>
        </Paper>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <RocketLaunchIcon sx={{ color: '#f57c00', mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            How We Help Small Businesses
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 40, color: '#0277bd' }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
                  Time-Saving Automation
                </Typography>
                <Typography>
                  Our AI tools handle repetitive tasks so you can focus on the strategic aspects of growing your business. From content creation to data analysis, automation frees up valuable hours in your day.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <SavingsIcon sx={{ fontSize: 40, color: '#0277bd' }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
                  Cost Reduction
                </Typography>
                <Typography>
                  Access to enterprise-level AI capabilities without the enterprise price tag. Our free and affordable tools help small businesses compete with larger companies without breaking the budget.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <GitHubIcon sx={{ fontSize: 40, color: '#0277bd' }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
                  Open Source Community
                </Typography>
                <Typography>
                  As an open source project, we benefit from community contributions and feedback, ensuring our tools are constantly improving and adapting to meet real-world small business needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 2, 
          background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Join Our Mission
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Explore our free tools, contribute to our open source project, or check out our premium offerings.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
            size="large"
          >
            Explore AI Tools
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            size="large"
            href="https://github.com/your-github-repo"
            target="_blank"
            startIcon={<GitHubIcon />}
          >
            Contribute on GitHub
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;