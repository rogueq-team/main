import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [userType, setUserType] = useState('advertiser');
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);

  const SITE_KEY = '6LfHcNwrAAAAACoTMpIEaJZjM2EYq34Xezh-8jSc';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreements.terms || !agreements.privacy) {
      alert('Пожалуйста, примите все условия соглашения');
      return;
    }

    if (!captchaVerified) {
      alert('Пожалуйста, подтвердите, что вы не робот');
      return;
    }

    const captchaToken = captchaRef.current.getValue();
    
    console.log('=== ДАННЫЕ ДЛЯ РЕГИСТРАЦИИ ===');
    console.log('Тип пользователя:', userType);
    console.log('Имя:', formData.username);
    console.log('Email:', formData.email);
    console.log('Капча токен:', captchaToken);
    console.log('==============================');
    
    alert('Регистрация успешна!');
  };

  return (
    <div className="App">
      <header className="main-header">
        <div className="header-content">
          <h1 className="header-title">BrandConnect</h1>
          <nav className="header-nav">
            <a href="#" className="nav-link">О платформе</a>
            <a href="#" className="nav-link">Контакты</a>
            <a href="#" className="nav-link">Войти</a>
          </nav>
        </div>
      </header>

      <div className="main-content">
        <div className="registration-container">
          <h2>Регистрация</h2>
          
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${userType === 'advertiser' ? 'active' : ''}`}
              onClick={() => setUserType('advertiser')}
            >
              Я рекламодатель
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'contentmaker' ? 'active' : ''}`}
              onClick={() => setUserType('contentmaker')}
            >
              Я контентмейкер
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="agreements">
              <div className="agreement-item">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={agreements.terms}
                  onChange={handleAgreementChange}
                />
                <label htmlFor="terms">
                  Я принимаю условия <a href="#" className="agreement-link">Пользовательского соглашения</a>
                </label>
              </div>
              
              <div className="agreement-item">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={agreements.privacy}
                  onChange={handleAgreementChange}
                />
                <label htmlFor="privacy">
                  Я согласен на обработку персональных данных в соответствии с <a href="#" className="agreement-link">Политикой конфиденциальности</a>
                </label>
              </div>
            </div>

            <div className="captcha-container">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={!agreements.terms || !agreements.privacy || !captchaVerified}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>

      {/* Футер */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#" className="footer-link">О платформе</a>
            <a href="#" className="footer-link">Контакты</a>
            <a href="#" className="footer-link">Пользовательское соглашение</a>
            <a href="#" className="footer-link">Политика конфиденциальности</a>
            <a href="#" className="footer-link">Поддержка</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 BrandConnect. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;