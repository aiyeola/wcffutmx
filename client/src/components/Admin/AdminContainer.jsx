/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginAdmin, RegisterAdmin } from './AdminForm';
import validator from '../../helpers/validator';
import Logo from '../../assets/logo.jpg';
import ErrorBoundary from '../shared/ErrorBoundary';
import { loginAdmin, registerAdmin } from '../../redux/actions/adminActions';
import { notify } from '../../helpers/notify';

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      newPassword: '',
      submitting: false,
      errors: {
        email: undefined,
        password: undefined,
        match: undefined
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    const {
      admin: { isLoggedIn, message, error },
      newAdmin: { message: registerMessage, error: registerError },
      history
    } = prevProps;

    if (isLoggedIn) {
      notify('success', message);
      history.push('/student');
    }
    if (error) {
      notify('error', error);
      this.setState({
        username: '',
        password: '',
        submitting: false
      });
    }

    if (registerMessage) {
      notify('success', registerMessage);
      // redirect super admin to dashboard
    }
    if (registerError) {
      notify('error', registerError);
      this.setState({
        username: '',
        password: '',
        newPassword: '',
        submitting: false
      });
    }
  }

  async handleChange({ target }) {
    this.setState((prev) => ({ ...prev, [target.name]: target.value }));
    const { error } = await validator(target.name, target.value);
    this.setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [target.name]: error }
    }));
    this.setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, match: undefined }
    }));
  }

  handleSubmit(event) {
    const { loginAdmin, registerAdmin } = this.props;
    const { errors, password, newPassword, username } = this.state;
    event.preventDefault();
    const formName = event.target.name;
    const hasErrors = Object.values(errors).some((val) => val !== undefined);
    if (formName === 'loginAdmin') {
      if (!hasErrors) {
        this.setState({
          submitting: true
        });
        const adminDetails = {
          username,
          password
        };
        loginAdmin(adminDetails);
      } else {
        notify('error', 'Invalid Password');
      }
    }

    if (formName === 'registerAdmin') {
      if (!hasErrors && password === newPassword) {
        this.setState({
          submitting: true
        });
        const adminDetails = {
          username,
          password,
          newPassword
        };
        registerAdmin(adminDetails);
      } else {
        this.setState((prev) => ({
          ...prev,
          errors: { ...prev.errors, match: 'Passwords do not match' }
        }));
      }
    }
  }

  render() {
    const { match } = this.props;
    const { errors, username, password, newPassword, submitting } = this.state;
    const value = {
      username,
      password,
      newPassword
    };
    return (
      <div className="container">
        <img src={Logo} alt="Youth Alive Fellowship Logo" className="logo" />
        {match.url === '/admin' ? (
          <ErrorBoundary>
            <LoginAdmin
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              value={value}
              submitting={submitting}
            />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <RegisterAdmin
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              error={errors}
              value={value}
              submitting={submitting}
            />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

AdminContainer.propTypes = {
  admin: PropTypes.object.isRequired,
  newAdmin: PropTypes.object.isRequired,
  loginAdmin: PropTypes.func.isRequired,
  registerAdmin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ admin, newAdmin }) => ({ admin, newAdmin });

export default connect(mapStateToProps, { loginAdmin, registerAdmin })(
  AdminContainer
);
