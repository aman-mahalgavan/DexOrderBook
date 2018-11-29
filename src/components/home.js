import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';
import TabLayout from './tabLayout';

class Home extends Component {

    componentWillMount() {
        this.props.fetchData();
    }
    render() {
        const defaults = {
            currency: "BTCKRW",
            currencySymbol: "",
            minOrderAmount: 0
        }
        { console.log(this.props) }
        return (
            <div>
                <h1>Home</h1>
                <TabLayout defaultValues={this.defaults} data={this.props.data}></TabLayout>
            </div>
        )
    }
}

Home.propTypes = {
    fetchData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data.data
})

export default connect(mapStateToProps, { fetchData })(Home);





/* 

const init = () => {
            if (defaults.currency == "BTCKRW") {
                defaults.minOrderAmount = data.currency.levels.level0.type4.cal;
                defaults.currencySymbol = data.currency.levels.levelDefault.symbol;
            }

            $("#currency-symbol").html(defaults.currencySymbol);
            $("#minOrderAmount").html(defaults.minOrderAmount);

            // $("#krw_available_balance").html(data.accountPositions[0].Amount - data.accountPositions[0].Hold);
            $("#krw_available_balance").html(() => {
                let amt_available = data.accountPositions.find((o) => {
                    return o.ProductSymbol == "KRW"
                })
                return amt_available.Amount - amt_available.Hold;
            });
            // $("#krw_total_balance").html(data.accountPositions[0].Amount);
            $("#krw_total_balance").html(() => {
                let amt_total = data.accountPositions.find((o) => {
                    return o.ProductSymbol == "KRW"
                })
                return amt_total.Amount;
            });

            // $("#btc_available_balance").html(data.accountPositions[0].Amount - data.accountPositions[0].Hold);
            $("#btc_available_balance").html(() => {
                let btc_amt = data.accountPositions.find((o) => {
                    return o.ProductSymbol == "BTC"
                })
                return btc_amt.Amount - btc_amt.Hold;
            });
            $("#btc_total_balance").html(() => {
                let btc_amt_total = data.accountPositions.find((o) => {
                    return o.ProductSymbol == "BTC"
                })
                return btc_amt_total.Amount;
            });


        }
 const buyBTC = () => {
            let btcAmount = $("#buy_BTC_amount").val();
            let price = $("#buy-price").val();
            let totalOrderPrice = $("#total-buy-order-amount").html();
            console.log(btcAmount);
            console.log(price);
            console.log(totalOrderPrice);

            if (Number($("#krw_available_balance").html()) <= 0) {
                return alert("Can't buy any more Bitcoins. You have exhausted your available amount.");
            }

            // Update Available and Total KRW Balance
            $("#krw_available_balance").html(Number($("#krw_available_balance").html()) - totalOrderPrice);           // let Updated_KRW_Available_Balance = amt_available - totalOrderPrice;
            data.accountPositions[0].Amount = $("#krw_available_balance").html();

            $("#krw_total_balance").html(Number($("#krw_total_balance").html()) - totalOrderPrice);
            data.accountPositions[0].Amount = $("#krw_total_balance").html();

            // Update BTC Value
            $("#btc_available_balance").html(Number($("#btc_available_balance").html()) + Number(btcAmount));
            data.accountPositions[1].Amount = Number($("#btc_available_balance").html());

            $("#btc_total_balance").html(Number($("#btc_total_balance").html()) + Number(btcAmount))
            data.accountPositions[1].Amount = $("#btc_total_balance").html();

        }

        const sellBTC = () => {
            let btcAmount = $("#sell_BTC_amount").val();
            let price = $("#sell-price").val();
            let totalOrderPrice = Number($("#total-sell-order-amount").html());
            let totalSellingFee = $("#total-selling-fee-amount").html();
            console.log(btcAmount);
            console.log(price);
            console.log(totalOrderPrice);
            console.log(totalSellingFee);

            if (btcAmount > Number($("#btc_available_balance").html())) {
                return alert("Can't sell what you don't have!");
            }

            if (Number($("#btc_available_balance").html()) <= 0) {
                return alert("Can't Sell any more Bitcoins. You have sold all your available Bitcoins.");
            }

            // Update Available and Total KRW Balance
            $("#krw_available_balance").html(Number($("#krw_available_balance").html()) + totalOrderPrice);           // let Updated_KRW_Available_Balance = amt_available - totalOrderPrice;
            data.accountPositions[0].Amount = $("#krw_available_balance").html();

            $("#krw_total_balance").html(Number($("#krw_total_balance").html()) + totalOrderPrice);
            data.accountPositions[0].Amount = $("#krw_total_balance").html();

            // Update BTC Value
            $("#btc_available_balance").html(Number($("#btc_available_balance").html()) - Number(btcAmount));
            data.accountPositions[1].Amount = Number($("#btc_available_balance").html());

            $("#btc_total_balance").html(Number($("#btc_total_balance").html()) - Number(btcAmount))
            data.accountPositions[1].Amount = $("#btc_total_balance").html();
        }

        const updateBuyOrderValue = () => {
            let btcAmount = $("#buy_BTC_amount").val();
            let price = $("#buy-price").val();
            // if (price < 1000) {
            //     return alert("Min Order value is 1000 KRW");
            // }
            $("#total-buy-order-amount").html(btcAmount * price);
        }

        const updateSellOrderValue = () => {
            let btcAmount = $("#sell_BTC_amount").val();
            let price = $("#sell-price").val();
            let sellingFee = 0.015;
            let sellAmount = Number(btcAmount) * Number(price);
            let totalSellAmount = sellAmount - (sellAmount * sellingFee / 100);
            $("#total-sell-order-amount").html(totalSellAmount);
            $("#total-selling-fee-amount").html(sellAmount * sellingFee / 100);
        }

*/