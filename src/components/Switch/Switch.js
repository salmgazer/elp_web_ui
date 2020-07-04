import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchLabels= (props) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  console.log(handleChange)

  return (
    <FormGroup row>

      <FormControlLabel control={<Switch color="primary" size="small" />} label={props.label} style={props.style}/>
    </FormGroup>
  );
}
export default SwitchLabels;