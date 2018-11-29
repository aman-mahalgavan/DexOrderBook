import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOwner } from '../actions/actions';
// import { Button, Form, InputGroup } from 'react-bootstrap';
import { Button, TextField, Typography, MenuItem } from '@material-ui/core';
const styles = {
    heading: {

    },
    textField: {

    }
}

class AddOwner extends Component {
    constructor(props){
        super(props);
        this.state = {
            owners : [
                "(0) 0xd2d314a28113162496be361372b9fc1d9d66ef74 (~100 ETH)",
                "0|ganache- | (1) 0x05aa12902c61db3e0a2c72d05aa0b817d29d27d8 (~100 ETH)",
                "0|ganache- | (2) 0x41869fd59081f919ddb102ac1c7b4a4664fe54cb (~100 ETH)",
                "0|ganache- | (3) 0xd08dfe81222ac3099de8fc590d78a057e6b7b82c (~100 ETH)",
                "0|ganache- | (4) 0x23c2cbf43bc52ec83dc193eaa0ea5327cdba625d (~100 ETH)",
                "0|ganache- | (5) 0xea3ce1deabdef407cd711d0d225047b479cf62b6 (~100 ETH)",
                "0|ganache- | (6) 0x5874802be836b26cf8f9e7552597d02f2481705b (~100 ETH)",
                "0|ganache- | (7) 0x3ba7e2cf959fdc50cab4345969873c57fe025573 (~100 ETH)",
                "0|ganache- | (8) 0x52452dc4abcd9e660cb4fdaa01e38e5154f01d28 (~100 ETH)",
                "0|ganache- | (9) 0x9878949a8cea1f5dd5ed798824d0fc96a4fad57f (~100 ETH)"
            ],
            value: '',
            ownerName: '',
            amount: 0
        };
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
    }
    handleChange = (event) => {
        // this.ownerName = event;
        this.setState({ownerName : event.target.value});
    }
    self = this;
    handleAmountChange = (event) => {
        this.setState({amount : +event.target.value})
    }
    handleOwnerChange = (event) => {
        this.setState({ownerName : event.target.value})
    }
    submit = () => {
        this.props.action(this.state.ownerName, this.state.amount);
    }
    render() {
        return (
            <div style={this.props.style}>
                <Typography style={styles.heading}>
                    {this.props.heading}
                </Typography>
                {/* <TextField
                    id="standard-with-placeholder"
                    label={this.props.textFieldLabel}
                    placeholder={this.props.placeholder}
                    // className={styles.textField}
                    onChange={this.handleChange}
                    margin="normal"
                /> */}
                <TextField
                    id="standard-number"
                    label="Amount"
                    value={this.state.amount}
                    onChange={this.handleAmountChange}
                    type="number"
                    // className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    // className={classes.textField}
                    value={this.state.ownerName}
                    onChange={this.handleOwnerChange}
                    SelectProps={{
                        // MenuProps: {
                        //     className: (){width: 200},
                        // },
                    }}
                    helperText="Please select an Owner"
                    margin="normal"
                >
                    {this.state.owners.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button onClick={this.submit}>Add Owner</Button>
            </div>
        )
    }
}

AddOwner.propTypes = {
    action: PropTypes.func,
    placeholder: PropTypes.string,
    heading: PropTypes.string,
    textFieldLabel: PropTypes.string
}



// export default AddOwner;
const mapDispatchToProps = (dispatch) => {
    return {
        addOwner: (owner, amount) => dispatch(addOwner(owner, amount))
    }
}

export default connect(null, mapDispatchToProps)(AddOwner);