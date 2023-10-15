import React from "react";
import {
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
  Button,
} from "@carbon/react";
import { Intersect } from "@carbon/react/icons";
import styles from "../hie-metrics/hie-dashboard.scss";

const DateFilterInput = (props) => {
  const { handleOnChange, updateTransactions } = props;
  return (
    <div className={styles.datePicker}>
      <DatePicker
        datePickerType="range"
        aria-label="Date Range Filter"
        onChange={handleOnChange}
      >
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="sm"
        />
        <DatePickerInput
          id="date-picker-input-id-end"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="sm"
        />
      </DatePicker>
      <Button size="sm" kind="tertiary" onClick={updateTransactions}>
        <Intersect />
        <span> Update</span>
      </Button>
    </div>
  );
};

export const DateFilterSection = (props) => {
  const {
    dateRangeSelection,
    showDateFilter,
    handleOnchangeSelector,
    handleOnChangeRange,
    updateTransactions,
  } = props;

  return (
    <>
      <div className={styles.dateFilterSection}>
        <div className={styles.dateRangeSelector}>
          <RadioButtonGroup
            legendText=""
            name="radio-button-group"
            defaultSelected="today"
            onChange={handleOnchangeSelector}
            valueSelected={dateRangeSelection}
            hideLabel={true}
          >
            <RadioButton
              labelText="Today"
              value="today"
              id="date-selection-today"
            />
            <RadioButton
              labelText="Custom Range"
              value="custom range"
              id="date-selection-custom-range"
            />
          </RadioButtonGroup>
        </div>
      </div>
      {showDateFilter ? (
        <DateFilterInput
          handleOnChange={handleOnChangeRange}
          updateTransactions={updateTransactions}
        />
      ) : null}
    </>
  );
};
