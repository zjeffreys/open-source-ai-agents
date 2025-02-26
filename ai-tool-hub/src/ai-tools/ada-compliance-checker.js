import React, { useState } from "react";
import { 
  Box, TextField, Button, Typography, CircularProgress, Paper, 
  Grid, Card, Divider, Chip, IconButton, Tooltip, Alert, 
  List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, AlertTitle
} from "@mui/material";
import { 
  Check as CheckIcon, 
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  BarChart as BarChartIcon,
  BugReport as BugReportIcon,
  Speed as SpeedIcon,
  ListAlt as ListAltIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CollapseIcon
} from '@mui/icons-material';

const ADAComplianceChecker = () => {
    const [url, setUrl] = useState("");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const checkAccessibility = async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        
        try {
            // const response = await fetch(`http://localhost:8000/agents/check-accessibility/?url=${encodeURIComponent(url)}`);
            const response = await fetch(`https://q7jhb37m6m6t3zklx544dnypxa0hxyag.lambda-url.us-west-2.on.aws/agents/check-accessibility/?url=${encodeURIComponent(url)}`);

            const data = await response.json();

            if (data.error) throw new Error(data.error);
            setReport(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getScoreSeverity = (score) => {
        if (score >= 80) return "success";
        if (score >= 50) return "warning";
        return "error";
    };

    const formatDate = () => {
        return new Date().toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ maxWidth: "1000px", mx: "auto", p: 3 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: { xs: 2, md: 4 }, 
                    mb: 4, 
                    borderRadius: 2,
                    background: 'linear-gradient(145deg, #2c3e50, #3498db)',
                    color: 'white'
                }}
            >
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            ADA Compliance Checker
                        </Typography>
                        <Typography variant="body1">
                            Professional accessibility analysis for websites to ensure ADA compliance and improve user experience.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            p: 2, 
                            bgcolor: 'rgba(255,255,255,0.1)', 
                            color: 'white',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                <InfoIcon sx={{ fontSize: '1rem', mr: 1, verticalAlign: 'text-bottom' }} />
                                ADA compliance is crucial for ensuring equal access and avoiding potential legal issues.
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                    Analyze Your Website
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Website URL"
                            placeholder="https://example.com"
                            fullWidth
                            variant="outlined"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            InputProps={{
                                sx: { borderRadius: 2 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={checkAccessibility} 
                            disabled={loading}
                            fullWidth
                            size="large"
                            sx={{ borderRadius: 2, py: 1.5 }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Run Accessibility Analysis"}
                        </Button>
                    </Grid>
                </Grid>

                {error && (
                    <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}
            </Paper>

            {loading && (
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Analyzing website accessibility...
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        This may take a minute as we perform a comprehensive scan
                    </Typography>
                </Paper>
            )}

            {report && !loading && (
                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
                    <Box sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        p: 3
                    }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5" fontWeight="medium">
                                    Accessibility Report
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    {formatDate()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Chip 
                                    label={`URL: ${report.url}`}
                                    sx={{ 
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        fontWeight: 500
                                    }} 
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={activeTab} 
                            onChange={handleChange} 
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{ px: 2 }}
                        >
                            <Tab icon={<BarChartIcon />} iconPosition="start" label="Summary" />
                            <Tab icon={<BugReportIcon />} iconPosition="start" label="Issues" />
                            <Tab icon={<SpeedIcon />} iconPosition="start" label="Performance" />
                            <Tab icon={<ListAltIcon />} iconPosition="start" label="Full Report" />
                        </Tabs>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        {/* Summary Tab */}
                        {activeTab === 0 && (
                            <>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Card variant="outlined" sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                Accessibility Score
                                            </Typography>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                my: 3
                                            }}>
                                                <Box sx={{ 
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: '50%',
                                                    border: '10px solid',
                                                    borderColor: `${getScoreSeverity(report.accessibility_score || 0)}.main`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Typography variant="h3" fontWeight="bold">
                                                        {report.accessibility_score || 0}%
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Chip 
                                                    label={
                                                        report.accessibility_score >= 80 ? "Good" : 
                                                        report.accessibility_score >= 50 ? "Needs Improvement" : 
                                                        "Critical Issues"
                                                    }
                                                    color={getScoreSeverity(report.accessibility_score || 0)}
                                                    sx={{ fontWeight: 'bold' }}
                                                />
                                            </Box>
                                        </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                        <Card variant="outlined" sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                Key Findings
                                            </Typography>
                                            
                                            {report.lighthouse_report?.lighthouseResult?.audits && (
                                                <List dense>
                                                    {Object.entries(report.lighthouse_report.lighthouseResult.audits)
                                                        .filter(([_, audit]) => audit && audit.score !== null)
                                                        .slice(0, 4)
                                                        .map(([id, audit]) => (
                                                            <ListItem key={id}>
                                                                <ListItemIcon>
                                                                    {audit.score === 1 ? (
                                                                        <CheckIcon color="success" />
                                                                    ) : audit.score >= 0.5 ? (
                                                                        <WarningIcon color="warning" />
                                                                    ) : (
                                                                        <ErrorIcon color="error" />
                                                                    )}
                                                                </ListItemIcon>
                                                                <ListItemText 
                                                                    primary={audit.title}
                                                                    secondary={`Score: ${Math.round((audit.score || 0) * 100)}%`}
                                                                />
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            )}
                                            
                                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                                See the Issues tab for more details.
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                                            <AlertTitle>What does this mean?</AlertTitle>
                                            Your accessibility score indicates how well your website complies with WCAG guidelines and ADA requirements. 
                                            Scores above 80% generally indicate good accessibility practices, while lower scores may require attention.
                                        </Alert>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        
                        {/* Issues Tab */}
                        {activeTab === 1 && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Identified Accessibility Issues
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                
                                {report.lighthouse_report?.lighthouseResult?.audits && 
                                    Object.entries(report.lighthouse_report.lighthouseResult.audits)
                                        .filter(([_, audit]) => audit && audit.score !== null && audit.score < 1)
                                        .map(([id, audit], index) => (
                                            <Card 
                                                key={id} 
                                                variant="outlined" 
                                                sx={{ 
                                                    mb: 2,
                                                    borderRadius: 2,
                                                    borderLeft: '4px solid',
                                                    borderLeftColor: audit.score >= 0.5 ? 'warning.main' : 'error.main'
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item>
                                                            {audit.score >= 0.5 ? (
                                                                <WarningIcon color="warning" fontSize="large" />
                                                            ) : (
                                                                <ErrorIcon color="error" fontSize="large" />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography variant="h6" fontWeight="medium">
                                                                {audit.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Severity: {audit.score >= 0.5 ? 'Moderate' : 'High'} • 
                                                                Score: {Math.round((audit.score || 0) * 100)}%
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                    <Divider sx={{ my: 1.5 }} />
                                                    
                                                    <Typography variant="body2" paragraph>
                                                        {audit.description}
                                                    </Typography>
                                                    
                                                    {audit.details && (
                                                        <Box sx={{ 
                                                            p: 1.5, 
                                                            bgcolor: 'grey.50',
                                                            borderRadius: 1,
                                                            fontSize: '0.85rem',
                                                            fontFamily: 'monospace',
                                                            maxHeight: '150px',
                                                            overflow: 'auto'
                                                        }}>
                                                            <pre style={{ margin: 0 }}>
                                                                {JSON.stringify(audit.details, null, 2)}
                                                            </pre>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Card>
                                        ))
                                }
                            </>
                        )}
                        
                        {/* Performance Tab */}
                        {activeTab === 2 && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Core Web Vitals & Performance
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                
                                {report.lighthouse_report?.loadingExperience?.metrics ? (
                                    <>
                                        <Grid container spacing={3}>
                                            {Object.entries(report.lighthouse_report.loadingExperience.metrics).map(([metric, data]) => (
                                                <Grid item xs={12} md={6} lg={4} key={metric}>
                                                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                                                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                            {metric.replace(/_/g, ' ')}
                                                        </Typography>
                                                        
                                                        <Box sx={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            mb: 1
                                                        }}>
                                                            <Typography variant="body2">
                                                                Category:
                                                            </Typography>
                                                            <Chip 
                                                                size="small"
                                                                label={data?.category || 'N/A'} 
                                                                color={
                                                                    data?.category === 'GOOD' ? 'success' :
                                                                    data?.category === 'NEEDS_IMPROVEMENT' ? 'warning' : 'error'
                                                                }
                                                            />
                                                        </Box>
                                                        
                                                        <Box sx={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <Typography variant="body2">
                                                                Percentile:
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight="medium">
                                                                {data?.percentile || 'N/A'}
                                                            </Typography>
                                                        </Box>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        
                                        <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
                                            <AlertTitle>About Core Web Vitals</AlertTitle>
                                            Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience.
                                            They measure loading performance, interactivity, and visual stability of a page.
                                        </Alert>
                                    </>
                                ) : (
                                    <Alert severity="warning">
                                        Core Web Vitals data is not available for this URL.
                                    </Alert>
                                )}
                            </>
                        )}
                        
                        {/* Full Report Tab */}
                        {activeTab === 3 && (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6">
                                        Complete Lighthouse Report
                                    </Typography>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        size="small"
                                        onClick={() => setShowDetails(!showDetails)}
                                        startIcon={showDetails ? <CollapseIcon /> : <ExpandIcon />}
                                    >
                                        {showDetails ? "Collapse" : "Expand"}
                                    </Button>
                                </Box>
                                
                                <Divider sx={{ mb: 2 }} />
                                
                                {showDetails ? (
                                    <Box 
                                        component="pre" 
                                        sx={{ 
                                            p: 3, 
                                            bgcolor: 'grey.100', 
                                            borderRadius: 2, 
                                            overflow: 'auto',
                                            maxHeight: '600px',
                                            fontSize: '0.825rem',
                                            fontFamily: 'monospace'
                                        }}
                                    >
                                        {JSON.stringify(report.lighthouse_report, null, 2)}
                                    </Box>
                                ) : (
                                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                                        Click "Expand" to see the full detailed report. This contains comprehensive information about all aspects of the accessibility audit.
                                    </Alert>
                                )}
                            </>
                        )}
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ADAComplianceChecker;