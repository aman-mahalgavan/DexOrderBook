import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextField, FormControl, InputLabel, OutlinedInput } from "@material-ui/core";

const styles = {
    root: {
        // background: "lightgrey",
        outlineColor: "white",
        color: "white",
        width: "70%"
    },
    input: {
        outlineColor: "white",
        color: "white"
    },
    formControl: {
        margin: 10
    }
};
// const styles = theme => ({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     formControl: {
//       margin: theme.spacing.unit,
//     },
//   });

const self = this;
function CustomTextField(props) {
    const { classes, fieldId, placeholderText, marginType, variantType, labelText } = props;

    return (
        <TextField
        id={fieldId}
          label={labelText}
          className={classes.root}
        //   helperText="Some important text"
          margin={marginType}
        />
        // <TextField
        //     id={fieldId}
        //     // defaultValue="color"
        //     className={classes.root}
        //     InputProps={{
        //         classes: {
        //             root: classes.input,
        //             focused: classes.input,
        //             notchedOutline: classes.input
        //         }
        //     }}
        //     InputLabelProps={{
        //         // classes: {
        //         //   root: classes.inputLabel,
        //         //   focused: classes.inputLabel,
        //         // },
        //         className: classes.input
        //       }}
        //     placeholder= {placeholderText}
        //     margin= {marginType}
        //     variant = {variantType}
        //     label= {labelText}
        // />
       
    );
}

CustomTextField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTextField);

/*  <TextField
                                    id="standard-with-placeholder"
                                    label= {`Deposit ${this.state.token1}`} 
                                    placeholder="Deposit Amount"
                                    InputLabelProps={{
                                        color: "white", borderColor: "white", outlineColor: 
                                      }}
                                    //   InputProps={{
                                    //     classes: {
                                    //       root:{color: "white", borderColor: "white"},
                                    //       focused: {color: "white", borderColor: "white"},
                                    //       notchedOutline:{color: "white", borderColor: "white"},
                                    //     },
                                    //   }}
                                    // className={{color: "white", borderColor: "white"}}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width: "70%", color: "white", borderColor: "white", outlineColor: "white"}}
                                /> */