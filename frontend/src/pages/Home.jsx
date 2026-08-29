import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `
        repeating-linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.04) 0px,
          rgba(139, 92, 246, 0.04) 1px,
          transparent 1px,
          transparent 60px
        ),
        #0d0d14
      `,
      color: '#fff',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#8b5cf6', fontSize: '3.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
    🎓 Pegasus E-Learning
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Learn smarter. Teach better. All in one place.
      </p>
      <div>
        <button
          onClick={() => navigate('/login')}
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
          style={{
            background: loginHover ? '#7c3aed' : '#8b5cf6',
            color: '#fff',
            padding: '12px 30px',
            marginRight: '12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transform: loginHover ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: loginHover ? '0 6px 20px rgba(139, 92, 246, 0.4)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          onMouseEnter={() => setRegisterHover(true)}
          onMouseLeave={() => setRegisterHover(false)}
          style={{
            background: registerHover ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
            color: '#a78bfa',
            padding: '12px 30px',
            border: '1.5px solid #8b5cf6',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transform: registerHover ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease'
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;