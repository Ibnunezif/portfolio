import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Spinner from './Spinner';
import type { Testimonial } from '../types';

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Omit<Testimonial, '_id'>>({
    name: '',
    role: '',
    content: '',
    avatar: '',
    linkedInUrl: '',
    order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    setLoading(true);
    fetch('http://localhost:3002/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch('http://localhost:3002/api/upload', {
        method: 'POST',
        body: data,
        // In a real app, you'd add Authorization header here
      });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, avatar: result.url });
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:3002/api/testimonials/${editingId}` 
      : 'http://localhost:3002/api/testimonials';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      content: '',
      avatar: '',
      linkedInUrl: '',
      order: testimonials.length
    });
    fetchTestimonials();
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t._id || null);
    setFormData({
      name: t.name,
      role: t.role,
      content: t.content,
      avatar: t.avatar,
      linkedInUrl: t.linkedInUrl,
      order: t.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    await fetch(`http://localhost:3002/api/testimonials/${id}`, { method: 'DELETE' });
    fetchTestimonials();
  };

  const moveTestimonial = async (index: number, direction: 'up' | 'down') => {
    const newList = [...testimonials];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;

    const tempOrder = newList[index].order;
    newList[index].order = newList[newIndex].order;
    newList[newIndex].order = tempOrder;

    await Promise.all([
      fetch(`http://localhost:3002/api/testimonials/${newList[index]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList[index]),
      }),
      fetch(`http://localhost:3002/api/testimonials/${newList[newIndex]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList[newIndex]),
      })
    ]);

    fetchTestimonials();
  };

  if (loading && testimonials.length === 0) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Manage Testimonials</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-12 border border-gray-700 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-[#1B9FE5]">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input 
              name="name" value={formData.name} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role / Headline</label>
            <input 
              name="role" value={formData.role} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">LinkedIn Profile URL</label>
            <input 
              name="linkedInUrl" value={formData.linkedInUrl} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Avatar Image (URL or Upload)</label>
            <div className="flex gap-2">
              <input 
                name="avatar" value={formData.avatar} onChange={handleInputChange}
                className="flex-1 bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none"
                placeholder="Image URL"
              />
              <input 
                type="file" onChange={handleFileUpload}
                className="hidden" id="avatar-upload"
              />
              <label 
                htmlFor="avatar-upload"
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded cursor-pointer text-sm flex items-center"
              >
                {uploading ? '...' : 'Upload'}
              </label>
            </div>
            {formData.avatar && (
              <img src={formData.avatar} alt="Preview" className="mt-2 w-12 h-12 rounded-full object-cover border border-gray-600" />
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Testimonial Content</label>
          <textarea 
            name="content" value={formData.content} onChange={handleInputChange}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none h-32" required
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-[#1B9FE5] hover:bg-[#1B9FE5]/80 px-8 py-2 rounded font-bold transition-all">
            {editingId ? 'Update Testimonial' : 'Save Testimonial'}
          </button>
          {editingId && (
            <button 
              type="button" onClick={() => { setEditingId(null); setFormData({ name: '', role: '', content: '', avatar: '', linkedInUrl: '', order: testimonials.length }); }}
              className="bg-gray-600 hover:bg-gray-500 px-8 py-2 rounded font-bold transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, index) => (
          <div key={t._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#1B9FE5]/20" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => moveTestimonial(index, 'up')} disabled={index === 0} className="bg-gray-700 hover:bg-gray-600 p-1 rounded disabled:opacity-30 text-xs">↑</button>
                  <button onClick={() => moveTestimonial(index, 'down')} disabled={index === testimonials.length - 1} className="bg-gray-700 hover:bg-gray-600 p-1 rounded disabled:opacity-30 text-xs">↓</button>
                </div>
              </div>
              <p className="text-gray-300 text-sm italic mb-4">"{t.content}"</p>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
              <button 
                onClick={() => startEdit(t)}
                className="flex-1 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white py-2 rounded text-sm transition-all"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTestimonial(t._id!)}
                className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white py-2 rounded text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminTestimonials;
