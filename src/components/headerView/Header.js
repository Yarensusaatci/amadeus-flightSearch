import React, { Component } from 'react';

import logo from '../../assets/images/giphy.gif';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="header display--flex">
        <img src={logo} className="header__logo" alt="logo" />
        <h2 className="header__title">Travel To Future </h2>
        <img src={logo} className="header__logo" alt="logo" />
      </header>
    );
  }
}

export default Header;