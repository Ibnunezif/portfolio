import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

interface Paragraph {
  text: string;
  boldSegments: { start: number; end: number }[];
}

const About: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.paragraphs) {
          setParagraphs(data.paragraphs);
        }
      })
      .catch((err) => console.error('Failed to fetch About content', err));
  }, []);

  const renderTextWithBold = (para: Paragraph) => {
    if (!para.boldSegments || para.boldSegments.length === 0) return para.text;

    let lastIndex = 0;
    const parts = [];
    
    // Sort segments by start position
    const sortedSegments = [...para.boldSegments].sort((a, b) => a.start - b.start);

    sortedSegments.forEach((seg, index) => {
      // Before segment
      parts.push(para.text.substring(lastIndex, seg.start));
      // Segment (bold)
      parts.push(<span key={index} className="font-bold text-[#1B9FE5]">{para.text.substring(seg.start, seg.end)}</span>);
      lastIndex = seg.end;
    });

    // Remainder
    parts.push(para.text.substring(lastIndex));
    return parts;
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#1B9FE5] shadow-sm border border-[#1B9FE5]/20">
              About Me
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
                Who I am
              </span>
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
          {paragraphs.map((para, index) => (
            <p key={index}>{renderTextWithBold(para)}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
