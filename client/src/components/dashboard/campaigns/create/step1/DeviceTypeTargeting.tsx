"use client";

import type { JSX } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

export default function DeviceTypeTargeting(): JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader title="Device Type Targeting" />
        <CardContent>
          <FormGroup>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 6,
                }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Desktop"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Console"
                />
              </Grid>
              <Grid
                size={{
                  xs: 6,
                }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Smartphone"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Tablet"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Other devices"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </CardContent>
      </Card>
    </form>
  );
}
