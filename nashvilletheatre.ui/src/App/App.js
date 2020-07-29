import React from 'react';
import firebase from 'firebase';
import FirebaseApp from '../helpers/utilities/connection';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { addToCart, getUsersCart, getSubscriptionLineItems,getShowLineItems } from '../helpers/data/cartData';
import { getUser } from '../helpers/data/userData'
import SearchResults from '../components/pages/SearchResults/SearchResults';
import UserNav from '../components/shared/UserNav/UserNav';
import Navbar from '../components/shared/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import Register from '../components/pages/Register/Register';
import Category from '../components/pages/Category/Category';
import Show from '../components/pages/Show/Show';
import Theatre from '../components/pages/Theatre/Theatre';
import Venue from '../components/pages/Venue/Venue';
import Account from '../components/pages/Account/Account';
import Footer from '../components/shared/Footer/Footer';
import SellerDashboard from '../components/pages/SellerDashboard/SellerDashboard';
import Cart from '../components/pages/Cart/Cart';
import Modal from'../components/shared/Modal/Modal';
import './App.scss';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

FirebaseApp();

class App extends React.Component {
  state = {
    user: {},
    authed: false,
    subscribed: false,
    cart: {},
    shows: [],
    subscriptions:[],
    modalOn: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.getUsersInformation();
        this.getUsersCart();
        this.getShowLineItems();
        this.getSubscriptionLineItems();
        if (this.state.user.subscriptionId !== null)
        this.setState({ subscribed: true });
        }
    });
  };

  getUsersInformation() {
    const email = firebase.auth().currentUser.email;
    getUser(email)
    .then((user) => {
      this.setState({ user : user })
      window.sessionStorage.setItem('uid', this.state.user.uid);
      window.sessionStorage.setItem('cartId', this.state.user.cartId);
    })
  }

  getUsersCart() {
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      getUsersCart(uid)
    .then((cart) => {
      this.setState({ cart: cart })
      })
    }
  }

  getSubscriptionLineItems() {
    const cartId = sessionStorage.getItem('cartId');
    if (cartId) {
    getSubscriptionLineItems(cartId)
      .then((subscriptions) => {
        this.setState({ subscriptions: subscriptions })
    })}
  }

  getShowLineItems() {
    const cartId = sessionStorage.getItem('cartId');
    if (cartId) {
      getShowLineItems(cartId)
      .then((shows) => {
      this.setState({ shows: shows })
    })}
  }

  toggleModal = (modalBody) => {
    if(!modalBody) {
      this.setState({modalOn:false})
    }
  }

  handleAuthChange(authed) {
    this.setState({authed : authed});
  }

  componentWillUnmount() {
    this.removeListener();
  };

  render() {
    const { authed, subscribed, shows, subscriptions, cart, modalOn } = this.state;
    return (
      <div className="App">
        <Router>
          <Modal modalOn={modalOn} closeModal={this.toggleModal}>This is the stuff in the modal</Modal>
          <Navbar handleAuth={this.handleAuthChange} cart={cart} shows={shows} subscriptions={subscriptions}/>
          {/* {subscribed
          ? <UserNav authed={authed} user={user}/>
          : null} */}
            <Switch toggleModal={this.toggleModal}>
              <Route path="/" exact component={Home} authed={authed} getUsersCart={this.getUsersCart} getShowLineItems={this.getShowLineItems} getSubscriptionLineItems={this.getShowLineItems}/>
              <Route path="/login" exact component={Login} authed={authed} handleAuth={this.handleAuthChange} />
              <Route path="/register" exact component={Register} authed={authed} />
              <Route path="/category/:categoryId" exact component={Category} authed={authed} />
              <Route path="/show/:showId" exact component={Show} toggleModal={this.toggleModal}/>
              <Route path="/theatre/:theatreId" exact component={Theatre} authed={authed} />
              <Route path="/venue:venueId" exact component={Venue} authed={authed} />
              <Route path="/account/theatreco" component={SellerDashboard} authed={authed} />
              <Route path="/search/:searchTerm" exact component={SearchResults} authed={authed} />
              <Route path="/cart/:uid" exact component={Cart} authed={authed} subscribed={subscribed} shows={shows} subscriptions={subscriptions} />
              <PrivateRoute path="/account" component={Account} authed={authed} handleAuth={this.handleAuthChange} />
              {/* <PrivateRoute path="/theatre/:theatreId/show/new" exact component={ShowForm} />
              <PrivateRoute path="/theatre/:theatreId/show/:showId/edit" exact component={ShowForm} /> */}
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
