import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <a href="#" className="logo">Shopkeep</a>
          <button>Home</button>
          <span>|</span>
          <button>About</button>
          <button>Contact</button>
          <button>Cart</button>
        </header>
      </div>
    );
  }
}

export default Header;
