import React from 'react';

// import './UserNav.scss';

class UserNav extends React.PureComponent {

  render() {
    const { user, subscribed } = this.props;
    return (
     <div>
       <section>
          <h2 className="text-center">USer info goes here</h2>
       </section>
     </div>
    )
  }
}

export default UserNav;