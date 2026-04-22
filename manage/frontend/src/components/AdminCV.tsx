import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Layout from './Layout';

const AdminCV: React.FC = () => {
  const [cvUrl, setCvUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3002/api/cv')
      .then((res) => res.json())
      .then((data) => {
        setCvUrl(data.cvUrl || '');
        setLoading(false);
      });
  }, []);

  const saveCV = async () => {
    await fetch('http://localhost:3002/api/cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvUrl }),
    });
    alert('CV URL saved successfully!');
    setIsEditing(false);
  };

  if (loading) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Manage CV</h2>
      <div className="bg-gray-800 p-6 rounded-lg">
        <label className="block mb-2 font-semibold">Google Drive CV Link</label>
        <input 
          type="text" 
          value={cvUrl} 
          onChange={(e) => setCvUrl(e.target.value)} 
          disabled={!isEditing}
          className="w-full p-2 mb-4 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:border-[#1B9FE5]"
          placeholder="Paste your Google Drive link here..."
        />
        
        {isEditing ? (
          <button 
            onClick={saveCV} 
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold transition"
          >
            Save Changes
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="bg-[#1B9FE5] hover:bg-[#1B9FE5]/80 px-6 py-2 rounded font-bold transition"
          >
            Edit Link
          </button>
        )}
      </div>
    </Layout>
  );
};

export default AdminCV;
