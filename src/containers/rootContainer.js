import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Button, Grid, TextField, Input, InputLabel, Tabs, Tab, AppBar } from '@material-ui/core';
import { getOwners, getAccounts, addOwner, getProductInfo, getProductsList } from '../actions/actions';
import SimpleDialogWrapped from '../components/dialog';
import PrimarySearchAppBar from '../components/navbar';
import CustomTextField from '../components/customTextField';

function TabContainer(props) {
    return (
        // <Typography component="div" style={{ padding: 8 * 3 }}>
        <Typography component="div" style={{ width: "100%" }}>
            {props.children}
        </Typography>
    );
}

class RootContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TopContainerTabId: 0,
            BottomContainerTabId: 0,
            token1: '-',
            token2: '-',
            name: '',
            name1: '',
            products: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.handleInput1 = this.handleInput1.bind(this);
        this.formSubmit1 = this.formSubmit1.bind(this);
    }

    componentDidMount() {
        // let sampleData = {
        //     "owner": "0xD2D314a28113162496BE361372B9Fc1d9D66Ef74",
        //     "product": "0x0947b0e6D821378805c9598291385CE7c791A6B2"
        // }
        this.props.getProductsList();
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({products: nextProps.allProducts});
    }

    handlePopup = (type) => {
        switch (type) {
            case type:
                break;
            default:
                break;
        }
    };

    handleTopContainerTabChange = (event, value) => {
        this.setState({ TopContainerTabId: value });
    };

    handleBottomContainerTabChange = (event, value) => {
        this.setState({ BottomContainerTabId: value });
    };

    handleInput(event) {
        console.log(event.target.value);
        this.setState({ name: event.target.value });
    }

    handleToken1Change = (val) => {
        this.setState({ token1: val });
    }
    handleToken2Change = (val) => {
        this.setState({ token2: val });
    }

    formSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }

    handleInput1(event) {
        console.log(event.target.value);
        this.setState({ name1: event.target.value });
    }

    formSubmit1(event) {
        alert('A name was submitted: ' + this.state.name1);
        event.preventDefault();
    }

    depositToken1FormSubmit = () => {

    }

    depositToken2FormSubmit = () => {

    }

    withdrawToken1FormSubmit = () => {

    }

    withdrawToken2FormSubmit = () => {

    }

    transferToken1FormSubmit = () => {

    }

    transferToken2FormSubmit = () => {

    }

    buyFormSubmit = () => {

    }

    sellFormSubmit = () => {

    }

    render() {
        return (
            <div style={styles.root}>
                {this.state.products ? 
                    <PrimarySearchAppBar data={this.state.products} changeToken1={this.handleToken1Change} changeToken2={this.handleToken2Change} />
                    : 
                    null}
                
                <pre>
                    {"Data here ->" + JSON.stringify(this.props.allProducts)}
                </pre>

                <Grid container direction="row">
                    {/* Left Panel */}
                    <Grid item direction="column" xs={4}>
                        {/* Top Container */}
                        <Grid style={styles.innerContainer} item xs={12}>
                            <h4>Balance</h4>
                            <Grid container>
                                <AppBar position="static" style={{ backgroundColor: 'transparent', color: 'black', width: "100%", textAlign: "center", boxShadow: "none", borderBottom: "1px solid #ccc" }}>
                                    <Tabs value={this.state.TopContainerTabId} onChange={this.handleTopContainerTabChange}>
                                        <Tab style={styles.blackText} label="Deposit" />
                                        <Tab style={styles.blackText} label="Withdraw" />
                                        <Tab style={styles.blackText} label="Transfer" />
                                    </Tabs>
                                </AppBar>
                                {this.state.TopContainerTabId === 0 && <TabContainer>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Token</h6>
                                            <h6 style={styles.blackText}>{this.state.token1}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Wallet</h6>
                                            <h6 style={styles.blackText}>{"Wallet - " + this.state.token1}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>EtherDelta</h6>
                                            <h6 style={styles.blackText}>EtherDelta Value</h6>
                                        </Grid>
                                        <form onSubmit={this.depositToken1FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token1}`}
                                                placeholderText={"Deposit Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Deposit ${this.state.token1}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Deposit</Button>
                                        </form>

                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{this.state.token2}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{"Wallet - " + this.state.token2}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>EtherDelta Value</h6>
                                        </Grid>
                                        <form onSubmit={this.depositToken2FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token2}`}
                                                placeholderText={"Deposit Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Deposit ${this.state.token2}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Deposit</Button>
                                        </form>
                                    </Grid>
                                </TabContainer>}

                                {this.state.TopContainerTabId === 1 && <TabContainer>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Token</h6>
                                            <h6 style={styles.blackText}>{this.state.token1}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Wallet</h6>
                                            <h6 style={styles.blackText}>{"Wallet - " + this.state.token1}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>EtherDelta</h6>
                                            <h6 style={styles.blackText}>EtherDelta Value</h6>
                                        </Grid>
                                        <form onSubmit={this.withdrawToken1FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token1}`}
                                                placeholderText={"Withdraw Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Withdraw ${this.state.token1}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Withdraw</Button>
                                        </form>

                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{this.state.token2}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{"Wallet - " + this.state.token2}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>EtherDelta Value</h6>
                                        </Grid>
                                        <form onSubmit={this.withdrawToken2FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token2}`}
                                                placeholderText={"Withdraw Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Withdraw ${this.state.token2}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Withdraw</Button>
                                        </form>

                                    </Grid>
                                </TabContainer>}

                                {this.state.TopContainerTabId === 2 && <TabContainer>

                                    <Grid container>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Token</h6>
                                            <h6 style={styles.blackText}>{this.state.token1}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Wallet</h6>
                                            <h6 style={styles.blackText}>{"Wallet - " + this.state.token1}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>EtherDelta</h6>
                                            <h6 style={styles.blackText}>EtherDelta Value</h6>
                                        </Grid>
                                        <form onSubmit={this.transferToken1FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token1}`}
                                                placeholderText={"Transfer Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Transfer ${this.state.token1}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Transfer</Button>
                                        </form>

                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{this.state.token2}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{"Wallet - " + this.state.token2}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>EtherDelta Value</h6>
                                        </Grid>
                                        <form onSubmit={this.transferToken2FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token2}`}
                                                placeholderText={"Transfer Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Transfer ${this.state.token2}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Transfer</Button>
                                        </form>

                                    </Grid>
                                </TabContainer>}
                            </Grid>

                        </Grid>
                        {/* Bottom Container */}
                        <Grid style={styles.innerContainer} item xs={12}>
                            <h4>Buy/Sell</h4>
                            <Grid container>
                                <AppBar position="static" style={{ backgroundColor: 'transparent', color: 'black', width: "100%", textAlign: "center", boxShadow: "none", borderBottom: "1px solid #ccc" }}>
                                    <Tabs value={this.state.BottomContainerTabId} onChange={this.handleBottomContainerTabChange}>
                                        <Tab label="Buy Order" />
                                        <Tab label="Sell Order" />
                                    </Tabs>
                                </AppBar>
                                {this.state.BottomContainerTabId === 0 && <TabContainer>
                                    <Grid container>
                                        <form onSubmit={this.buyFormSubmit} style={{ width: "100%" }}>
                                            {/* Amount to Buy
                                            Price
                                            Total */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Amount"
                                                    label="Amount to Buy"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Amount"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Price"
                                                    label="Price"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Rate"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Total"
                                                    label="Total"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Total Amount"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Expires"
                                                    label="Expires"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Time"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Button variant="contained" color="primary" style={{ padding: "10.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "100%" }}>Buy Order</Button>
                                        </form>
                                    </Grid>
                                </TabContainer>}

                                {this.state.BottomContainerTabId === 1 && <TabContainer>
                                    <Grid container>
                                        <form onSubmit={this.sellFormSubmit} style={{ width: "100%" }}>
                                            {/* Amount to Buy
                                            Price
                                            Total */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Amount"
                                                    label="Amount to Sell"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Amount"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Price"
                                                    label="Price"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Rate"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Total"
                                                    label="Total"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Total Amount"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="field-Expires"
                                                    label="Expires"
                                                    style={{ margin: 8, width: "100%" }}
                                                    placeholder="Time"
                                                    // helperText="Full width!"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                            </Grid>
                                            <Button variant="contained" color="secondary" style={{ padding: "10.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "100%" }}>Sell Order</Button>
                                        </form>
                                    </Grid>
                                </TabContainer>}
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Right Panel */}
                    <Grid item direction="column" xs={4}>
                        {/* Top Container */}
                        <Grid style={styles.innerContainer} item xs={4}>
                            Hello
                        </Grid>

                        {/* Bottom Container */}
                        <Grid style={styles.innerContainer} item xs={4}>
                            Hello
                        </Grid>
                    </Grid>
                </Grid>

            </div>

        )
    }
}

const styles = {
    root: {
        flexGrow: 1,
        fontSize: 30,
        backgroundColor: 'metalgrey',
    },
    innerContainer: {
        padding: '1%',
        backgroundColor: '#fff',
        border: "1px solid #fafafa",
        width: "500px !important",
        // backgroundColor:'#242739', 
        // backgroundColor:'rgb(5, 28, 70)', 
        color: '#000'
    },
    whiteText: {
        color: "#fff"
    },
    backText: {
        color: "#000"
    }
};

const mapStateToProps = (state) => ({
    // allOwners: state.ownersList,
    productInfo: state.productInfo,
    allProducts: state.productsList
    // owners: state.ownersList
})

const mapDispatchToProps = (dispatch) => {
    return {
        getProductInfo: (ownerAddress, productAddress) => dispatch(getProductInfo(ownerAddress, productAddress)),
        getProductsList: () => dispatch(getProductsList()),
        // addOwner: (owner, amount) => dispatch(addOwner(owner, amount)),
        // getOwners: () => dispatch(getOwners()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);


