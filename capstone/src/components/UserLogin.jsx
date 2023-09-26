import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserLogin.css';

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = `https://fakestoreapi.com`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!username || !password) {
      setError('Please sign in.');
      return;
    }
  
    const login = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Response:', response);
  
        if (response.ok) {
          const result = await response.json();
  
          if (result.token) {
            const token = result.token;
            localStorage.setItem('Token', token);
            onLogin();
            navigate('/allproducts');
          } else {
            setError('Invalid response data.');
          }
        } else {
          const errorResponse = await response.json();
          setError(errorResponse.error ? errorResponse.error : 'Invalid username or password.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while logging in.');
      }
    };
  
    await login();
  };
  

  return (   
    <div className='login-container'>
    <h2 style={{color:'rgb(82, 82, 136)', fontWeight:'bolder'}}>Login:</h2>
      {error && <p>{error.message}</p>}
      <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password: <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='submitbutton' type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default UserLogin;

UserLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
