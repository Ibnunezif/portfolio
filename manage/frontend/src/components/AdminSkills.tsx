import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import type { Skill } from '../types';

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));

  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        
        if (payload.email !== 'ibnunezif99@gmail.com') {
          handleLogout();
        }
      } catch (e) {
        handleLogout();
      }
    }
  }, [token]);

  useEffect(() => {
    fetch('http://localhost:3002/api/skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching skills:', err));
  }, []);

  const handleLoginSuccess = (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    
    try {
      // Decode JWT payload (middle part of the token)
      const base64Url = idToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      
      if (payload.email !== 'ibnunezif99@gmail.com') {
        setMessage('Error: Unauthorized email address.');
        googleLogout();
        return;
      }

      setToken(idToken);
      localStorage.setItem('admin_token', idToken);
      setMessage('Logged in successfully');
    } catch (error) {
      console.error('Failed to decode token:', error);
      setMessage('Error: Login failed to verify identity.');
    }
  };

  const handleLogout = () => {
    googleLogout();
    setToken(null);
    localStorage.removeItem('admin_token');
    setMessage('Logged out');
  };

  const handleLevelChange = (name: string, newLevel: number) => {
    setSkills((prev) =>
      prev.map((s) => (s.name === name ? { ...s, level: newLevel } : s))
    );
  };

  const saveChanges = async () => {
    if (!token) {
      setMessage('Please login first');
      return;
    }

    try {
      const res = await fetch('http://localhost:3002/api/skills', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(skills),
      });
      
      if (res.ok) {
        setMessage('Saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errData = await res.json();
        setMessage(`Error: ${errData.error}`);
        if (res.status === 401 || res.status === 403) {
          handleLogout(); // Clear invalid token
        }
      }
    } catch (err) {
      setMessage('Failed to save.');
    }
  };

  if (loading) return <div className="p-8 text-center text-white bg-gray-900 min-h-screen">Loading Admin Panel...</div>;

  return (
    <section className="py-20 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Owner Dashboard</h2>
        
        {!token ? (
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => setMessage('Login Failed')}
              useOneTap
            />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <span className="font-medium w-1/3">{skill.name}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleLevelChange(skill.name, parseInt(e.target.value))}
                    className="w-1/2 accent-blue-500"
                  />
                  <span className="w-12 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center">
              <button
                onClick={saveChanges}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Save All Changes
              </button>
              <button
                onClick={handleLogout}
                className="mt-4 text-gray-400 hover:text-white underline text-sm"
              >
                Logout
              </button>
              {message && <p className={`mt-4 font-medium ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AdminSkills;
