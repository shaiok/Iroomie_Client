import React from 'react';
import { Step, StepLabel, Stepper as MUIStepper } from '@mui/material';

const Stepper = ({ steps, currentStep }) => {
  return (
    <MUIStepper activeStep={currentStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

export default Stepper;
