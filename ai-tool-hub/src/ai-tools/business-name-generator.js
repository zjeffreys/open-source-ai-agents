import React, { useState, useEffect } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  MenuItem, 
  Chip,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Fade,
  useTheme,
  InputAdornment,
  List
} from "@mui/material";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const industries = [
  "Technology", "Health", "Finance", "Education", "Retail", "Food & Beverage", "Real Estate", "Travel & Tourism",
  "Entertainment", "Automotive", "Fashion", "Beauty & Personal Care", "Sports & Fitness", "Home & Garden",
  "Marketing & Advertising", "Consulting", "Legal", "Non-Profit", "Manufacturing", "Agriculture", "Energy",
  "Telecommunications", "Logistics & Transportation", "Media & Publishing", "Art & Design"
];

const BusinessNameGenerator = () => {
  const theme = useTheme();
  const [industry, setIndustry] = useState("");
  const [businessInfo, setBusinessInfo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [notWanted, setNotWanted] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFinalPrompt(
      `Generate business names for ${industry || "[industry]"} industry` + 
      (keywords.length > 0 ? ` with keywords: ${keywords.join(", ")}` : "") + 
      (businessInfo ? ` and business information: ${businessInfo}` : "") +
      (notWanted ? `. Avoid: ${notWanted}` : ".")
    );
  }, [industry, keywords, businessInfo, notWanted]);

  const handleAddKeyword = () => {
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleGenerateNames = async () => {
    if (!industry) {
      setErrorMessage("Please select an industry before generating names.");
      return;
    }
    
    setLoading(true);
    setSuggestions([]);
    setErrorMessage("");

    try {
    //   const response = await axios.post("http://localhost:8000/agents/generate-business-name", {
        const response = await axios.post("https://q7jhb37m6m6t3zklx544dnypxa0hxyag.lambda-url.us-west-2.on.aws/agents/generate-business-name", {

        prompt: finalPrompt
      });
      setSuggestions(response.data.business_names.sort((a, b) => b.rating - a.rating));
    } catch (error) {
      console.error("Error generating names:", error);
      setErrorMessage("There was an error generating business names. Please try again.");
    }

    setLoading(false);
  };

  const getRatingColor = (rating) => {
    if (rating >= 9) return theme.palette.success.main;
    if (rating >= 6) return theme.palette.warning.main;
    return theme.palette.error.light;
  };

  const getRatingText = (rating) => {
    if (rating >= 9) return "Excellent";
    if (rating >= 7) return "Great";
    if (rating >= 5) return "Good";
    return "Fair";
  };

  const handleCopyName = (name) => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(n => n !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  return (
    <Box>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(to right, #e0f7fa, #bbdefb)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Business Name Generator
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Generate creative, memorable business names tailored to your industry and brand vision.
              Our AI-powered tool will create unique name suggestions that capture the essence of your business.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <BusinessIcon sx={{ fontSize: 100, color: 'primary.main', opacity: 0.8 }} />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: { xs: 3, md: 0 }, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              1. Tell us about your business
            </Typography>
            
            <TextField
              select
              label="Business Industry*"
              fullWidth
              margin="normal"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            >
              {industries.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              label="Business Description"
              fullWidth
              margin="normal"
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
              multiline
              rows={3}
              placeholder="Describe what your business does, your values, target audience, etc."
              helperText="More details help generate better results"
            />
            
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Keywords 
                <Tooltip title="Words that you'd like to associate with your business name">
                  <InfoOutlinedIcon sx={{ ml: 1, fontSize: 16, color: 'text.secondary', verticalAlign: 'middle' }} />
                </Tooltip>
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  label="Add Keyword"
                  fullWidth
                  size="small"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddKeyword} 
                  sx={{ ml: 1 }}
                  disabled={!keyword}
                >
                  <AddIcon />
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {keywords.map((kw, index) => (
                  <Chip 
                    key={index} 
                    label={kw} 
                    onDelete={() => handleRemoveKeyword(kw)}
                    sx={{ 
                      bgcolor: 'primary.light',
                      color: 'primary.dark',
                      fontWeight: 'medium'
                    }} 
                  />
                ))}
                {keywords.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    No keywords added yet
                  </Typography>
                )}
              </Box>
            </Box>
            
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mb: 3 }}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
            </Button>
            
            {showAdvanced && (
              <Fade in={showAdvanced}>
                <Box>
                  <TextField
                    label="Terms to Avoid"
                    fullWidth
                    margin="normal"
                    value={notWanted}
                    onChange={(e) => setNotWanted(e.target.value)}
                    placeholder="Words or phrases you don't want in your business name"
                    size="small"
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Final Prompt
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      value={finalPrompt}
                      onChange={(e) => setFinalPrompt(e.target.value)}
                      multiline
                      rows={3}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Copy prompt">
                              <IconButton 
                                edge="end" 
                                onClick={() => {
                                  navigator.clipboard.writeText(finalPrompt);
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                                size="small"
                              >
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {copied && (
                      <Typography variant="caption" color="primary">
                        Copied to clipboard!
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Fade>
            )}
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleGenerateNames} 
              disabled={loading || !industry} 
              fullWidth
              size="large"
              sx={{ 
                mt: 2,
                py: 1.5,
                background: 'linear-gradient(to right, #0277bd, #039be5)',
              }}
              startIcon={loading ? undefined : <AutoAwesomeIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Business Names"}
            </Button>
            
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              2. Choose your business name
            </Typography>
            
            {!loading && suggestions.length === 0 && (
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                p: 4
              }}>
                <AutoAwesomeIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body1" color="text.secondary" align="center">
                  Your business name suggestions will appear here.
                </Typography>
                <Typography variant="body2" color="text.disabled" align="center" sx={{ mt: 1 }}>
                  Fill in the form and click "Generate Business Names"
                </Typography>
              </Box>
            )}
            
            {loading && (
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                p: 4
              }}>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="body1" align="center">
                  Generating creative business names...
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  This may take a few moments
                </Typography>
              </Box>
            )}
            
            {!loading && suggestions.length > 0 && (
              <Box sx={{ 
                mt: 2, 
                flexGrow: 1, 
                overflow: 'auto', 
                maxHeight: { xs: 'auto', md: '65vh' } 
              }}>
                <List disablePadding>
                  {suggestions.map((suggestion, index) => (
                    <Card 
                      key={index} 
                      elevation={1} 
                      sx={{ 
                        mb: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {suggestion.name}
                          </Typography>
                          <Box>
                            <Tooltip title={favorites.includes(suggestion.name) ? "Remove from favorites" : "Add to favorites"}>
                              <IconButton 
                                size="small" 
                                onClick={() => toggleFavorite(suggestion.name)}
                                color={favorites.includes(suggestion.name) ? "error" : "default"}
                              >
                                {favorites.includes(suggestion.name) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Copy name">
                              <IconButton size="small" onClick={() => handleCopyName(suggestion.name)}>
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        
                        <Chip 
                          label={`${getRatingText(suggestion.rating)} (${suggestion.rating}/10)`} 
                          size="small"
                          sx={{ 
                            bgcolor: getRatingColor(suggestion.rating),
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 2
                          }} 
                        />
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        <Typography variant="body2" color="text.secondary">
                          {suggestion.reasoning}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessNameGenerator;