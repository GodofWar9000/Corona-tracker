import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ReactExport from 'react-export-excel';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import buttonsCss from '../../css/buttons';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;

// Pre-defined dataset for export
const dataSet = [
  {
    columns: [
      'Date',
      'Daily Feeling',
      'Daily Symptoms Feeling',
      'Daily Compared to Yesterday',
      'Fever Severity',
      'Shortness of Breath Severity',
      'Chills Severity',
      'Cough Severity',
      'Chest Pain Severity',
      'Fatigue Severity',
      'Sore Throat Severity',
      'Bluishness Severity',
      'Open Comment',
    ],
    data: [],
  },
];

const useStyles = makeStyles(theme => ({
  export: { ...buttonsCss.buttons, margin: theme.spacing(1) },
}));

const Download = props => {
  const { observations } = props;
  const classes = useStyles();

  // Add all of our current observations to the data set
  useEffect(() => {
    observations.map(observation => {
      const temp = [
        new Date(observation.date).toISOString().slice(0, 10),
        observation.physical.dailyfeeling,
        observation.physical.dailySymptomsFeeling,
        observation.physical.dailyComparedToYesterday,
        observation.physical.feverSeverity,
        observation.physical.shortnessOfBreathSeverity,
        observation.physical.chillsSeverity,
        observation.physical.coughSeverity,
        observation.physical.chestPainSeverity,
        observation.physical.fatigueSeverity,
        observation.physical.soreThroatSeverity,
        observation.physical.bluishnessSeverity,
        observation.nonPhysical.openComment,
      ];
      dataSet[0].data.push(temp);
      return temp;
    });
  });

  // Download Excel file of our observations
  return (
    <ExcelFile element={<Button className={classes.export}>Export to Excel</Button>}>
      <ExcelSheet dataSet={dataSet} name="Observations" />
    </ExcelFile>
  );
};

Download.propTypes = {
  observations: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => {
  return {
    observations: state.observationsReducer.observations,
  };
};

export default connect(mapStateToProps)(Download);
