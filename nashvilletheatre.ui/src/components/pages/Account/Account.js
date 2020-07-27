import React from 'react';
import './account.scss';

class Account extends React.Component {
  state = {
    authed: true
  }

  render() {
    return (
     <div>
       <h1 className="text-center">This is the Account Page</h1>
       <div className="card-columns">
         <div className="card">
           <img className="card-img-top" src="holder.js/100x180/" alt=""/>
           <div className="card-body">
             <h4 className="card-title">Sample Order</h4>
             <p className="card-text">Order Summary</p>
           </div>
         </div>
         <div className="card">
           <img className="card-img-top" src="holder.js/100x180/" alt=""/>
           <div className="card-body">
             <h4 className="card-title">Sample Order 2</h4>
             <p className="card-text">Order Summary 2</p>
           </div>
         </div>
       </div>
     </div>
    )
  }
}

export default Account;