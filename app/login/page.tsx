'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);

  const showMsg = (msg: string, type: string = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRegister = () => {
    const { name, email, password, confirm } = registerData;
    if (!name || !email || !password || !confirm) return showMsg('fill up all fields!', 'error');
    if (password !== confirm) return showMsg('Passwords wrong!', 'error');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === email)) return showMsg('Email already registered!', 'error');

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    showMsg(`Account Created! Welcome ${name} 🎉`);
    setRegisterData({ name: '', email: '', password: '', confirm: '' });
    setTimeout(() => setIsLogin(true), 1500);
  };

const handleLogin = () => {
  const { email, password } = loginData;

  if (!email || !password) {
    return showMsg('pls enter Email and password !', 'error');
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (!user) {
    return showMsg('Email or password wrong!', 'error');
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user));

  // checkout page ke login check ke liye token bhi save karo
  localStorage.setItem('token', 'rasokart-token');

  showMsg(`Welcome back, ${user.name}! ✅`);

  setLoginData({
    email: '',
    password: '',
  });

  // 1 second baad home page
  setTimeout(() => {
    router.push('/');
  }, 1000);
};
const router = useRouter();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      fontFamily: 'sans-serif'
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card-wrap { width: 380px; height: 500px; perspective: 1200px; }
        .card-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .card-inner.flipped { transform: rotateY(180deg); }
        .face {
          position: absolute; inset: 0; backface-visibility: hidden;
          -webkit-backface-visibility: hidden; border-radius: 20px;
          padding: 2rem; display: flex; flex-direction: column;
          background: rgba(255,255,255,0.08); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        }
        .face-back { transform: rotateY(180deg); }
        .face h2 { color: #fff; font-size: 1.5rem; font-weight: 600; text-align: center; margin-bottom: 4px; }
        .face p.subtitle { color: rgba(255,255,255,0.55); font-size: 13px; text-align: center; margin-bottom: 1.2rem; }
        .inp-group { position: relative; margin-bottom: 10px; }
        .inp-group .icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          font-size: 14px; color: rgba(255,255,255,0.4); pointer-events: none;
        }
        .face input {
          width: 100%; padding: 11px 14px 11px 36px; border-radius: 12px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          color: #fff; font-size: 14px; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .face input::placeholder { color: rgba(255,255,255,0.35); }
        .face input:focus { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.13); }
        .btn {
          width: 100%; padding: 12px; border: none; border-radius: 13px;
          color: #fff; font-size: 15px; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s; margin-top: 6px;
        }
        .btn-login { background: linear-gradient(135deg, #4f8ef7, #6c63ff); }
        .btn-register { background: linear-gradient(135deg, #11998e, #38ef7d); }
        .btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn:active { transform: scale(0.98); }
        .forgot { text-align: right; margin-top: -4px; margin-bottom: 10px; }
        .forgot a { color: rgba(255,255,255,0.4); font-size: 12px; cursor: pointer; }
        .forgot a:hover { color: rgba(255,255,255,0.7); }
        .switch-txt { color: rgba(255,255,255,0.5); font-size: 13px; text-align: center; margin-top: auto; padding-top: 14px; }
        .switch-txt a { color: #a78bfa; cursor: pointer; font-weight: 500; }
        .face-back .switch-txt a { color: #6ee7b7; }
        .switch-txt a:hover { text-decoration: underline; }
        .avatar {
          width: 50px; height: 50px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 0.8rem; font-size: 20px;
        }
        .avatar-login { background: linear-gradient(135deg, #667eea, #764ba2); box-shadow: 0 6px 20px rgba(102,126,234,0.4); }
        .avatar-register { background: linear-gradient(135deg, #11998e, #38ef7d); box-shadow: 0 6px 20px rgba(17,153,142,0.4); }
        .toast {
          position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
          padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 500;
          color: #fff; z-index: 999; animation: fadeIn 0.3s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .toast.success { background: linear-gradient(135deg, #11998e, #38ef7d); color: #0a3d32; }
        .toast.error { background: linear-gradient(135deg, #e53e3e, #fc8181); }
        @keyframes fadeIn { from { opacity: 0; top: 10px; } to { opacity: 1; top: 24px; } }
      `}</style>

      {/* TOAST MESSAGE */}
      {message && (
        <div className={`toast ${message.type}`}>{message.text}</div>
      )}

      <div className="card-wrap">
        <div className={`card-inner ${!isLogin ? 'flipped' : ''}`}>

          {/* LOGIN FACE */}
          <div className="face">
            <div className="avatar avatar-login">👤</div>
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to your account</p>

            <div className="inp-group">
              <span className="icon">✉</span>
              <input
                type="email" placeholder="Email address"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div className="inp-group">
              <span className="icon">🔒</span>
              <input
                type="password" placeholder="Password"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <div className="forgot"><a>Forgot password?</a></div>

            <button className="btn btn-login" onClick={handleLogin}>Login</button>

            <p className="switch-txt">
              Don't have an account?{' '}
              <a onClick={() => setIsLogin(false)}>Register</a>
            </p>
          </div>

          {/* REGISTER FACE */}
          <div className="face face-back">
            <div className="avatar avatar-register">✨</div>
            <h2>Create Account</h2>
            <p className="subtitle">Sign up to get started</p>

            <div className="inp-group">
              <span className="icon">👤</span>
              <input
                type="text" placeholder="Full name"
                value={registerData.name}
                onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
              />
            </div>
            <div className="inp-group">
              <span className="icon">✉</span>
              <input
                type="email" placeholder="Email address"
                value={registerData.email}
                onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>
            <div className="inp-group">
              <span className="icon">🔒</span>
              <input
                type="password" placeholder="Password"
                value={registerData.password}
                onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>
            <div className="inp-group">
              <span className="icon">🔒</span>
              <input
                type="password" placeholder="Confirm password"
                value={registerData.confirm}
                onChange={e => setRegisterData({ ...registerData, confirm: e.target.value })}
              />
            </div>

            <button className="btn btn-register" onClick={handleRegister}>Create Account</button>

            <p className="switch-txt">
              Already have an account?{' '}
              <a onClick={() => setIsLogin(true)}>Login</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}