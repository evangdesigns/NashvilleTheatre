import React from 'react';
import arrow_btn from '../../../images/icons/next_icon.png'
import './footer.scss';

class Newsletter extends React.Component {
  render() {
    return (
      <div className="newsletter">
        <input
        type="text"
        className="news-box form-control"
        id="show-newsletter"
        placeholder="Sign up for our Weekly Newsletter"
        />
        <button className="newsletter-btn btn" onClick={() => {}}><img src={arrow_btn} height="45" /></button>
      </div>
    );
  }
}
export default Newsletter;