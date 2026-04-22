import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Spinner from './Spinner';
import type { Experience } from '../types';

const AdminExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Omit<Experience, '_id'>>({
    company: '',
    role: '',
    duration: '',
    location: '',
    points: [''],
    order: 0
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = () => {
    setLoading(true);
    fetch('http://localhost:3002/api/experiences')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ''] });
  };

  const removePoint = (index: number) => {
    const newPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: newPoints });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:3002/api/experiences/${editingId}` 
      : 'http://localhost:3002/api/experiences';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setEditingId(null);
    setFormData({
      company: '',
      role: '',
      duration: '',
      location: '',
      points: [''],
      order: experiences.length
    });
    fetchExperiences();
  };

  const startEdit = (exp: Experience) => {
    setEditingId(exp._id || null);
    setFormData({
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
      location: exp.location,
      points: exp.points,
      order: exp.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteExperience = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    await fetch(`http://localhost:3002/api/experiences/${id}`, { method: 'DELETE' });
    fetchExperiences();
  };

  const moveExperience = async (index: number, direction: 'up' | 'down') => {
    const newExperiences = [...experiences];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= experiences.length) return;

    // Swap orders
    const tempOrder = newExperiences[index].order;
    newExperiences[index].order = newExperiences[newIndex].order;
    newExperiences[newIndex].order = tempOrder;

    // Save both changes
    await Promise.all([
      fetch(`http://localhost:3002/api/experiences/${newExperiences[index]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExperiences[index]),
      }),
      fetch(`http://localhost:3002/api/experiences/${newExperiences[newIndex]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExperiences[newIndex]),
      })
    ]);

    fetchExperiences();
  };

  if (loading && experiences.length === 0) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Manage Experience</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-12 border border-gray-700 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-[#1B9FE5]">{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Company</label>
            <input 
              name="company" value={formData.company} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role</label>
            <input 
              name="role" value={formData.role} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Duration (e.g., 2021 - Present)</label>
            <input 
              name="duration" value={formData.duration} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input 
              name="location" value={formData.location} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Bullet Points</label>
          {formData.points.map((point, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea 
                value={point} onChange={(e) => handlePointChange(index, e.target.value)}
                className="flex-1 bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none h-20" required
              />
              <button 
                type="button" onClick={() => removePoint(index)}
                className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-3 rounded transition-all"
              >
                ×
              </button>
            </div>
          ))}
          <button 
            type="button" onClick={addPoint}
            className="text-sm text-[#1B9FE5] hover:underline"
          >
            + Add Point
          </button>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-[#1B9FE5] hover:bg-[#1B9FE5]/80 px-8 py-2 rounded font-bold transition-all">
            {editingId ? 'Update Experience' : 'Save Experience'}
          </button>
          {editingId && (
            <button 
              type="button" onClick={() => { setEditingId(null); setFormData({ company: '', role: '', duration: '', location: '', points: [''], order: experiences.length }); }}
              className="bg-gray-600 hover:bg-gray-500 px-8 py-2 rounded font-bold transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List Section */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold">{exp.role}</h4>
                <p className="text-[#1B9FE5]">{exp.company} · {exp.duration}</p>
                <p className="text-sm text-gray-400">{exp.location}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => moveExperience(index, 'up')} disabled={index === 0}
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded disabled:opacity-30"
                >
                  ↑
                </button>
                <button 
                  onClick={() => moveExperience(index, 'down')} disabled={index === experiences.length - 1}
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded disabled:opacity-30"
                >
                  ↓
                </button>
                <button 
                  onClick={() => startEdit(exp)}
                  className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteExperience(exp._id!)}
                  className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
              {exp.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminExperience;
