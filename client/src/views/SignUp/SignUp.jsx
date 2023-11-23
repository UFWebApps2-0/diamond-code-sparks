import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};
const createUser = (firstName, lastName) => {
  const UserData = {
    first_name: firstName,
    last_name: lastName,
}};
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setLoading(true);
    let body = { identifier: email, password: password };
    postUser(body)
      .then((response) => {
        setUserSession(response.data.jwt, JSON.stringify(response.data.user));
        setLoading(false);
        if (response.data.user.role.name === 'Content Creator') {
          navigate('/ccdashboard');
        } else if (response.data.user.role.name === 'Researcher') {
          navigate('/report');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Login failed. Please input a valid email and password.');
      });
  };
  const handleGoogleLogin = (res) => {
    console.log("Encoded JWT ID Token: " + res.credential)
    const userObject = jwtDecode(res.credential);
    console.log(userObject);

    const firstName = userObject.given_name;
    const lastName = userObject.family_name;
    const email = userObject.email;
    const googleId = userObject.sub; 

    console.log("Last Name", lastName)
    console.log("First Name", firstName)
    console.log("Email", email)

// Create a new user
axios.post('http://localhost:1337/api/users', {
  email: email,
  username: firstName + lastName,
  password: 'default', // You might want to generate a random password instead
  googleID: googleId
}).then(response => {
  console.log('User created:', response.data);
  // Additional logic after user creation
}).catch(error => {
  console.error('Error creating user:', error);
});
};

axios
  .post('http://localhost:1337/auth/local/register', {
    identifier: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "770928523351-1b7sbtjeoloc1i675t92f0ko31ckaojn.apps.googleusercontent.com",
      callback: handleGoogleLogin
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "filled_blue",
        size: "large",
        text: "Continue With Google"
      });
  }, []);


  // Sign in text and Google Button
  const CenterGoogleBtn = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '5vh', // Adjust to your preferred height
  };
  const SignInWGoogleText = {
    color: 'white'
  }
  return (
    <>
      <div className='container nav-padding'>
        <NavBar />
        <div id='content-wrapper'>
          <form
            id='box'
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
          >
            <div id='box-title'>Sign Up</div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              autoComplete='username'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              autoComplete='current-password'
            />
            <p id='forgot-password' onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </p>
            <input
              type='button'
              value={loading ? 'Loading...' : 'Create Account'}
              onClick={handleLogin}
              disabled={loading}
            />
          </form>
        </div>
      {/* Show Sign In W Google Button */}
      <h2 style={SignInWGoogleText}>Continue with Google:</h2>
      <div id="signInDiv" style={CenterGoogleBtn}></div>
      </div>
    </>
  );
}