import React, { Component } from 'react';
import './app.css';

import Timer from '../../components/timer/timer';
import Table from '../../components/table/table';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'no_start',
            inputValue: '',
            start: 0,
            now: 0,
            timer: 0,
            tasks: [],
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const { now, start, tasks, timer, inputValue, status } = this.state;
        const time = timer + (now - start);
        const timerClass = `timerp ${status}`
        return (
            <div className="App container">
                <div className="row form">
                    <div className="col-sm-4">
                        <fieldset>
                            <legend>Task</legend>
                            <div className=" form-group">
                                <label htmlFor="name">Task name:</label>
                                <input 
                                    type="text" className="form-control" id="name"
                                    aria-describedby="nameHelp"
                                    value={inputValue} onChange={this.updateInputValue}
                                />
                                <small id="nameHelp" className="form-text text-muted">Enter task name.</small>
                            </div>
                            <div className="text">
                                <span>Time elapsed:</span>
                            </div>
                            <div className={timerClass}>
                                <Timer interval={time} />
                            </div>
                            <div className="controls">
                                {this.computeControls()}
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-sm-8">
                        <Table rows={tasks} />
                    </div>
                </div>
            </div>
        );
    }

    computeControls = () => {
        switch (this.state.status) {
            case 'no_start': {
                return (<button type="button" className="btn btn-primary" onClick={this.start} >Start timer</button>);
            }
            case 'start': {
                return [
                    <button key="0" type="button" className="btn btn-primary" onClick={this.pause}>Pause timer</button>,
                    <button key="1" type="button" className="btn btn-primary" onClick={this.stop}>Stop timer</button>
                ]
            }
            case 'pause': {
                return [
                    <button key="0" type="button" className="btn btn-primary" onClick={this.resume}>Resume timer</button>,
                    <button key="1" type="button" className="btn btn-primary" onClick={this.stop}>Stop timer</button>
                ]
            }
            case 'stop': {
                return [
                    <button key="0" type="button" className="btn btn-primary" onClick={this.clear}>Clear</button>,
                    <button key="1" type="button" className="btn btn-primary" onClick={this.save}>Save</button>
                ]
            }
            default:{
                return []
            }
        }
    }

    start = () => {
        const now = new Date().getTime();
        this.setState({
            status: 'start',
            start: now,
            now,
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 10)
    }

    pause = () => {
        clearInterval(this.timer);
        const { timer, now, start } = this.state;
        this.setState({
            status: 'pause',
            timer: timer + now - start,
            start: 0,
            now: 0,
        })
    }

    resume = () => {
        const now = new Date().getTime();
        this.setState({
            status: 'start',
            start: now,
            now,
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 10)
    }

    stop = () => {
        clearInterval(this.timer);
        this.setState({
            status: 'stop'
        })
    }

    clear = () => {
        this.setState({
            status: 'no_start',
            timer: 0,
            start: 0,
            now: 0,
        })
    }

    save = () => {
        const { inputValue, timer, tasks, start, now } = this.state
        
        if (inputValue !== '') {
            this.setState({
                status: 'no_start',
                timer: 0,
                start: 0,
                now: 0,
                inputValue: '',
                tasks: [
                    { name: inputValue, value: timer + now - start },
                    ...tasks
                ],
            })
        } else {
            alert('Enter a name for the task please');
        }
    }

    updateInputValue = (evt) => {
        this.setState({
            inputValue: evt.target.value
        });
    }
}

export default App;
/*

*/