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
              <span className="slider__start">10</span>
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
              <div className="pricing__tooltip">O
                <span className="tooltiptext">
                  <ul>
                    <li>High availability feature will only be included in plan with more than 100 deployment targets.</li>
                    <li>Each additional target is charged at $10 p/mo.</li>
                    <li>Each additional charged target comes with 10 free deployment min p/mo.</li>
                  </ul>
                </span>
              </div>
              <svg className="icon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"/>
              </svg>
            </Grid>
          </div>
        </Grid>
        <p className="pricing__avg-usage">Avg. usage for <strong>medium teams</strong>(50-100 people)</p>
        <hr className="pricing__divider"></hr>
      </Box>
    </>
  );
};
export default ServerPricing;
