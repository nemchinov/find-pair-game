import React, { Component } from "react";
import autoBind from 'react-autobind';

import Cards from "./cards";

class App extends Component {
  constructor() {
    super();
    autoBind(this);

    this.state = {
      showCards: false
    };
  }

  showCards(e) {
    e.preventDefault();
    this.setState({ showCards: true} );
  }

  hideCards() {
    this.setState({ showCards: false} );
  }
  
  render() {
    let cardsClass = 'cards',
        startClass = 'start-page',
        show = this.state.showCards;
    
    if (show) {
      cardsClass += ' slideDown';
      startClass += ' slideUp';
    } else {
      cardsClass += ' slideUp';
      startClass += ' slideDown';
    }

    return (
      <div className="app-box">
        {show ? (
          <div className={cardsClass}>
            <Cards hide={this.hideCards}/>
          </div>
        ) : ('')}
        <div className={startClass}>
            <button className="start-page__submit" onClick={this.showCards}>Start</button>
          </div>        
      </div>
    );
  }
}

export default App;