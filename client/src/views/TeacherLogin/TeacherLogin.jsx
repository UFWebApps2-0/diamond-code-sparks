import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import './TeacherLogin.less';
import axios from 'axios';

export default function TeacherLogin() {
  // State hooks for managing form inputs and loading state
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); // Google sign in options
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Hook for programmatically navigating

 // Function to handle normal login process
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

        // Clear input fields
        setEmail('');
        setPassword('');
      });
  };

  // Function to handle login via Google
  const handleGoogleLogin = (res) => {
    const token = res.credential; // Get the token from Google response
    // Save the token to session storage
    sessionStorage.setItem('googleToken', res.credential);


    // Send the token to your Strapi backend for verification
    axios.post('http://localhost:1337/api/googleAuth/verify-google-token', { token })
    .then(response => {
      // Check if the response includes a new user object
      if (response.data.newUser) {
        // Sign up the new user using the response data
        const newUser = response.data.newUser;
        axios.post('http://localhost:1337/api/users', newUser)
        .then(signUpResponse => {
          // Handle successful sign-up (e.g., set user session, navigate)
          console.log('User signed up successfully:', signUpResponse.data);
          // You might want to set the user session here as well
          // ...
          // Stay on the same page and display a success message
          message.success('Google User Registered Successfully');

        })
        .catch(signUpError => {
          console.error('Sign-up failed:', signUpError);
          setLoading(false);
          message.error('Sign-up through Google failed.');
        });
      } else {
        // Existing user logic
        const userObject = response.data.user; // Extract user data from the backend response

        // Set user session with the JWT and user data received from the backend
        setUserSession(response.data.jwt, JSON.stringify(userObject));
        setLoading(false);

        // Navigate based on the user's role
        if (userObject.role.name === 'Content Creator') {
          navigate('/ccdashboard');
        } else if (userObject.role.name === 'Researcher') {
          navigate('/report');
        } else {
          navigate('/dashboard');
        }
      }
    })
    .catch(error => {
      console.error('Token verification failed:', error);
      setLoading(false);
      message.error('Google login failed.');
    });
};

  // Init google client and render button on page load
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
        text: "Sign In With Google"
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
    <div className='container nav-padding'>
      <NavBar />
      <div id='content-wrapper'>
        <form
          id='box'
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        >
          <div id='box-title'>User Login</div>
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
            value={loading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            disabled={loading}
          />
        </form>
      </div>

      {/* Show Sign In W Google Button */}
      <h2 style={SignInWGoogleText}>Sign in with Google:</h2>
      <div id="signInDiv" style={CenterGoogleBtn}></div>
    </div>
  );
}
