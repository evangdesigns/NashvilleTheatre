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
import Navey from '../components/shared/Navey/Navey';
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
import './App.scss';

FirebaseApp();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false || authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/account', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    user: {},
    authed: false,
    subscribed: false,
    cart: [],
    shows: [],
    subscriptions:[],
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.getUsersInformation();
        this.getCartData();
        if (this.state.user.subscriptionId !== null)
        this.setState({ subscribed: true });
      } else {
        this.setState({ authed: false });
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

  getCartData = () => {
    this.getUsersCart()
    this.getShowLineItems();
    this.getSubscriptionLineItems();
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

  handleAuthChange(authed) {
    this.setState({authed : authed});
  }

  componentWillUnmount() {
    this.removeListener();
  };

  render() {
    const { user, authed, subscribed, shows, subscriptions, cart } = this.state;
    return (
      <div className="App">
        <Router>
          <Navey handleAuth={this.handleAuthChange} authed={authed} subscribed={subscribed} cart={cart} shows={shows} subscriptions={subscriptions} getCartData={this.getCartData}/>
          {/* {subscribed
          ? <UserNav authed={authed} user={user}/>
          : null} */}
            <Switch>
              <PublicRoute path="/" exact component={Home} authed={authed} subscribed={subscribed}/>
              <PublicRoute path="/login" exact component={Login} handleAuth={this.handleAuthChange} />
              <PublicRoute path="/register" exact component={Register} authed={authed} subscribed={subscribed}/>
              <PublicRoute path="/category/:categoryId" exact component={Category} authed={authed} subscribed={subscribed} />
              <PublicRoute path="/show/:showId" exact component={Show} authed={authed} subscribed={subscribed} user={user} getCartData={this.getCartData} />
              <PublicRoute path="/theatre/:theatreId" exact component={Theatre} authed={authed} subscribed={subscribed} />
              <PublicRoute path="/venue:venueId" exact component={Venue} authed={authed} subscribed={subscribed} />
              <PublicRoute path="/account/theatreco" component={SellerDashboard} authed={authed} subscribed={subscribed} />
              <PublicRoute path="/search/:searchTerm" exact component={SearchResults} authed={authed} subscribed={subscribed} />
              <PublicRoute path="/cart/:uid" exact component={Cart} authed={authed} subscribed={subscribed} cart={cart} shows={shows} subscriptions={subscriptions} getCartData={this.getCartData}/>
              <PrivateRoute path="/account" component={Account} authed={authed} subscribed={subscribed} handleAuth={this.handleAuthChange} />
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
