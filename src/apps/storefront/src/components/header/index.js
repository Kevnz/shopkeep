import React, { Component } from 'react';
import Link from '../link';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/" className="logo">Shopkeep</Link>&nbsp;
          <Link to="/" >Home</Link>&nbsp;
          <span>|</span>&nbsp;
          <Link to="/about">About</Link>&nbsp;
          <Link to="/contact">Contact</Link>&nbsp;
          <Link to="/cart">Cart</Link>&nbsp;
        </header>
      </div>
    );
  }
}

export default Header;
