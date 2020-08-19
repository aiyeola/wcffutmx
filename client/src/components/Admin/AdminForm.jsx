import React from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';

export const LoginAdmin = ({
  handleSubmit,
  handleChange,
  submitting,
  value
}) => (
  <>
    <h1>Admin Login</h1>
    <form onSubmit={handleSubmit} name="loginAdmin" className="adminForm">
      <Input
        name="username"
        inputType="text"
        placeholder="Username"
        value={value.username}
        onChange={handleChange}
        required={{ required: 'required' }}
      />
      <Input
        name="password"
        inputType="password"
        value={value.password}
        placeholder="Enter Password"
        onChange={handleChange}
        popup="Password"
        required={{ required: 'required' }}
      />
      <Button
        buttonId="login"
        buttonType="submit"
        classes="btn btn-primary"
        text="Login"
        submitting={submitting}
      />
    </form>
  </>
);

export const RegisterAdmin = ({
  handleSubmit,
  handleChange,
  submitting,
  error,
  value
}) => (
  <>
    <h1>Register Admin</h1>
    <form onSubmit={handleSubmit} name="registerAdmin" className="adminForm">
      <Input
        name="username"
        inputType="text"
        value={value.username}
        placeholder="Username"
        onChange={handleChange}
        required={{ required: 'required' }}
      />
      <Input
        name="password"
        inputType="password"
        value={value.password}
        placeholder="Enter Password"
        onChange={handleChange}
        error={error.password}
        popup="Password"
        required={{ required: 'required' }}
      />
      <Input
        name="newPassword"
        inputType="password"
        value={value.newPassword}
        placeholder="Password"
        onChange={handleChange}
        error={error.match}
        popup="Confirm password"
        required={{ required: 'required' }}
      />
      <Button
        buttonId="register"
        buttonType="submit"
        classes="btn btn-primary"
        text="Register"
        submitting={submitting}
      />
    </form>
  </>
);
