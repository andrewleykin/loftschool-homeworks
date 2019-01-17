import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

class AuthProvider extends PureComponent {
  validEmail = "stu@dent.com";
  validPassword = "123";

  state = {
    email: '',
    authorizeError: '',
    isAuthorized: false
  }

  authorize = (email, password) => {
    if (email === this.validEmail && password === this.validPassword) {
      this.setState({
        email,
        authorizeError: '',
        isAuthorized: true
      })
    } else {
      this.setState({
        authorizeError: 'Email или пароль введён не верно'
      })
    }
  };

  logout = () => {
    this.setState({
      email: '',
      authorizeError: '',
      isAuthorized: false
    })
  }

  getProviderValue = () => {
    let { email, authorizeError, isAuthorized } = this.state
    return {
      email,
      authorizeError,
      isAuthorized,
      authorize: this.authorize,
      logout: this.logout
    }
  }
  

  render() {
    const { children } = this.props;
    return <Provider value={this.getProviderValue()}>{children}</Provider>;
  }
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
