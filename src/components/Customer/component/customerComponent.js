import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class CustomerComponent extends Component {
    render() {
        return (


                <TableRow key={this.props.index}>
                    <TableCell align="center">{this.props.name}</TableCell>
                    <TableCell align="center">{this.props.email}</TableCell>
                    
                </TableRow>
        )
    }
}
