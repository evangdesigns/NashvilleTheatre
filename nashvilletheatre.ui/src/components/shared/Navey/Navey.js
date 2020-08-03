import React from 'react';
import firebase from 'firebase';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Topcategories from './Topcategories';
import SearchBar from './SearchBar';

import cart_icon from '../../../images/icons/cart_icon.png';
import ntc_logo from '../../../images/ntc_logo_4c.png';
import profile_icon from '../../../images/icons/profile_icon.png';
import './Navey.scss';
import CartSummary from './CartSummary';

class Navey
 extends React.Component {
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
    const itemCount = shows.length + subscriptions.length;
    const buildAuthNav = () => {
      if (authed) {
        return (
          <Nav className="justify-content-end">
            {cart.total === 0
            ? null
            : <Nav.Link  href={`/cart/${cart.cartId}`}><img id="cart-icon" src={cart_icon} alt="Cart" /><sup>{itemCount}</sup></Nav.Link>}
            <Nav.Link href="/account">My Tickets &nbsp;<img className="profile-icon" src={profile_icon} height="20" alt="" /></Nav.Link>
            <Nav.Link href="/home" onClick={this.logMeOut}>Log Out</Nav.Link>
          </Nav>
        );
      } else {
        return (
          <Nav className="justify-content-end">
            {cart.total === 0
            ? null
            : <Nav.Link href={`/cart/${cart.cartId}`}><img id="cart-icon" src={cart_icon} alt="Cart" /><sup>{itemCount}</sup></Nav.Link>}
            <Nav.Link onClick={this.loginClickEvent}>Sign In/Register &nbsp;<img className="profile-icon" src={profile_icon} height="20" alt="" /></Nav.Link>
          </Nav>
        );
      };
    };

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={ntc_logo}
            className="d-inline-block align-top"
            alt="NashvilleTheater.com"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <Container>
              <SearchBar />
              <Topcategories/>
            </Container>
          </Nav>
          {buildAuthNav()}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navey;