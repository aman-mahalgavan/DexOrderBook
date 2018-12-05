import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Button, Grid, Tabs, Tab, AppBar, Card } from '@material-ui/core';
import { getProductInfo, getProductsList, depositETH, getBalance, depositERC20, BuyOrder, SellOrder, fetchOrderBook, withdrawERC20, generateOwner, getEther } from '../actions/actions';
// import SimpleDialogWrapped from '../components/dialog';
import PrimarySearchAppBar from '../components/navbar';
import CustomTextField from '../components/customTextField';
// import { actionChannel } from 'redux-saga/effects';

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
        this.owner = "0x5465e5577311757fab88542bc610b9d9a6bc2af2";
    }

    componentDidMount() {
        let sampleData = {
            "owner": this.owner,
            "product": "0x05f4a42e251f2d52b8ed15E9FEdAacFcEF1FAD27",
            "product1": "0x920ba83ab81d0A0029Db518059564e7846c2A0CE"
        }
        // this.props.depositERC20(sampleData.owner, sampleData.product1, 1000);
        // this.props.getProductsList();
        // this.props.getBalance(sampleData.owner, sampleData.product);
        // this.props.depositETH(sampleData);
    }

    // componentWillReceiveProps = (nextProps) => {
    // }
    
    componentDidUpdate = (prevProps) => {
        if(this.props.allProducts !== prevProps.allProducts){
            this.setState({products: this.props.allProducts});
        }
        if(this.props.balance1 !== prevProps.balance1){
            this.setState({balance1: this.props.balance1});
            this.fetchOrderBook();
        }
        if(this.props.balance2 !== prevProps.balance2){
            this.setState({balance2: this.props.balance2});
            this.fetchOrderBook();
        }
        if(this.props.ownerETHAddress !== prevProps.ownerETHAddress){
            this.setState({owner: this.props.ownerETHAddress});
        }
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

    formSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }

    handleInput1(event) {
        this.setState({ name1: event.target.value });
    }

    formSubmit1(event) {
        alert('A name was submitted: ' + this.state.name1);
        event.preventDefault();
    }

    handleToken1Change = (val) => {
        this.setState({ token1: val.token1 });
        let owner = this.owner;
        let product = val.token1.code;
        this.props.getBalance(owner, product, 'token1');
    }
    handleToken2Change = (val) => {
        this.setState( (state, props) => { return {token2 : val.token2} });
        let owner = this.owner;
        let product = val.token2.code;
        this.props.getBalance(owner, product, 'token2');
    }

    handleToken1DepositValueChange = (e) => {
        // console.log("CHANGING DEPOSIT INPUT ------------>>>>>> ", e.target.value);
        this.setState({token1DepositAmount: e.target.value});
    }
    
    handleToken2DepositValueChange = (e) => {
        this.setState({token2DepositAmount: e.target.value});
    }
    
    handleToken1WithdrawValueChange = (e) => {
        this.setState({token1WithdrawAmount: e.target.value});
    }
    
    handleToken2WithdrawValueChange = (e) => {
        this.setState({token2WithdrawAmount: e.target.value});
    }

    depositToken1FormSubmit = (event) => {
        event.preventDefault();
        let owner = this.owner;
        let product = this.state.token1.value;
        let productCode = this.state.token1.code;
        let amount = this.state.token1DepositAmount;
        this.props.depositERC20(owner, product, amount);
        this.props.getBalance(owner, productCode, 'token1');
    }

    depositToken2FormSubmit = (event) => {
        event.preventDefault();
        let owner = this.owner;
        let product = this.state.token2.value;
        let amount = this.state.token2DepositAmount;
        let productCode = this.state.token2.code;
        this.props.depositERC20(owner, product, amount);
        this.props.getBalance(owner, productCode, 'token2');
    }

    withdrawToken1FormSubmit = (event) => {
        event.preventDefault();
        let owner = this.owner;
        let product = this.state.token1.value;
        let productCode = this.state.token1.code;
        let amount = this.state.token1WithdrawAmount;
        this.props.withdrawERC20(owner, product, amount);
        this.props.getBalance(owner, productCode, 'token1');
    }

    withdrawToken2FormSubmit = (event) => {
        event.preventDefault();
        let owner = this.owner;
        let product = this.state.token2.value;
        let amount = this.state.token2WithdrawAmount;
        let productCode = this.state.token2.code;
        this.props.withdrawERC20(owner, product, amount);
        this.props.getBalance(owner, productCode, 'token2');
    }

    transferToken1FormSubmit = () => {

    }

    transferToken2FormSubmit = () => {

    }

    fetchOrderBook = () => {
        let defaultOrderBookLimit = 10;
        let owner = this.owner;
        let prTrade = this.state.token2.code;
        let prBase = this.state.token1.code;
        
        if(prTrade && prBase){
            this.props.fetchOrderBook(owner, prTrade, prBase, defaultOrderBookLimit);
        }else{
            console.log("Please select both tokens --> ", prTrade, prBase, this.state);
        }
    }

    handleBuyValueChange = (e) => {
        this.setState({buyingPrice: Number(e.target.value)});
    }
    
    handleBuyQuantityChange = (e) => {
        this.setState({buyingQuantity: Number(e.target.value)});
    }
    
    handleSellValueChange = (e) => {
        this.setState({sellingPrice: Number(e.target.value)});
    }
    
    handleSellQuantityChange = (e) => {
        this.setState({sellingQuantity: Number(e.target.value)});
    }

    buyFormSubmit = (event) => {
        event.preventDefault();
        let owner = this.owner;
        let ownerId = 1;
        let prTrade = this.state.token1.code;
        let prBase = this.state.token2.code;
        let sell = false;
        let price = this.state.buyingPrice;
        let qty =  this.state.buyingQuantity;

        // console.log("Buying Params --> ", {owner, ownerId, prTrade, prBase, price, qty, sell});
        this.props.buyOrder(owner, ownerId, prTrade, prBase, price, qty, sell);
    }

    sellFormSubmit = (event) => {
        event.preventDefault();
        let owner = this.owner;
        let ownerId = 1;
        let prTrade = this.state.token1.code;
        let prBase = this.state.token2.code;
        let sell = true;
        let price = this.state.sellingPrice;
        let qty =  this.state.sellingQuantity;

        // console.log("Selling Params --> ", {owner, ownerId, prTrade, prBase, price, qty, sell});
        this.props.sellOrder(owner, ownerId, prTrade, prBase, price, qty, sell);
    }

    constructBook = (o, i, color, flag) => {
        if(Number(o) > 0){
            return (
                    <Grid container style={{width: '100%'}}>
                        <Grid style={{width:'33%', color: color}} item xs={4}>
                            <h6>{o}</h6>
                        </Grid>
                        <Grid style={{width:'33%', color: color}} item xs={4}>
                            <h6>{this.props.orderBook[flag].volume[i]}</h6>
                        </Grid>
                        <Grid style={{width:'33%', color: color}} item xs={4}>
                            <h6>{this.props.orderBook[flag].price[i]}</h6>
                        </Grid>
                    </Grid>
                    

            )
        }
    }

    render() {
        return (
            <div style={styles.root}>
                {/* {`Address -> ${this.props.ethAddress}`} */}
                {this.state.products ? 
                    <PrimarySearchAppBar data={this.state.products} changeToken1={this.handleToken1Change} changeToken2={this.handleToken2Change} />
                    : 
                    <PrimarySearchAppBar data={[]} changeToken1={this.handleToken1Change} changeToken2={this.handleToken2Change} />    
                }
                
                <pre>
                    {"Data here ->" + JSON.stringify(this.props)}
                </pre>

                <Button onClick={() => this.props.generateOwner()}>Generate Owner</Button>
                <Button onClick={() => this.props.getEther(this.state.owner)}>Get ETHER</Button>
                <pre>
                    {"Owner here ->" + JSON.stringify(this.props.ownerETHAddress)}
                    <br/>
                    {"Owner From State ->" + JSON.stringify(this.state.owner)}
                </pre>
                <pre>
                    {"Total Ether ->" + JSON.stringify(this.props.totalEther)}
                </pre>

                <Grid container direction="row">
                    {/* Left Panel */}
                    <Grid item direction="column" xs={6}>
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
                                            <h6 style={[styles.blackText, styles.boldText]}>Token</h6>
                                            <h6 style={styles.blackText}>{this.state.token1.key}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Balance</h6>
                                            <h6 style={styles.blackText}>{`Available - ${this.state.balance1 && this.state.balance1.available ? this.state.balance1.available : null}`}</h6>
                                            <h6 style={styles.blackText}>{`Reserved - ${this.state.balance1 && this.state.balance1.reserve ? this.state.balance1.reserve : null}`}</h6>
                                        </Grid>
                                       
                                        {/* <form onSubmit={this.depositToken1FormSubmit} style={{ width: "100%" }}> */}
                                        <form style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token1.value}`}
                                                placeholderText={"Deposit Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                handleCustomTextFieldChange={this.handleToken1DepositValueChange}
                                                labelText={`Deposit ${this.state.token1.key}`}
                                            />

                                            <Button onClick={this.depositToken1FormSubmit} variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Deposit</Button>
                                        </form>

                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{this.state.token2.key}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{`Available - ${this.state.balance2 && this.state.balance2.available ? this.state.balance2.available : null}`}</h6>
                                            <h6 style={styles.blackText}>{`Reserved - ${this.state.balance2 && this.state.balance2.reserve ? this.state.balance2.reserve : null}`}</h6>
                                        </Grid>
                                       
                                        <form style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token2.value}`}
                                                placeholderText={"Deposit Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                handleCustomTextFieldChange={this.handleToken2DepositValueChange}
                                                labelText={`Deposit ${this.state.token2.key}`}
                                            />

                                            <Button onClick={this.depositToken2FormSubmit} variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Deposit</Button>
                                        </form>
                                    </Grid>
                                </TabContainer>}

                                {this.state.TopContainerTabId === 1 && <TabContainer>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Token</h6>
                                            <h6 style={styles.blackText}>{this.state.token1.key}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Balance</h6>
                                            <h6 style={styles.blackText}>{`Available - ${this.state.balance1 && this.state.balance1.available ? this.state.balance1.available : null}`}</h6>
                                            <h6 style={styles.blackText}>{`Reserved - ${this.state.balance1 && this.state.balance1.reserve ? this.state.balance1.reserve : null}`}</h6>
                                        </Grid>
                                        
                                        <form onSubmit={this.withdrawToken1FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token1.value}`}
                                                placeholderText={"Withdraw Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Withdraw ${this.state.token1.key}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Withdraw</Button>
                                        </form>

                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{this.state.token2.key}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{`Available - ${this.state.balance2 && this.state.balance2.available ? this.state.balance2.available : null}`}</h6>
                                            <h6 style={styles.blackText}>{`Reserved - ${this.state.balance2 && this.state.balance2.reserve ? this.state.balance2.reserve : null}`}</h6>
                                        </Grid>
                                       
                                        <form onSubmit={this.withdrawToken2FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token2.value}`}
                                                placeholderText={"Withdraw Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Withdraw ${this.state.token2.key}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Withdraw</Button>
                                        </form>

                                    </Grid>
                                </TabContainer>}

                                {this.state.TopContainerTabId === 2 && <TabContainer>

                                    <Grid container>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Token</h6>
                                            <h6 style={styles.blackText}>{this.state.token1.key}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>Balance</h6>
                                            <h6 style={styles.blackText}>{`Available - ${this.state.balance && this.state.balance.available ? this.state.balance.available : null}`}</h6>
                                            <h6 style={styles.blackText}>{`Reserved - ${this.state.balance && this.state.balance.reserve ? this.state.balance.reserve : null}`}</h6>
                                        </Grid>
                                       
                                        <form onSubmit={this.transferToken1FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token1.value}`}
                                                placeholderText={"Transfer Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Transfer ${this.state.token1.key}`}
                                            />

                                            <Button variant="contained" color="primary" style={{ padding: "16.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "27%" }}>Transfer</Button>
                                        </form>

                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{this.state.token2.key}</h6>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h6 style={styles.blackText}>{`Available - ${this.state.balance && this.state.balance.available ? this.state.balance.available : null}`}</h6>
                                            <h6 style={styles.blackText}>{`Reserved - ${this.state.balance && this.state.balance.reserve ? this.state.balance.reserve : null}`}</h6>
                                        </Grid>
                                        
                                        <form onSubmit={this.transferToken2FormSubmit} style={{ width: "100%" }}>
                                            <CustomTextField
                                                // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                fieldId={`field- ${this.state.token2.value}`}
                                                token2                                 placeholderText={"Transfer Amount"}
                                                marginType={'normal'}
                                                variantType={'outlined'}
                                                labelText={`Transfer ${this.state.token2.key}`}
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
                                        <form style={{ width: "100%" }}>
                                            {/* Amount to Buy
                                            Price
                                            Total */}
                                            <Grid item xs={12}>
                                                <CustomTextField
                                                    // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                    fieldId={`field-Amount`}
                                                    placeholderText={"Quantity to Buy"}
                                                    marginType={'normal'}
                                                    variantType={'outlined'}
                                                    handleCustomTextFieldChange={this.handleBuyQuantityChange}
                                                    labelText={`Quantity of ${this.state.token1.key} to Buy`}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomTextField
                                                    // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                    fieldId={`field-Price`}
                                                    placeholderText={"Price Per Unit"}
                                                    marginType={'normal'}
                                                    variantType={'outlined'}
                                                    handleCustomTextFieldChange={this.handleBuyValueChange}
                                                    labelText={`Price Per Unit`}
                                                />
                                            </Grid>
                                            
                                            <Button disabled={this.state.token1.code && this.state.token2.code ? false : true} onClick={this.buyFormSubmit} variant="contained" color="primary" style={{ padding: "10.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "100%" }}>Buy Order</Button>
                                        </form>
                                    </Grid>
                                </TabContainer>}

                                {this.state.BottomContainerTabId === 1 && <TabContainer>
                                    <Grid container>
                                        <form style={{ width: "100%" }}>
                                            {/* Amount to Buy
                                            Price
                                            Total */}
                                            <Grid item xs={12}>
                                                <CustomTextField
                                                    // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                    fieldId={`field-Amount`}
                                                    placeholderText={"Quantity to Sell"}
                                                    marginType={'normal'}
                                                    variantType={'outlined'}
                                                    handleCustomTextFieldChange={this.handleSellQuantityChange}
                                                    labelText={`Quantity of ${this.state.token1.key} to Sell`}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomTextField
                                                    // classes={{input: styles.whiteText, inputLabel: styles.backText}}
                                                    fieldId={`field-Price`}
                                                    placeholderText={"Price Per Unit"}
                                                    marginType={'normal'}
                                                    variantType={'outlined'}
                                                    handleCustomTextFieldChange={this.handleSellValueChange}
                                                    labelText={`Price Per Unit`}
                                                />
                                            </Grid>
                                            <Button disabled={this.state.token1.code && this.state.token2.code ? false : true} onClick={this.sellFormSubmit} variant="contained" color="secondary" style={{ padding: "10.5px 14px", marginTop: "17px", marginBottom: "8px", marginLeft: "10px", width: "100%" }}>Sell Order</Button>
                                        </form>
                                    </Grid>
                                </TabContainer>}
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Right Panel */}
                    <Grid item direction="column" xs={6}>
                        <h4>Order Book</h4>
                        {/* Top Container */}
                        <Grid style={styles.innerContainer} item xs={5}>
                            <Card>
                                <Grid container style={{width: '100%'}}>
                                    <Grid style={{width:'33%'}} item xs={4}><h6>Order Number</h6></Grid>
                                    <Grid style={{width:'33%'}} item xs={4}><h6>Volume</h6></Grid>
                                    <Grid style={{width:'33%'}} item xs={4}><h6>Price</h6></Grid>
                                </Grid>                
                                
                                {this.props.orderBook && this.props.orderBook.buy && this.props.orderBook.buy.orderNum && this.props.orderBook.buy.orderNum.map( (o, i) => {
                                    return this.constructBook(o, i, 'red', 'buy');
                                } )}
                            </Card>
                            
                        </Grid>

                        {/* Bottom Container */}
                        <Grid style={styles.innerContainer} item xs={5}>
                            <Card>
                                <Grid container style={{width: '100%'}}>
                                    <Grid style={{width:'33%'}} item xs={4}><h6>Order Number</h6></Grid>
                                    <Grid style={{width:'33%'}} item xs={4}><h6>Volume</h6></Grid>
                                    <Grid style={{width:'33%'}} item xs={4}><h6>Price</h6></Grid>
                                </Grid>   
                                {this.props.orderBook && this.props.orderBook.sell && this.props.orderBook.sell.orderNum && this.props.orderBook.sell.orderNum.map( (o, i) => {
                                    return this.constructBook(o, i, 'green', 'sell');
                                } )}
                            </Card>
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
    },
    boldText: {
        fontWeight: 900
    }
};

const mapStateToProps = (state) => ({
    // allOwners: state.ownersList,
    productInfo: state.productInfo,
    allProducts: state.productsList,
    depositedETH: state.depositedETH,
    balance1: state.balanceData1,
    balance2: state.balanceData2,
    ERC20Balance: state.ERC20_Balance,
    buyOrder: state.buyOrder,
    sellOrder: state.sellOrder,
    orderBook: state.orderBook,
    ownerETHAddress: state.owner,
    ethAddress: state.ethAddress,
    totalEther: state.etherBalance
})

const mapDispatchToProps = (dispatch) => {
    return {
        getProductInfo: (ownerAddress, productAddress) => dispatch(getProductInfo(ownerAddress, productAddress)),
        getProductsList: () => dispatch(getProductsList()),
        depositETH: (ownerAddress, productAddress) => dispatch(depositETH(ownerAddress, productAddress)),
        depositERC20: (ownerAddress, productAddress, amount) => dispatch(depositERC20(ownerAddress, productAddress, amount)),
        withdrawERC20: (ownerAddress, productAddress, amount) => dispatch(withdrawERC20(ownerAddress, productAddress, amount)),
        getBalance: (ownerAddress, productAddress, flag) => dispatch(getBalance(ownerAddress, productAddress, flag)),
        buyOrder: (owner, ownerId, prBase, prTrade, price, qty, sell) => dispatch(BuyOrder(owner, ownerId, prBase, prTrade, price, qty, sell)),
        sellOrder: (owner, ownerId, prBase, prTrade, price, qty, sell) => dispatch(SellOrder(owner, ownerId, prBase, prTrade, price, qty, sell)),
        fetchOrderBook: (owner, prTrade, prBase, hogaN) => dispatch(fetchOrderBook(owner, prTrade, prBase, hogaN)),
        generateOwner: () => dispatch(generateOwner()),
        getEther: (owner) => dispatch(getEther(owner))
        // addOwner: (owner, amount) => dispatch(addOwner(owner, amount)),
        // getOwners: () => dispatch(getOwners()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);


