import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Spinner from './Spinner';
import type { Project } from '../types';
import API_BASE_URL from '../config';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Omit<Project, '_id'>>({
    title: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    category: 'Web'
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !editingId) {
          setFormData(prev => ({ ...prev, category: data[0].name }));
        }
      });
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategoryName.trim() })
    });
    if (res.ok) {
      setNewCategoryName('');
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    if (!window.confirm('Delete this category? Projects using it will still show it, but you won\'t be able to select it for new projects.')) return;
    await fetch(`${API_BASE_URL}/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData({
          ...formData,
          technologies: [...formData.technologies, techInput.trim()]
        });
      }
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, imageUrl: result.url });
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
      ? `${API_BASE_URL}/projects/${editingId}` 
      : `${API_BASE_URL}/projects`;
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
      category: 'Web'
    });
    fetchProjects();
  };

  const startEdit = (project: Project) => {
    setEditingId(project._id || null);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      category: project.category
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  if (loading && projects.length === 0) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-12 border border-gray-700 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-[#1B9FE5]">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input 
              name="title" value={formData.title} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none" required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select 
              name="category" value={formData.category} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none"
            >
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
              {categories.length === 0 && <option value="Web">Web (Default)</option>}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
            <input 
              name="githubUrl" value={formData.githubUrl} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Live Demo URL</label>
            <input 
              name="liveUrl" value={formData.liveUrl} onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Technologies (Press Enter to add)</label>
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-900 rounded border border-gray-600 min-h-[42px]">
              {formData.technologies.map(tech => (
                <span key={tech} className="bg-[#1B9FE5] text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-300 font-bold">×</button>
                </span>
              ))}
              <input 
                value={techInput} 
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechAdd}
                className="bg-transparent outline-none text-sm flex-1 min-w-[100px]"
                placeholder="Type tech and press Enter..."
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Project Image</label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input 
                  name="imageUrl" value={formData.imageUrl} onChange={handleInputChange}
                  className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none mb-2"
                  placeholder="Image URL"
                />
                <input 
                  type="file" onChange={handleFileUpload}
                  className="hidden" id="project-image-upload"
                />
                <label 
                  htmlFor="project-image-upload"
                  className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded cursor-pointer text-sm inline-block"
                >
                  {uploading ? 'Uploading...' : 'Upload from Local'}
                </label>
              </div>
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="w-32 h-20 object-cover rounded border border-gray-600" />
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea 
            name="description" value={formData.description} onChange={handleInputChange}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none h-24" required
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-[#1B9FE5] hover:bg-[#1B9FE5]/80 px-8 py-2 rounded font-bold transition-all">
            {editingId ? 'Update Project' : 'Save Project'}
          </button>
          {editingId && (
            <button 
              type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', technologies: [], githubUrl: '', liveUrl: '', imageUrl: '', category: 'Web' }); }}
              className="bg-gray-600 hover:bg-gray-500 px-8 py-2 rounded font-bold transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Category Management Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-12 border border-gray-700 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-[#1B9FE5]">Manage Categories</h3>
        <div className="flex gap-4 mb-6">
          <input 
            value={newCategoryName} 
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 bg-gray-700 p-2 rounded border border-gray-600 focus:border-[#1B9FE5] outline-none"
            placeholder="New Category Name (e.g., Mobile, Cloud)"
          />
          <button 
            onClick={addCategory}
            className="bg-[#1B9FE5] hover:bg-[#1B9FE5]/80 px-6 py-2 rounded font-bold transition-all"
          >
            Add Category
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <div key={cat._id} className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 flex items-center gap-3">
              <span className="font-medium">{cat.name}</span>
              <button 
                onClick={() => deleteCategory(cat._id)}
                className="text-red-400 hover:text-red-300 font-bold"
              >
                ×
              </button>
            </div>
          ))}
          {categories.length === 0 && <p className="text-gray-500 text-sm italic">No custom categories yet. Using default 'Web'.</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 flex flex-col">
            <div className="h-40 bg-gray-900 flex items-center justify-center">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-xs">No Image</span>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{project.title}</h4>
                <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded text-gray-400 uppercase">{project.category}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map(t => (
                  <span key={t} className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => startEdit(project)}
                  className="flex-1 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white py-1.5 rounded text-sm transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProject(project._id!)}
                  className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white py-1.5 rounded text-sm transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminProjects;
