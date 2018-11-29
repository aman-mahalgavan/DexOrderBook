import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    selects: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    }
});

class PrimarySearchAppBar extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        token1: '',
        token2: '',
        list: []
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleSelectChangeToken1 = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.changeToken1(event.target.value);
    };
    handleSelectChangeToken2 = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.changeToken2(event.target.value);
    };

    constructSelectList = (data) => {
        let refinedData = data.map( o => {
            console.log("NAVBAR DATA --> ", o["name"]);
            return o["name"];
        })

        this.state.list = refinedData;
    }

    componentWillReceiveProps = (props) => {
        this.constructSelectList(props.data);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>

                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            DEX HIGH
                        </Typography>
                        

                        
                        <div className={classes.selects}>
                            <FormControl className={classes.formControl} style={{width: '150px', marginLeft:'10px', marginRight:'10px'}}>
                                <InputLabel htmlFor="token1">Token 1</InputLabel>
                                <Select
                                    value={this.state.token1}
                                    onChange={this.handleSelectChangeToken1}
                                    inputProps={{
                                        name: 'token1',
                                        id: 'token1',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.list.map( (o, index) => {
                                        return <MenuItem key={index} value={o}>{o}</MenuItem>
                                    })}
                                    {/* <MenuItem value={"BTC"}>BTC</MenuItem>
                                    <MenuItem value={"ETH"}>ETH</MenuItem>
                                    <MenuItem value={"ERC20"}>ERC20</MenuItem> */}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.selects}>
                            <FormControl className={classes.formControl} style={{width: '150px', marginLeft:'10px', marginRight:'10px'}}>
                                <InputLabel htmlFor="token2">Token 2</InputLabel>
                                <Select
                                    value={this.state.token2}
                                    onChange={this.handleSelectChangeToken2}
                                    inputProps={{
                                        name: 'token2',
                                        id: 'token2',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.list.map( (o, index) => {
                                        return <MenuItem key={index} value={o}>{o}</MenuItem>
                                    })}
                                    {/* <MenuItem value={"BTC"}>BTC</MenuItem>
                                    <MenuItem value={"ETH"}>ETH</MenuItem>
                                    <MenuItem value={"ERC20"}>ERC20</MenuItem> */}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>


                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);