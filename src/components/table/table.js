import React, { Component } from 'react';
import Timer from '../timer/timer'
// import moment from 'moment';

function TableRow({ row }) {
    return (
        <tr>
            <th scope="row">{row.name}</th>
            <td><Timer interval={row.value} /></td>
        </tr>
    )
}

class Table extends Component {
    render() {
        const { rows } = this.props;
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Task</th>
                            <th scope="col">Time spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <TableRow key={rows.length - index} row={row} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;