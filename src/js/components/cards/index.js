import React, { Component } from "react";
import autoBind from 'react-autobind';
import Card from '../card'

import './index.css';

class Cards extends Component {
    constructor() {
        super();
        autoBind(this);

        this.state = {
            start: new Date().getTime(),
            time: 0,
            selected: [],
            blocked: false,
            cancelFlip: true,
            finded: [],
            showModal: false
        };

        this.ROWS = 3;
        this.COLUMNS = 4;
        this.default_names = [
            'angular',
            'aurelia',
            'backbone',
            'ember',
            'react',
            'vue'
        ];
        this.names = this.default_names.concat(this.default_names).sort((a, b) => Math.random() - 0.5);
    }
    componentDidMount() {
        this.timer = setInterval(this.tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({time: Math.round((new Date() - this.state.start)/1000)});
    }

    close(e) {
        e.preventDefault();
        this.props.hide();
    }

    cardClick(index, name) {
        let { selected, finded } = this.state;
        
        if(!selected.length) {
            this.setState({ selected: [index], blocked: false })
        } else if(this.names[selected[0]] === name) {
            let show = false;
            finded.push(name);
            if (finded.length === this.default_names.length) {
                clearInterval(this.timer);
                show = true;
            }
            this.setState({ selected: [], blocked: false, showModal: show, finded })
        } else {
            selected.push(index);
            this.setState({ blocked: true, selected });

            setTimeout(() => {
                this.setState({ selected: [], blocked: false }) 
            }, 1000);
        }
    }

    render() {
        let state = this.state;

        return (
            <div className="cards-box">
                <div className="cards-box__control">
                    <div className="cards-box__control-time">{state.time} seconds</div>
                    <div className="cards-box__control-close">
                        <button onClick={this.close}>Finish</button>
                    </div>
                </div>
                <div className="cards-box__container">
                    {[...Array(this.ROWS * this.COLUMNS)].map((_, i) => {
                        return  <Card key={i} 
                                    name={this.names[i]} 
                                    click={this.cardClick.bind(this, i)}
                                    blocked={
                                        state.blocked || state.selected.indexOf(i) >= 0 || 
                                        state.finded.indexOf(this.names[i]) >= 0
                                    }
                                    flip={ 
                                        state.selected.indexOf(i) >= 0 ||
                                        state.finded.indexOf(this.names[i]) >= 0    
                                    }
                                    />;
                    })}
                </div>
                {state.showModal ? (
                    <div className="cards-box__success">
                        <label>Congratulations on winning</label>
                        <label>Your time is {state.time} seconds</label>
                        <button onClick={this.close}>Finish</button>
                    </div>
                ) : ('')}
            </div>
        );
    }
}

export default Cards;