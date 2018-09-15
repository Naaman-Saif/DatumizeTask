import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Snackbar from '@material-ui/core/Snackbar';
import ListOfUsers from './ListOfUsers'
import fetchUserData from '../actions/UserAction';
import postUserData from '../actions/PostAction';

class Inputs extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            role: '',
            project: '',
            openError: false
        }
        this.onChange = this.onChange.bind(this)
        this.AddUser = this.AddUser.bind(this);
    }
    componentWillMount = () => {
        this.props.fetchUserData();
    }
    onEnter = (event) => {
        if (event.key === 'Enter') {
            this.AddUser();
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleCloseError = () => {
        this.setState({
            openError: false
        })
    }
    AddUser = () => {
        const id = this.props.userData.data.users.length + 1;
        for (let i = 0; i < this.props.userData.data.users.length; i++) {
            if (this.state.name == this.props.userData.data.users[i].name) {
                if (this.state.project == this.props.userData.data.projects[i].name) {
                    document.getElementById('name').focus();
                    return (
                        this.setState({
                            openError: true,
                            name:'',
                            role:'',
                            project:''
                        })
                    )
                }
            }
        }
        var data = {
            users: {
                id: id,
                name: this.state.name,
            },
            roles: {
                id: id,
                name: this.state.role
            },
            projects: {
                id: id,
                name: this.state.project
            }
        }
        this.props.postUserData(data);
        window.location.reload();
        console.log(data);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div id="form">
                    <TextField
                        placeholder="Name"
                        name="name"
                        id="name"
                        label="Name"
                        className={classes.input}
                        margin="normal"
                        onChange={this.onChange}
                        value={this.state.name}
                        autoFocus
                    />
                    <TextField
                        placeholder="Role"
                        name="role"
                        id="role"
                        label="Role"
                        className={classes.input}
                        margin="normal"
                        onChange={this.onChange}
                        value={this.state.role}
                    />
                    <TextField
                        placeholder="Project"
                        name="project"
                        id="project"
                        label="Project"
                        className={classes.input}
                        margin="normal"
                        onChange={this.onChange}
                        value={this.state.project}
                        onKeyPress={this.onEnter}
                    />
                    <Button variant="fab" color="primary" mini aria-label="Add" onClick={this.AddUser} className={classes.addbutton}>
                        <AddIcon />
                    </Button>
                </div>
                {this.props.userData.isFetching === false ? <ListOfUsers user={this.props.userData.data} /> : <div className={classes.progressContainer}><CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} /></div>}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.openError}
                    onClose={this.handleCloseError}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Sorry! One user can only be assigned one role per project.</span>}
                />
            </div>
        );
    }
}

Inputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    container: {
        width: "75%",
        margin: "0 auto"
    },
    input: {
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "29%"
    },
    save: {
        marginTop: "2%"
    },
    addbutton: {
        marginLeft: "4%"
    },
    progressContainer: {
        width: '100%',
        margin: '0 auto'
    },
    progress: {
        marginLeft: "50%"
    },
});
function mapStateToProps(state) {
    return {
        userData: state.userData
    }
}
export default connect(mapStateToProps, { postUserData, fetchUserData })(withStyles(styles)(Inputs));