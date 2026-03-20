import React from 'react';
import type { ResumeData } from '../types/resume';
import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

interface PreviewProps {
  resume: ResumeData;
}

export const Preview: React.FC<PreviewProps> = ({ resume }) => {
  const { profile, experience, education, skills, visibility } = resume;

  return (
    <div className="preview-pane h-screen overflow-y-auto bg-[#E5E7EB] p-6 flex justify-center">
      <div className="a4-sheet w-[210mm] min-h-[297mm] max-h-[297mm] bg-white border border-[#D1D5DB] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="h-full flex" style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* ────── LEFT COLUMN (30%) ────── */}
          <div className="w-[30%] bg-[#111111] text-white p-5 flex flex-col shrink-0">
            {/* Name & Title */}
            {visibility.profile && (
              <div className="mb-5">
                <h1 className="text-[18px] font-bold tracking-tighter leading-tight uppercase">
                  {profile.name || 'Your Name'}
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] mt-1 font-medium">
                  {profile.title || 'Your Title'}
                </p>
              </div>
            )}

            {/* Contact */}
            {visibility.profile && (
              <div className="mb-5">
                <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-2 border-b border-[#374151] pb-1">
                  Contact
                </h2>
                <div className="space-y-1.5">
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={10} strokeWidth={1.5} className="text-[#9CA3AF] shrink-0" />
                      <span className="text-[9px] leading-tight break-all">{profile.email}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={10} strokeWidth={1.5} className="text-[#9CA3AF] shrink-0" />
                      <span className="text-[9px] leading-tight">{profile.phone}</span>
                    </div>
                  )}
                  {profile.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin size={10} strokeWidth={1.5} className="text-[#9CA3AF] shrink-0" />
                      <span className="text-[9px] leading-tight break-all">{profile.linkedin}</span>
                    </div>
                  )}
                  {profile.github && (
                    <div className="flex items-center gap-2">
                      <Github size={10} strokeWidth={1.5} className="text-[#9CA3AF] shrink-0" />
                      <span className="text-[9px] leading-tight break-all">{profile.github}</span>
                    </div>
                  )}
                  {profile.portfolio && (
                    <div className="flex items-center gap-2">
                      <Globe size={10} strokeWidth={1.5} className="text-[#9CA3AF] shrink-0" />
                      <span className="text-[9px] leading-tight break-all">{profile.portfolio}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {visibility.skills && skills.length > 0 && (
              <div className="mb-5">
                <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-2 border-b border-[#374151] pb-1">
                  Skills
                </h2>
                {skills.map((cat) => (
                  <div key={cat.id} className="mb-2">
                    {cat.category && (
                      <h3 className="text-[8px] uppercase tracking-[0.2em] text-[#D1D5DB] font-semibold mb-1">
                        {cat.category}
                      </h3>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {cat.skills
                        .filter((s) => s.trim())
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="text-[8px] bg-[#1F2937] text-[#E5E7EB] px-1.5 py-0.5 border border-[#374151]"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {visibility.education && education.length > 0 && (
              <div className="mb-5">
                <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-2 border-b border-[#374151] pb-1">
                  Education
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-[9px] font-semibold leading-tight">
                      {edu.degree || 'Degree'}
                    </p>
                    <p className="text-[8px] text-[#9CA3AF] leading-tight">
                      {edu.school || 'School'}
                    </p>
                    {edu.year && (
                      <p className="text-[8px] text-[#6B7280] mt-0.5">{edu.year}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ────── DIVIDER ────── */}
          <div className="w-px bg-[#D1D5DB] shrink-0" />

          {/* ────── RIGHT COLUMN (70%) ────── */}
          <div className="flex-1 p-5 overflow-hidden">
            {/* Summary */}
            {visibility.summary && profile.summary && (
              <div className="mb-4">
                <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B7280] mb-1.5 border-b border-black pb-1">
                  Profile
                </h2>
                <p className="text-[9px] leading-relaxed text-[#374151]">
                  {profile.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {visibility.experience && experience.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B7280] mb-1.5 border-b border-black pb-1">
                  Experience
                </h2>
                {experience.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className={`${idx < experience.length - 1 ? 'mb-3' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[10px] font-bold tracking-tight leading-tight">
                          {exp.role || 'Role'}
                        </h3>
                        <p className="text-[9px] text-[#6B7280] font-medium">
                          {exp.company || 'Company'}
                        </p>
                      </div>
                      <span className="text-[8px] text-[#9CA3AF] whitespace-nowrap font-mono shrink-0 mt-0.5">
                        {exp.startDate}
                        {exp.startDate && exp.endDate && ' — '}
                        {exp.endDate}
                      </span>
                    </div>
                    {exp.bullets.filter((b) => b.trim()).length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.bullets
                          .filter((b) => b.trim())
                          .map((bullet, i) => (
                            <li
                              key={i}
                              className="text-[8.5px] text-[#374151] leading-relaxed pl-2 relative before:content-['—'] before:absolute before:left-0 before:text-[#9CA3AF]"
                            >
                              <span className="ml-1">{bullet}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
