import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Tabs, Tab, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import BuyForm from './buyForm';
import SellForm from './sellForm';
class tabLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableKRW: 0,
            availableBTC: 0,
            totalKRW: 0,
            totalBTC: 0,
            defaults: this.props.defaultValues,
            data: this.props.data,
            orderValue: 0,
            totalBitcoinBuying: 0,
            krwBuyingAmount: 0
        }
        this.updateBTCBuyOrder = this.updateBTCBuyOrder.bind(this);
        this.buyBtc = this.buyBtc.bind(this);
    }

    componentDidMount() {
        this.init()
    }

    init() {
        let sData = [{
            "Amount": 15000000,
            "Hold": 3500000,
            "ProductSymbol": "KRW"
          },
          {
            "Amount": 1.527,
            "Hold": 0.123547,
            "ProductSymbol": "BTC"
          }]
        let krw = sData[0];
        let btc = sData[1];
        this.setState({
            totalKRW : krw.Amount,
            availableKRW : krw.Amount - krw.Hold,
            totalBTC : btc.Amount,
            availableBTC : btc.Amount - btc.Hold
        })
    }

    updateBTCBuyOrder(flag, o) {
        console.log("Updating the BTC Order value --> ", o);
        if (!o) {
            this.init();
        } else {
            if (flag === "btc") {
                this.setState({ availableBTC: +this.state.availableBTC + +o, totalBTC: +this.state.totalBTC + +o });
            } else {
                this.setState({ availableKRW: +this.state.availableKRW - +o, totalKRW: +this.state.totalKRW - +o });
            }
        }
    }

    buyBtc() {
        console.log("Buying BTC");
    }

    render() {
        return (
            <div>
                {/* {console.log("Data inside tabs => ", this.props.data)} */}
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Available Balance</th>
                            <th>Total Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>KRW</td>
                            <td>{this.state.availableKRW}</td>
                            <td>{this.state.totalKRW}</td>
                        </tr>
                        <tr>
                            <td>BTC</td>
                            <td>{this.state.availableBTC}</td>
                            <td>{this.state.totalBTC}</td>
                        </tr>
                    </tbody>
                </Table>
                <Tabs defaultActiveKey={1} id="tabLayout" >
                    <Tab eventKey={1} title="Buy" >
                        <BuyForm updateBuyBtc={this.updateBTCBuyOrder} buy={this.buyBtc} ordervalue={this.state.orderValue} bitcoinBuying={this.state.totalBitcoinBuying} orderkrwAmount={this.state.krwBuyingAmount} />
                    </Tab>
                    <Tab eventKey={2} title="Sell" >
                        <SellForm />
                    </Tab>
                </Tabs>


                {/* <nav>
                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-buy-tab" data-toggle="tab" href="#nav-buy" role="tab" aria-controls="nav-buy"
                            aria-selected="true">Buy</a>
                        <a class="nav-item nav-link" id="nav-sell-tab" data-toggle="tab" href="#nav-sell" role="tab" aria-controls="nav-sell" aria-selected="false">Sell</a>

                    </div>
                </nav>
                <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-buy" role="tabpanel" aria-labelledby="nav-buy-tab">
                        <BuyForm />
                    </div>
                    <div class="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-sell-tab">
                        <SellForm />
                    </div>
                </div> */}
            </div >
        )
    }
}

// tabLayout.propTypes = {

// }

const mapStateToProps = state => ({
    // data: state.data.data
})

export default connect(mapStateToProps, null)(tabLayout);
