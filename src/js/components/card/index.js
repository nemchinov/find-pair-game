import React, { Component } from "react";
import autoBind from 'react-autobind';

import './index.css';

class Card extends Component {
    constructor() {
        super();
        autoBind(this);
    }
    flip(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.blocked) { return; }
        this.props.click(this.props.name);
    }
    render() {
        let name = this.props.name || 'default',
            img = `img/${name}.svg`,
            cardClass = 'memory-card';
        
        if(this.props.flip) {
            cardClass += ' flip';
        }
        
        return (
            <div className="card-box">
                <div className={cardClass} onClick={this.flip}>
                    <div className="front-face" style={{backgroundImage: `url(${img})`}}></div>
                    <div className="back-face" style={{backgroundImage: `url('img/default.svg')`}}></div>
                </div>
            </div>
        );
    }
}

export default Card;