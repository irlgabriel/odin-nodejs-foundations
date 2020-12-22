import React from 'react';
import FacebookLogin from 'react-facebook-login';

class MyComponent extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="423370868700467"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile"
        callback={this.responseFacebook}
      />
    )
  }
}

export default MyComponent;