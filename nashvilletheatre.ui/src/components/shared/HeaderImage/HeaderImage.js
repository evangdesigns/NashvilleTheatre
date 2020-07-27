import React from 'react';
import './HeaderImage.scss';

class HeaderImage extends React.Component {

  render() {
    const { src, alt } = this.props;
    return (
     <div className="header-image">
       <img src={src} alt={alt} />
     </div>
    )
  }
}

export default HeaderImage;