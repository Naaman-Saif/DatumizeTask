import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class CustomizedTable extends React.Component {
    componentWillMount = () => {
        console.log(this.props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>ID</CustomTableCell>
                                <CustomTableCell>Name </CustomTableCell>
                                <CustomTableCell>Role</CustomTableCell>
                                <CustomTableCell>Project</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.user.users.map(row => {
                                return (
                                    <TableRow className={classes.row} key={row.id}>
                                        <CustomTableCell component="th" scope="row">
                                            {row.id}
                                        </CustomTableCell>
                                        <CustomTableCell >{row.name}</CustomTableCell>
                                        <CustomTableCell>{this.props.user.roles[row.id - 1].name}</CustomTableCell>
                                        <CustomTableCell>{this.props.user.projects[row.id - 1].name}</CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);