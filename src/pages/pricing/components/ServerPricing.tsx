import * as React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Box, Grid, Input, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatCcy, handleInvalidValue } from "../../../utils";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const FREE_TARGETS = 10;
const COST_PER_TARGET = 10;
const HIGH_AVAILABILITY_TARGETS = 100;
const UNLIMITED_TARGETS = 2001;
const UNLIMITED_PRICE = "192,000";

const isChargedTargets = (valueTargets: number | string): boolean => {
  return valueTargets > FREE_TARGETS;
};

const ServerPricing = () => {
  // Styling
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

  // Unlimited Targets
  const [
    unlimitedTargetsCheckboxVal,
    setUnlimitedTargetsCheckboxVal,
  ] = useState(false);
  const isEligibleUnlimited = valueTargets >= UNLIMITED_TARGETS;
  const renderUnlimitedTargetsChecked =
    unlimitedTargetsCheckboxVal || isEligibleUnlimited;
  const unlimitedTargetsCheck = (e: { target: { checked: any } }) => {
    // Updating checkbox state
    const newUnlimitedTargetsCheckboxVal = e.target.checked;
    setUnlimitedTargetsCheckboxVal(newUnlimitedTargetsCheckboxVal);
    // [ ] => [x]
    if (newUnlimitedTargetsCheckboxVal) {
      // Set unlimited target value
      if (valueTargets < UNLIMITED_TARGETS) {
        setValueTargets(UNLIMITED_TARGETS);
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

  const targetsPrice = calcChargedTargets(valueTargets) * COST_PER_TARGET;
  const totalPrice = targetsPrice;

  return (
    <>
      <Box>
        <h2>Server</h2>
        <p className="pricing__subtitle">
          Octopus on your infrastructure
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
            {renderUnlimitedTargetsChecked
              ? UNLIMITED_PRICE
              : formatCcy(totalPrice)}
            <sup>*</sup>
          </span>
          <span>/mo estimated</span>
        </p>

        <Grid item className="push-down-l-m">
          <div className={classes.root}>
            <div className="slider__min-max">
              <span className="slider__start">0</span>
              <span className="slider__end">Unlimited</span>
            </div>
            {renderUnlimitedTargetsChecked ? null : (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={valueTargets}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={10}
                    max={2000}
                  />
                </Grid>
              </Grid>
            )}
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
                  max: 2000,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
              <Typography>
                {renderUnlimitedTargetsChecked
                  ? `unlimited deployment targets`
                  : "deployment targets "}
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
export default ServerPricing;
