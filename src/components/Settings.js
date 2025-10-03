import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: user?.userType === 'advertiser' ? user?.name : '',
    website: '',
    description: '',
    socialLinks: {
      youtube: '',
      instagram: '',
      telegram: '',
      tiktok: '',
      vk: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Сохранение настроек:', formData);
    alert('Настройки сохранены!');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Настройки профиля</h1>
        
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Основные данные
          </button>
          {user?.userType === 'contentmaker' && (
            <button 
              className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              Социальные сети
            </button>
          )}
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Безопасность
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          {/* Вкладка основных данных */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Основная информация</h2>
              
              <div className="form-group">
                <label htmlFor="name">
                  {user?.userType === 'advertiser' ? 'Название компании' : 'Имя и фамилия'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={user?.userType === 'advertiser' ? 'Введите название компании' : 'Введите ваше имя'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 999-99-99"
                />
              </div>

              {user?.userType === 'advertiser' && (
                <div className="form-group">
                  <label htmlFor="website">Веб-сайт компании</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="description">
                  {user?.userType === 'advertiser' ? 'О компании' : 'О себе'}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={user?.userType === 'advertiser' ? 'Расскажите о вашей компании...' : 'Расскажите о себе...'}
                  rows="4"
                />
              </div>
            </div>
          )}

          {/* Вкладка социальных сетей (только для контентмейкеров) */}
          {activeTab === 'social' && user?.userType === 'contentmaker' && (
            <div className="tab-content">
              <h2>Привязка социальных сетей</h2>
              <p className="section-description">
                Привяжите ваши социальные сети для получения статистики и предложений по сотрудничеству
              </p>

              <div className="social-grid">
                <div className="social-input-group">
                  <label htmlFor="social_youtube">
                    <span className="social-icon">📺</span>
                    YouTube
                  </label>
                  <input
                    type="url"
                    id="social_youtube"
                    name="social_youtube"
                    value={formData.socialLinks.youtube}
                    onChange={handleChange}
                    placeholder="https://youtube.com/c/yourchannel"
                  />
                </div>

                <div className="social-input-group">
                  <label htmlFor="social_instagram">
                    <span className="social-icon">📷</span>
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="social_instagram"
                    name="social_instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>

                <div className="social-input-group">
                  <label htmlFor="social_telegram">
                    <span className="social-icon">✈️</span>
                    Telegram
                  </label>
                  <input
                    type="url"
                    id="social_telegram"
                    name="social_telegram"
                    value={formData.socialLinks.telegram}
                    onChange={handleChange}
                    placeholder="https://t.me/yourchannel"
                  />
                </div>

                <div className="social-input-group">
                  <label htmlFor="social_tiktok">
                    <span className="social-icon">🎵</span>
                    TikTok
                  </label>
                  <input
                    type="url"
                    id="social_tiktok"
                    name="social_tiktok"
                    value={formData.socialLinks.tiktok}
                    onChange={handleChange}
                    placeholder="https://tiktok.com/@yourprofile"
                  />
                </div>

                <div className="social-input-group">
                  <label htmlFor="social_vk">
                    <span className="social-icon">👥</span>
                    VK
                  </label>
                  <input
                    type="url"
                    id="social_vk"
                    name="social_vk"
                    value={formData.socialLinks.vk}
                    onChange={handleChange}
                    placeholder="https://vk.com/yourprofile"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Вкладка безопасности */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <h2>Безопасность</h2>
              
              <div className="form-group">
                <label htmlFor="currentPassword">Текущий пароль</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Введите текущий пароль"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Новый пароль</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Введите новый пароль"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Повторите новый пароль"
                />
              </div>

              <div className="security-actions">
                <button type="button" className="secondary-btn">
                  Сменить пароль
                </button>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              Сохранить изменения
            </button>
            <button type="button" className="secondary-btn" onClick={() => window.history.back()}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;