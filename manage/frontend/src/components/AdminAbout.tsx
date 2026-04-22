import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import Spinner from './Spinner';

interface Paragraph {
  text: string;
  boldSegments: { start: number; end: number }[];
}

const AdminAbout: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
  const [loading, setLoading] = useState(true);
  const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/about')
      .then((res) => res.json())
      .then((data) => {
        setParagraphs(data.paragraphs || []);
        setLoading(false);
      });
  }, []);

  const updateParagraph = (index: number, text: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index].text = text;
    setParagraphs(newParagraphs);
  };

  const toggleBold = (index: number) => {
    const textarea = textAreaRefs.current[index];
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) return;

    const newParagraphs = [...paragraphs];
    const para = newParagraphs[index];
    
    // Check if segment already exists
    const existingIndex = para.boldSegments.findIndex(s => s.start === start && s.end === end);
    
    if (existingIndex > -1) {
      para.boldSegments.splice(existingIndex, 1);
    } else {
      para.boldSegments.push({ start, end });
    }
    
    setParagraphs(newParagraphs);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, { text: '', boldSegments: [] }]);
  };

  const removeParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  const moveParagraph = (index: number, direction: 'up' | 'down') => {
    const newParagraphs = [...paragraphs];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= paragraphs.length) return;
    [newParagraphs[index], newParagraphs[newIndex]] = [newParagraphs[newIndex], newParagraphs[index]];
    setParagraphs(newParagraphs);
  };

  const renderPreview = (para: Paragraph) => {
    if (!para.boldSegments || para.boldSegments.length === 0) return para.text;
    let lastIndex = 0;
    const parts = [];
    const sortedSegments = [...para.boldSegments].sort((a, b) => a.start - b.start);
    sortedSegments.forEach((seg, index) => {
      parts.push(para.text.substring(lastIndex, seg.start));
      parts.push(<span key={index} className="font-bold text-[#1B9FE5]">{para.text.substring(seg.start, seg.end)}</span>);
      lastIndex = seg.end;
    });
    parts.push(para.text.substring(lastIndex));
    return parts;
  };

  const saveAbout = async () => {
    await fetch('http://localhost:3002/api/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paragraphs }),
    });
    alert('About content updated!');
  };

  if (loading) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Manage About Section</h2>
      {paragraphs.map((para, pIndex) => (
        <div key={pIndex} className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-400">Paragraph {pIndex + 1}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => moveParagraph(pIndex, 'up')}
                disabled={pIndex === 0}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs disabled:opacity-50"
              >
                ↑
              </button>
              <button 
                onClick={() => moveParagraph(pIndex, 'down')}
                disabled={pIndex === paragraphs.length - 1}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs disabled:opacity-50"
              >
                ↓
              </button>
            </div>
          </div>
          <textarea
            ref={el => textAreaRefs.current[pIndex] = el}
            value={para.text}
            onChange={(e) => updateParagraph(pIndex, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white h-24 mb-2"
            placeholder="Paragraph text"
          />
          <div className="mb-4 p-3 bg-gray-900 rounded border border-gray-700">
             <span className="text-xs text-gray-500 block mb-1">Preview:</span>
             <p className="text-gray-300 text-sm leading-relaxed">{renderPreview(para)}</p>
          </div>
          <button 
            onClick={() => toggleBold(pIndex)} 
            className="bg-[#1B9FE5] hover:bg-[#1B9FE5]/80 px-4 py-1.5 rounded text-sm font-bold mr-2 text-white"
          >
            B
          </button>
          <button onClick={() => removeParagraph(pIndex)} className="text-sm bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded transition-all">Remove</button>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addParagraph} className="bg-gray-600 px-6 py-2 rounded">Add Paragraph</button>
        <button onClick={saveAbout} className="bg-[#1B9FE5] px-6 py-2 rounded">Save All Changes</button>
      </div>
    </Layout>
  );
};

export default AdminAbout;
