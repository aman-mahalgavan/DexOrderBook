import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class buyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            btcAmount: 0,
            krwAmount: 0,
            body: '',
            OrderValue: this.btcAmount > 0 && this.krwAmount > 0  ? this.btcAmount * this.krwAmount : 0,
            buyingFee: 0
        }
        this.onChangeBTC = this.onChangeBTC.bind(this);
        this.onChangeKRW = this.onChangeKRW.bind(this);
    }

    onChangeBTC(e) {
        // let n = e.target.name;
        let v = e.target.value;
        // this.setState(function (prevState, props) {
        //     this.state.btcAmount = v !== "" ? v : 0
        // });
        this.setState({
            btcAmount : v !== "" ? v : 0
        })
        this.props.updateBuyBtc("btc", this.state.btcAmount);
    }
    onChangeKRW(e) {
        let n = e.target.name;
        let v = e.target.value;
        // this.setState(function (prevState, props) {
        //     this.state.krwAmount = v !== "" ? v : 0
        // });
        this.setState({
            krwAmount : v !== "" ? v : 0
        })
        this.props.updateBuyBtc("krw", this.state.krwAmount);
    }

    getValidationState() {
        return this.state.btcAmount < 1 ? 'error' : 'success';
        // if (length > 10) return 'success';
        // else if (length > 5) return 'warning';
        // else if (length > 0) return 'error';
        // return null;
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitting Form -> ", e.target.values);
    }


    render() {
        return (
            <div style={{ width: "500px", textAlign: "center", margin: "auto" }}>
                <Form>
                    <FormGroup
                        controlId="btcAmount"
                        style={{ marginTop: "10px", marginBottom: "10px"}}
                    >
                        <ControlLabel style={{ display: "inline", marginRight: "20px" }}>Buy Amount (BTC)</ControlLabel>
                        <FormControl
                            type="number"
                            name="btcAmount"
                            min={1}
                            value={this.state.btcAmount}
                            style={{ display: "inline", width: "55%" }}
                            placeholder="How many Bitcoins would you like to buy?"
                            onChange={this.onChangeBTC}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup
                        controlId="krwAmount"
                        style={{ borderBottom: "5px solid red", marginTop: "10px", marginBottom: "10px", paddingBottom: "10px"
                    }}
                    >
                        <ControlLabel style={{ display: "inline", marginRight: "20px"}}>Price Per (KRW)</ControlLabel>
                        <FormControl
                            type="number"
                            name="krwAmount"
                            min={1}
                            value={this.state.krwAmount}
                            style={{ display: "inline", width: "55%" }}
                            placeholder="Buy Bitcoins worth?"
                            onChange={this.onChangeKRW}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <div id="fee" style={{ display: "block", height: "40px" }}>
                        <span style={{ float: "left" }}>
                            Fee:
                        </span>
                        <span style={{ float: "right" }}>
                            {this.state.buyingFee}
                        </span>
                    </div>
                    <div id="orderVal" style={{ display: "block", marginTop: "10px", marginBottom: "10px", height: "40px" }}>
                        <span style={{ float: "left" }}>
                            Order:
                        </span>
                        <span style={{ float: "right" }}>
                            {this.state.OrderValue}
                        </span>
                    </div>
                    <div style={{ width: "500px", textAlign: "center", margin: "auto", display: "block" }}>
                        <Button className="btn btn-default btn-md col-sm-4">Reset</Button>
                        <Button className="btn btn-danger btn-md col-sm-6 col-sm-offset-1 btn btn-default" onClick={this.buyBitcoin}>Buy</Button>
                    </div>
                </Form>

            </div >
        )
    }
}

// buyForm.propTypes = {

// }
const mapStateToProps = state => ({
    // data: state.data.data
});

// const mapDispatchToProps = dispatch => ({
//     simpleAction: () => dispatch(simpleAction()),
//     alertSuccess: () => dispatch(alertActions("ALERT_SUCCESS"))
// });

export default connect(mapStateToProps, null)(buyForm);