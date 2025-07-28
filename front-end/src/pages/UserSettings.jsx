import React from 'react';

export default function UserSettings() {
  return (
    <div
      className="container py-5 text-light"
      style={{
        backgroundColor: '#0d0d0d',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2
        className="mb-5 fw-bold"
        style={{
          color: '#f4c04c',
          fontSize: '2.5rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          userSelect: 'none',
          textShadow: '0 0 8px #f4c04c',
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
        }}
      >
        {['Account', 'Notifications', 'Security'].map((tab, idx) => (
          <li className="nav-item" role="presentation" key={tab}>
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
                borderBottom:
                  idx === 0 ? '3px solid #f4c04c' : '3px solid transparent',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                backgroundColor: 'transparent',
                outline: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (!e.target.classList.contains('active')) {
                  e.target.style.color = '#f4c04c';
                }
              }}
              onMouseLeave={e => {
                if (!e.target.classList.contains('active')) {
                  e.target.style.color = '#888';
                }
              }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Tabs content */}
      <div className="tab-content" id="settingsTabsContent">
        {/* Account */}
        <div
          className="tab-pane fade show active"
          id="account"
          role="tabpanel"
          aria-labelledby="account-tab"
        >
          <section
            style={{
              backgroundColor: '#1f1f1f',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 0 20px rgba(244, 192, 76, 0.2)',
              maxWidth: '480px',
              marginBottom: '3rem',
            }}
          >
            <h4
              style={{
                color: '#f4c04c',
                marginBottom: '1.5rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Update Account Info
            </h4>
            <form>
              <label
                htmlFor="fullName"
                style={{
                  display: 'block',
                  color: '#bbb',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.3px',
                }}
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                  borderRadius: '8px',
                  border: '1.5px solid #444',
                  backgroundColor: '#121212',
                  color: '#eee',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#f4c04c';
                  e.target.style.boxShadow = '0 0 10px #f4c04c';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#444';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  color: '#bbb',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.3px',
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  marginBottom: '2rem',
                  borderRadius: '8px',
                  border: '1.5px solid #444',
                  backgroundColor: '#121212',
                  color: '#eee',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#f4c04c';
                  e.target.style.boxShadow = '0 0 10px #f4c04c';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#444';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <button
                type="submit"
                style={{
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
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = '#d1a82f';
                  e.target.style.boxShadow = '0 8px 25px rgba(209, 168, 47, 0.7)';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#f4c04c';
                  e.target.style.boxShadow = '0 6px 15px rgba(244, 192, 76, 0.6)';
                }}
              >
                Save Changes
              </button>
            </form>
          </section>
        </div>

        {/* Notifications */}
        <div
          className="tab-pane fade"
          id="notifications"
          role="tabpanel"
          aria-labelledby="notifications-tab"
        >
          <section
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '480px',
              boxShadow: '0 0 15px rgba(13,202,240,0.3)',
              marginBottom: '3rem',
            }}
          >
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

        {/* Security */}
        <div
          className="tab-pane fade"
          id="security"
          role="tabpanel"
          aria-labelledby="security-tab"
        >
          <section
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '480px',
              boxShadow: '0 0 20px rgba(220,53,69,0.3)',
              marginBottom: '3rem',
            }}
          >
            <h4
              style={{
                color: '#dc3545',
                marginBottom: '1.5rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Security Settings
            </h4>
            <label
              htmlFor="newPassword"
              style={{
                display: 'block',
                color: '#bbb',
                fontWeight: '600',
                marginBottom: '0.5rem',
                letterSpacing: '0.3px',
              }}
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                marginBottom: '2rem',
                borderRadius: '8px',
                border: '1.5px solid #444',
                backgroundColor: '#121212',
                color: '#eee',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#dc3545';
                e.target.style.boxShadow = '0 0 10px #dc3545';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              style={{
                width: '100%',
                backgroundColor: '#dc3545',
                border: 'none',
                padding: '0.85rem',
                borderRadius: '9999px',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.1rem',
                letterSpacing: '1.5px',
                boxShadow: '0 6px 15px rgba(220, 53, 69, 0.6)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = '#b72834';
                e.target.style.boxShadow = '0 8px 25px rgba(183, 40, 52, 0.7)';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.boxShadow = '0 6px 15px rgba(220, 53, 69, 0.6)';
              }}
            >
              Update Password
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
