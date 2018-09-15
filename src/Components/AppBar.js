import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    appBar:{
        backgroundColor:"#121921"
    }
};

class MenuAppBar extends React.Component {
    redirectToGithub = () =>{
        window.location.href="https://github.com/Naaman-Saif"
    }
    redirectToDatumize = () =>{
        window.location.href="https://www.datumize.com/"
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.redirectToDatumize} className={classes.grow}>
                            <img src="https://www.datumize.com/hubfs/IPA-GDD-2018/Web/images/common/logo-Datumize-negativo.png?t=1536765309726" alt="Datumize" />
                        </IconButton>
                        <IconButton color="inherit" onClick={this.redirectToGithub}>
                            <i className="fab fa-github" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);