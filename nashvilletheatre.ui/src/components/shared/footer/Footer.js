import React from 'react';
import Newsletter from './Newsletter';
import Affiliates from './Affiliates';

import FooterCategories from '../FooterCategories/FooterCategories';

import ntc_logo from '../../../images/ntc_logo_wht.png';
import fb_ico from '../../../images/icons/facebook_icon.png';
import insta_ico from '../../../images/icons/instagram_icon.png';
import tw_ico from '../../../images/icons/twitter_icon.png';
import yt_ico from '../../../images/icons/youtube_icon.png';

import './footer.scss';
import { Row, Col } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <footer>
      <div className="footer-top">
        <h3 className="text-center">SHOW CATEGORIES</h3>
        <FooterCategories />
        <div className="affiliate-group">
          <Affiliates />
        </div>
      </div>

      <Row className="footer-bottom justify-content-between">
        <Col md={4} xs={12}>
          <div className="footer-image">
          <img src={ntc_logo} alt="NashvilleTheater.com Logo" />
          </div>

          <p>Copyright © 2020 Nahville Theatre.com</p>
          <p><a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a></p>
        </Col>
        <Col md={4} xs={12} className="text-center">
          <a href="https://www.facebook.com/hartkevin/"><img src={fb_ico} alt="" /></a>
          <a href="https://www.instagram.com/schwarzenegger/"><img src={insta_ico} alt="" /></a>
          <a href="https://twitter.com/Rosie"><img src={tw_ico} alt="" /></a>
          <a href="https://www.youtube.com/watch?v=oHg5SJYRHA0"><img src={yt_ico} alt="" /></a>
        </Col>
        <Col md={4} xs={12} className="text-right">
          <Newsletter />
          <p>123 Seasame Street, Nashville, TN 37115</p>
          <p>1-800-867-5309</p>
        </Col>
      </Row>
      </footer>
    )
  }
}

export default Footer;
