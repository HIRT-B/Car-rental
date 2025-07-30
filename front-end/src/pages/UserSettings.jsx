import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

export default function UserSettings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:3000/user/users/${user.id}`)
        .then(res => {
          const { fullname, email, phone, address } = res.data;
          setFormData({
            fullname,
            email,
            phone: phone || '',
            address: address || '',
          });
        })
        .catch(err => console.error('Error fetching user info:', err));
    }
  }, [user?.id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = e => {
    setPasswordData({ password: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/user/users/${user.id}`, {
        ...formData,
        role: user.role || 'client',
        status: user.status || 'active',
      });
      setSuccessMessage('✅ Your account information has been successfully updated.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating account:', err);
      alert('Failed to update account');
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/user/users/${user.id}`, {
        ...formData,
        password: passwordData.password,
        role: user.role || 'client',
        status: user.status || 'active',
      });
      setSuccessMessage('🔐 Your password has been changed successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating password:', err);
      alert('Failed to update password');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0d0d0d',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: 'white',
        marginLeft:"10rem",
        marginRight:"10rem",
        marginTop:"1rem",
        borderRadius:"40px",
      }}
    >
      {/* Success Message */}
      {successMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1a1a1a',
            color: '#4fffa2',
            padding: '1rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(79, 255, 162, 0.4)',
            zIndex: 9999,
            fontWeight: '600',
            fontSize: '1.1rem',
            userSelect: 'none',
            transition: 'opacity 0.3s ease',
            opacity: successMessage ? 1 : 0,
          }}
        >
          {successMessage}
        </div>
      )}

      <h2
        style={{
          color: '#f4c04c',
          fontSize: '2.5rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          userSelect: 'none',
          textShadow: '0 0 8px #f4c04c',
          marginBottom: '2rem',
        }}
      >
        ⚙️ User Settings
      </h2>

      {/* Tabs */}
      <ul
        className="nav nav-tabs border-0"
        id="settingsTabs"
        role="tablist"
        style={{
          borderBottom: '2px solid #222',
          marginBottom: '2rem',
          userSelect: 'none',
          width: '480px',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          padding: 0,
        }}
      >
        {['Account', 'Notifications', 'Security'].map((tab, idx) => (
          <li className="nav-item" role="presentation" key={tab} style={{ listStyle: 'none' }}>
            <button
              className={`nav-link ${idx === 0 ? 'active' : ''}`}
              id={`${tab.toLowerCase()}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${tab.toLowerCase()}`}
              type="button"
              role="tab"
              aria-selected={idx === 0 ? 'true' : 'false'}
              style={{
                color: idx === 0 ? '#f4c04c' : '#888',
                fontWeight: '600',
                fontSize: '1.1rem',
                padding: '0.5rem 1.5rem',
                border: 'none',
                borderBottom: idx === 0 ? '3px solid #f4c04c' : '3px solid transparent',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                backgroundColor: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                borderRadius: '8px 8px 0 0',
              }}
              onMouseEnter={e => {
                if (!e.target.classList.contains('active')) e.target.style.color = '#f4c04c';
              }}
              onMouseLeave={e => {
                if (!e.target.classList.contains('active')) e.target.style.color = '#888';
              }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div
        className="tab-content"
        id="settingsTabsContent"
        style={{
          backgroundColor: '#1f1f1f',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 0 20px rgba(244, 192, 76, 0.2)',
          width: '480px',
          maxWidth: '100%',
        }}
      >
        {/* Account Tab */}
        <div
          className="tab-pane fade show active"
          id="account"
          role="tabpanel"
          aria-labelledby="account-tab"
        >
          <h4 style={{ color: '#f4c04c', marginBottom: '1.5rem', fontWeight: '700', letterSpacing: '1px' }}>
            Update Account Info
          </h4>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="fullName"
              style={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaUser /> Full Name
            </label>
            <input
              id="fullName"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />

            <label
              htmlFor="email"
              style={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MdOutlineMail /> Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              style={inputStyle}
            />

            <label
              htmlFor="phone"
              style={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FiPhone /> Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />

            <label
              htmlFor="address"
              style={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaMapMarkerAlt /> Address
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Save Changes
            </button>
          </form>
        </div>

        {/* Notifications Tab */}
        <div
          className="tab-pane fade"
          id="notifications"
          role="tabpanel"
          aria-labelledby="notifications-tab"
          style={{ color: '#ccc' }}
        >
          <section>
            <h4
              style={{
                color: '#0dcaf0',
                marginBottom: '1.5rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Notification Preferences
            </h4>
            {[
              { id: 'emailNotif', label: 'Receive Email Notifications', defaultChecked: true },
              { id: 'smsNotif', label: 'Receive SMS Notifications', defaultChecked: false },
              { id: 'appNotif', label: 'Enable In-App Alerts', defaultChecked: true },
            ].map(({ id, label, defaultChecked }) => (
              <div
                className="form-check form-switch"
                key={id}
                style={{ marginBottom: '1.2rem' }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={id}
                  defaultChecked={defaultChecked}
                  style={{
                    cursor: 'pointer',
                    width: '2.2rem',
                    height: '1.2rem',
                    backgroundColor: '#333',
                    borderRadius: '9999px',
                    transition: 'background-color 0.3s',
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={id}
                  style={{
                    marginLeft: '0.8rem',
                    color: '#ccc',
                    fontWeight: '500',
                    userSelect: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </label>
              </div>
            ))}
          </section>
        </div>

        {/* Security Tab */}
        <div
          className="tab-pane fade"
          id="security"
          role="tabpanel"
          aria-labelledby="security-tab"
          style={{ color: '#ccc' }}
        >
          <section>
            <h4
              style={{
                color: '#ff4c4c',
                marginBottom: '1.5rem',
                fontWeight: '700',
                letterSpacing: '1px',
              }}
            >
              🔒 Change Password
            </h4>
            <form onSubmit={handlePasswordSubmit}>
              <label htmlFor="password" style={{ color: '#bbb' }}>
                New Password
              </label>
              <input
                id="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                type="password"
                style={inputStyle}
              />

              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#ff4c4c',
                  boxShadow: '0 6px 15px rgba(255, 76, 76, 0.6)',
                }}
              >
                Update Password
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  marginBottom: '1.5rem',
  borderRadius: '8px',
  border: '1.5px solid #444',
  backgroundColor: '#000',
  color: '#eee',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#f4c04c',
  border: 'none',
  padding: '0.85rem',
  borderRadius: '9999px',
  color: '#121212',
  fontWeight: '700',
  fontSize: '1.1rem',
  letterSpacing: '1.5px',
  boxShadow: '0 6px 15px rgba(244, 192, 76, 0.6)',
  cursor: 'pointer',
};
