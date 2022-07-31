import * as React from "react";
import { useState } from "react";
import { Box, Grid, Input, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatCcy, handleInvalidValue } from "../../../utils";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42, // 42
  },
});

const FREE_TARGETS = 10;
const FREE_MINUTES = 100;
const COST_PER_TARGET = 10;
const COST_PER_MINUTE = 0.03;
const HIGH_AVAILABILITY_TARGETS = 100;

const isChargedTargets = (valueTargets: number | string): boolean => {
  return valueTargets > FREE_TARGETS;
};

const isChargedMinutes = (valueMinutes: number | string): boolean => {
  return valueMinutes > FREE_MINUTES;
};

const CloudPricing = () => {
  const classes = useStyles();

  // Deployment Targets
  const [valueTargets, setValueTargets] = useState(FREE_TARGETS);

  const handleSliderChange = (event: any, newValue: any) => {
    setValueTargets(newValue);
    setLastTargetsSliderVal(valueTargets);
  };

  const handleBlur = () => {
    if (valueTargets < 0) {
      setValueTargets(0);
    } else if (valueTargets > 10000) {
      setValueTargets(10000);
    }
  };

  // Single spot where targets slider value to be set by the user
  const updateUserTargets = (valueTargets: number) => {
    setValidTargets(valueTargets); // update display value
    setLastTargetsSliderVal(valueTargets); // remember user's last value

    // reset checkbox if targets slider value is not eligible to HA
    if (valueTargets < HIGH_AVAILABILITY_TARGETS) {
      setHaCheckboxVal(false);
    }
  };
  const setValidTargets = (num: number) => {
    let vaildVal = handleInvalidValue(num);
    setValueTargets(vaildVal);
  };

  // Deployment minutes
  const [valueMinutes, setValueMinutes] = useState<
    number | string | Array<number | string>
  >(FREE_MINUTES);

  const handleSliderChangeMinutes = (
    event: any,
    newValueMinutes: number | number[]
  ) => {
    setValueMinutes(newValueMinutes);
  };

  const handleBlurMinutes = () => {
    if (valueMinutes < 0) {
      setValueMinutes(0);
    } else if (valueMinutes > 10000) {
      setValueMinutes(10000);
    }
  };
  const setValidMinutes = (num: number) => {
    let vaildVal = handleInvalidValue(num);
    setValueMinutes(vaildVal);
  };

  // High Availablity
  const [LastTargetsSliderVal, setLastTargetsSliderVal] = useState(
    FREE_TARGETS
  );
  const [haCheckboxVal, setHaCheckboxVal] = useState(false);
  const isEligibleHA = valueTargets >= HIGH_AVAILABILITY_TARGETS;
  const renderHaChecked = haCheckboxVal || isEligibleHA;
  const highAvailabilityCheck = (e: { target: { checked: any } }) => {
    // Updating checkbox state
    const newHaCheckboxVal = e.target.checked;
    setHaCheckboxVal(newHaCheckboxVal);
    // [ ] => [x]
    if (newHaCheckboxVal) {
      // Set high availablility value
      if (valueTargets < HIGH_AVAILABILITY_TARGETS) {
        setValueTargets(HIGH_AVAILABILITY_TARGETS);
      }
    } else {
      // [x] => [ ]
      // Reset to user's last input value
      setValueTargets(LastTargetsSliderVal);
    }
  };

  // Calculations
  const calcChargedTargets = (valueTargets: any) => {
    if (isChargedTargets(valueTargets)) {
      return valueTargets - FREE_TARGETS;
    } else {
      return 0;
    }
  };

  const calcChargedMinutes = (valueMinutes: any) => {
    if (isChargedMinutes(valueMinutes)) {
      return valueMinutes - FREE_MINUTES;
    } else {
      return 0;
    }
  };

  const targetsPrice = calcChargedTargets(valueTargets) * COST_PER_TARGET;
  const minutesPrice = calcChargedMinutes(valueMinutes) * COST_PER_MINUTE;
  const totalPrice = targetsPrice + minutesPrice;

  return (
    <>
      <Box>
        <h2>Cloud</h2>
        <p className="pricing__subtitle">
          DevOps automation as-a-service
        </p>
        <hr className="pricing__divider"></hr>
        <p className="pricing__description-title">
          Pay-as-you-go
        </p>
        <p className="pricing__description">
          Charges are calculated monthly in arrears based on actual usage. Use the calculator below for a price indication.
        </p>
        <p className="pricing__price">
          <span>
            {formatCcy(totalPrice)}
            <sup>*</sup>
          </span>
          <span>/mo estimated</span>
        </p>

        <Grid item className="push-down-m">
          <div className={classes.root}>
            <div className="slider__min-max">
              <span className="slider__start">0</span>
              <span className="slider__end">5000</span>
            </div>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof valueTargets === "number" ? valueTargets : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={10}
                  max={5000}
                />
              </Grid>
            </Grid>
            <Grid item>
                <Input
                  className={classes.input}
                  value={valueTargets}
                  margin="dense"
                  onChange={(e) =>
                    updateUserTargets(parseInt(e.target.value, 10))
                  }
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 10,
                    max: 5000,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
                <Typography>
                  {valueTargets <= FREE_TARGETS
                    ? `deployment targets`
                    : "deployment targets "}
                </Typography>
              </Grid>
          </div>
          <div className={classes.root}>
            <div className="slider__min-max push-up-m">
              <span className="slider__start">0</span>
              <span className="slider__end">10000</span>
            </div>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof valueMinutes === "number" ? valueMinutes : 0}
                  onChange={handleSliderChangeMinutes}
                  aria-labelledby="input-slider-minutes"
                  min={100}
                  max={10000}
                />
              </Grid>
            </Grid>
            <Grid item>
                <Input
                  className={classes.input}
                  value={valueMinutes}
                  margin="dense"
                  onChange={(e) =>
                    setValidMinutes(parseInt(e.target.value, 10))
                  }
                  onBlur={handleBlurMinutes}
                  inputProps={{
                    step: 10,
                    min: 100,
                    max: 10000,
                    type: "number",
                    "aria-labelledby": "input-slider-minutes",
                  }}
                />
                <Typography>
                  {valueMinutes <= FREE_TARGETS
                    ? ` free deployment minutes `
                    : "deployment minutes "}
                </Typography>
              </Grid>
          </div>
        </Grid>
        <a href="#" className="link">How do I know what I approx. will spend?</a>
        <hr className="pricing__divider"></hr>
      </Box>
    </>
  );
};
export default CloudPricing;
