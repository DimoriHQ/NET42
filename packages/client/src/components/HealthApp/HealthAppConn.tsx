import React from "react";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';

const HealthAppConn: React.FC = () => { 
  const appconn = () => {
    // health app connect
  };

  return (
    <Card variant="solid" color="primary" invertedColors>
      <Typography level="h2" fontSize="lg" textColor="#fffff">
        Health App Connect
      </Typography>
      <CardContent>
        Connect to your favorite Health App to start the journey
      </CardContent>
      <CardActions>
        <Button variant="solid" color="danger" size="sm" onClick={appconn}>
          Strava
        </Button>
        <Button variant="solid" size="sm" onClick={appconn}>
          Garmin Connect
        </Button>
        <Button variant="solid" size="sm" onClick={appconn}>
          Apple Health
        </Button>
        <Button variant="solid" size="sm" onClick={appconn}>
          Google Fit
        </Button>
      </CardActions>
    </Card>
  );
};

export default HealthAppConn;