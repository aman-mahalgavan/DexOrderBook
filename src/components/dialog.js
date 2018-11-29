import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
// import blue from '@material-ui/core/colors/blue';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
    // dialogbox: { padding: '5%', minWidth: '400px', minHeight: '300px' },
    // avatar: {
    //     backgroundColor: blue[100],
    //     color: blue[600],
    // },
};

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <Button style={{textAlign:'left', fontSize:'30px', backgroundColor: 'transparent', display: 'inline'}} onClick={this.handleClose} color="primary" autoFocus>&times;</Button>
                {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle> */}
                {/* <div style={styles.dialogbox}>
                    Hello
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </div> */}
                    {this.props.component}
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    // classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    // selectedValue: PropTypes.string,
    component: PropTypes.object.isRequired
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

export default SimpleDialogWrapped;