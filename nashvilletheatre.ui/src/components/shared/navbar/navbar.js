import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import Topcategories from './Topcategories';
import SearchBar from './SearchBar';

import ntc_logo from '../../../images/ntc_logo_4c.png';
import profile_icon from '../../../images/icons/profile_icon.png';
import './navbar.scss';

class Navbar extends React.Component {
  state = {
    authed: false,
  };

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  // showCartCartHandler(e) {
  //   const { showCartCard } = this.props;
  //   showCartCard();
  // }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed } = this.state;
    const { shows, subscriptions, cart } = this.props;
    const buildAuthNav = () => {
    if (authed) {
      return (
        <nav className="navbar-nav navbar-expand-lg justify-content-end">
          <ul className="nav justify-content-end">
            { shows || subscriptions
            ?<li className="nav-item">
              <Link type="button" to={`/cart/${cart.cartId}`} onMouseOver={this.showCartCartHandler} className="nav-link" id="cart-link">Cart</Link>
            </li>
            : null
            }
            <li className="nav-item">
              <Link className="nav-link" to="/account">My Tickets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={this.logMeOut}>Log Out</Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="navbar-nav navbar-expand-lg justify-content-end">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="" onClick={this.loginClickEvent}>Sign In/Register &nbsp;
              <img className="profile-icon" src={profile_icon} height="20" alt="" />
              </Link>
            </li>
          </ul>
        </nav>
      );
    }

    };

      return (
        <div className="container-fluid">
          <nav className="navbar row align-top">
            <div className="align-top col-md-2">
              <Link className="navbar-brand " to="/">
                <img src={ntc_logo} alt="NashvilleTheater.com" />
              </Link>
            </div>
            <div className="search-group col align-top">
              <SearchBar />
              <Topcategories/>
            </div>
            <div className="navbar-nav col-md-3 align-top align-content-end">
              {buildAuthNav()}
            </div>
          </nav>
        </div>
      )
      }
};

export default Navbar;