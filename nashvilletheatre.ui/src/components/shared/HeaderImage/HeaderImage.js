import React from 'react';
import './HeaderImage.scss';

class HeaderImage extends React.Component {

  render() {
    const { src, alt, subheading} = this.props;
    return (
      <section className="header-image" style={{backgroundImage:`linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,.8) 60%), url(${src})`}}>
        <div className="image-title-box">
          {subheading
          ? <h4 className="subheading white">{subheading} <span className="mini">presents</span></h4>
          :null
          }

          <h1 className="title light-weight">{alt}</h1>
        </div>
      </section>
    )
  }
}

export default HeaderImage;