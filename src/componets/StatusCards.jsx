import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StatusCards = ({ title, value, maxvalue, cardcolor, icon ,pathcolour }) => {
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: cardcolor,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
          borderRadius: 4,
        }}
      >
        <IconButton
          aria-label="icon"
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          {icon}
        </IconButton>

        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ width: 100, height: 100, margin: "auto" }}>
            <CircularProgressbar
              value={value}
              text={`${value}`}
              maxValue={maxvalue}
              styles={buildStyles({
                pathTransitionDuration: 0.8,
                pathColor: pathcolour,
                textColor: "#000",
                
                
              })}
            />
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{ fontSize: "1.3rem", marginTop: 4 }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StatusCards;
