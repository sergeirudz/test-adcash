"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CampaignName from "@/components/dashboard/campaigns/create/step1/CampaignName";
import DeviceTypeTargeting from "@/components/dashboard/campaigns/create/step1/DeviceTypeTargeting";
import GeoTargeting from "@/components/dashboard/campaigns/create/step1/GeoTargeting";
import Supply from "@/components/dashboard/campaigns/create/step2/Supply";
import UserInterest from "@/components/dashboard/campaigns/create/step2/UserInterest";
import WebsiteCategories from "@/components/dashboard/campaigns/create/step2/WebsiteCategories";
import Device from "@/components/dashboard/campaigns/create/step2/Device";
import Content from "@/components/dashboard/campaigns/create/step2/Content";
import Connection from "@/components/dashboard/campaigns/create/step2/Connection";
import Creatives from "@/components/dashboard/campaigns/create/step3/Creatives";
import WeeklyDistribution from "@/components/dashboard/campaigns/create/step4/WeeklyDistribution";
import Budget from "@/components/dashboard/campaigns/create/step4/Budget";
import Bids from "@/components/dashboard/campaigns/create/step4/Bids";
import Cappings from "@/components/dashboard/campaigns/create/step4/Cappings";
import Overview from "@/components/dashboard/campaigns/create/step5/Overview";
import CreateCampaignContextProvider from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";
import Goals from "@/components/dashboard/campaigns/create/step3/Goals";

const steps = [
  {
    label: "General Information",
    nodes: [CampaignName, DeviceTypeTargeting, GeoTargeting],
  },
  {
    label: "Targeting",
    nodes: [
      Supply,
      UserInterest,
      WebsiteCategories,
      Device,
      Content,
      Connection,
    ],
  },
  {
    label: "Creatives",
    nodes: [Creatives, Goals],
  },
  {
    label: "Budget",
    nodes: [WeeklyDistribution, Budget, Bids, Cappings],
  },
  {
    label: "Overview",
    nodes: [Overview],
  },
];

export default function CreateCampaignStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    // setCompleted({
    //   ...completed,
    //   [activeStep]: true,
    // });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <CreateCampaignContextProvider>
      <Box sx={{ width: "100%" }}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          sx={{
            overflowX: {
              xs: "auto",
              md: "hidden",
            },
            minHeight: "7rem",
          }}
        >
          {steps.map((step, index) => (
            <Step key={index} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <Stack
              sx={{
                py: 3,
              }}
            >
              <Stack direction="column" spacing={3}>
                {!!steps[activeStep].nodes &&
                  steps[activeStep].nodes.map((Node, index) => (
                    <Node key={index} />
                  ))}
              </Stack>
            </Stack>
          )}
        </div>
      </Box>
    </CreateCampaignContextProvider>
  );
}
