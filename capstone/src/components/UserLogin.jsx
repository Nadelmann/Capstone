import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div>
      <h2>Login</h2>
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserLogin;

UserLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
