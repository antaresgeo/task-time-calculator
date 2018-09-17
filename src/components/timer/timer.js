import React, { Component } from 'react';
import moment from 'moment';

class Timer extends Component {
    render() {
        const { interval } = this.props;
        const duration = moment.duration(interval);
        const centiseconds = Math.floor(duration.milliseconds() / 10)
        const hours = duration.asHours().toFixed(0);
        return (
            <div className="timer">
                <span>{hours > 0 ? hours : ''}</span>{hours > 0 ? ':' : ''}
                <span>{this.compute(duration.minutes())}</span>:
                <span>{this.compute(duration.seconds())}</span>,
                <span>{this.compute(centiseconds)}</span>
            </div>
        );
    }

    compute = n => n < 10 ? '0' + n : n;
}

export default Timer;