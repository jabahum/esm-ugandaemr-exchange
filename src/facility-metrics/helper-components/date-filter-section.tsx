import React, { useEffect, useState } from "react";
import {
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
} from "@carbon/react";
import dayjs from "dayjs";
import { formatDate } from "@openmrs/esm-framework";
import styles from "../hie-metrics/hie-dashboard.scss";

const DateFilterInput = (props) => {
  // const { setStartDate, setEndDate } = props;
  return (
    <DatePicker
      datePickerType="range"
      className={styles.datePicker}
      aria-label="Date Range Filter"
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
  );
};

export const DateFilterSection = (props) => {
  // const { startDate, endDate, setStartDate, setEndDate } = props;
  const [dateRangeSelection, setDateRangeSelection] = useState("today");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const handleOnchangeSelector = (value) => {
    if (value === "today") {
      setShowDateFilter(false);
    } else {
      setShowDateFilter(true);
    }
    setDateRangeSelection(value);
  };
  return (
    <>
      <div className={styles.dateFilterSection}>
        <div className={styles.dateRangeSelector}>
          <RadioButtonGroup
            legendText=""
            name="radio-button-group"
            defaultSelected="today"
            onChange={handleOnchangeSelector}
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
      {showDateFilter ? <DateFilterInput /> : null}
    </>
  );
};
