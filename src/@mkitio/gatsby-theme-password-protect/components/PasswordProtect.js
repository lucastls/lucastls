/**
 * Write-only the password as cookie
 */
import React, { useState } from 'react';
import { setSessionPassword } from '../utils/utils';
import Logo from '@lekoarts/gatsby-theme-jodie/src/icons/logo';

const styles = {
  wrapper: {
    height: '75vh',
    background: '#ffffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: '2.5rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '.25rem',
    boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.85)',
  },

  button: {
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '.25rem',
    boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.85)',
    width: '100%',
    height: '2.5rem',
    marginTop: '16px',
    userSelect: "none",
    touchAction: "manipulation",
  },
  
  buttonHover: {
    transform: 'translateY(-1px)',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 12px',
    color: 'rgba(0, 0, 0, 0.65)',
  },

  buttonFocus: {
    borderColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 12px',
    color: 'rgba(0, 0, 0, 0.65)',
  },

  buttonActive: {
    backgroundColor: '#F0F0F1',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: 'rgba(0, 0, 0, 0.06) 0 2px 4px',
    color: 'rgba(0, 0, 0, 0.65)',
    transform: 'translateY(0)',
  }

};

const PasswordProtect = () => {
  const [password, setPassword] = useState('');
  const [isButtonHovered, buttonHover] = useState(false);
  const [isThemeHovered, themeHover] = useState(false);
  const [isSiteHovered, siteHover] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    setSessionPassword(password);
    window.location.reload(); // eslint-disable-line
  };

  return (
    
    <div style={styles.wrapper}>
      <Logo/>
      <h2>Password</h2>

      <form onSubmit={onSubmit} style={{ width: '320px' }}>
        <input
          name="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isButtonHovered ? styles.buttonHover : null)
          }}
          onMouseEnter={() => buttonHover(true)}
          onMouseLeave={() => buttonHover(false)}
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default PasswordProtect;
