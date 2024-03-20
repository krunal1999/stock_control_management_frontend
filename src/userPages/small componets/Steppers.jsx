import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Order Confirmation',
  'Add Shipping Address',
  'Pay and Checkout',
];

export default function Steppers({astep}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={astep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}