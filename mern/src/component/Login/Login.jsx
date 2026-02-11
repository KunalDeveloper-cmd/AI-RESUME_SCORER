import React, { useContext } from 'react';
import styles from './Login.module.css';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';

import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const Login = () => {
  const { setLogin, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 1. Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const payload = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      // 2. Register / log in on our backend
      const res = await axios.post('/api/user', payload);
      const userFromServer = res.data.user;

      // 3. Store in context and localStorage
      setLogin(true);
      setUserInfo(userFromServer);
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('userInfo', JSON.stringify(userFromServer));

      // 4. Go to dashboard
      navigate('/dashboard');
    } catch (err) {
      alert('Something went wrong during login');
      console.error(err);
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h1>Login </h1>
          <VpnKeyIcon />
        </div>

        <div className={styles.googleBtn} onClick={handleLogin}>
          <GoogleIcon sx={{ fontSize: 20, color: 'red' }} /> Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;