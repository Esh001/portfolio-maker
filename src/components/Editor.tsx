import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { DynamicList } from './DynamicList';
import type { ResumeData, Experience, Education, SkillCategory } from '../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateProfile: (field: keyof ResumeData['profile'], value: string) => void;
  toggleVisibility: (section: keyof ResumeData['visibility']) => void;
}

// Tiny labeled input
const Field: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  multiline?: boolean;
}> = ({ label, value, onChange, type = 'text', multiline = false }) => (
  <div className="mb-2">
    <label className="block text-[10px] uppercase tracking-widest text-[#6B7280] font-medium mb-0.5">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-transparent border border-[#D1D5DB] focus:border-black outline-none text-[12px] py-1.5 px-2 font-mono transition-colors resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-[#D1D5DB] focus:border-black outline-none text-[12px] py-1 px-1 font-mono transition-colors"
      />
    )}
  </div>
);

export const Editor: React.FC<EditorProps> = ({
  resume,
  setResume,
  updateProfile,
  toggleVisibility,
}) => {
  // ─── Experience helpers ───
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      bullets: [''],
    };
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (
    id: string,
    field: keyof Omit<Experience, 'id' | 'bullets'>,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const updateExpBullets = (id: string, bullets: string[]) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, bullets } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // ─── Education helpers ───
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      year: '',
    };
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (
    id: string,
    field: keyof Omit<Education, 'id'>,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // ─── Skills helpers ───
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: Date.now().toString(),
      category: '',
      skills: [''],
    };
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newCat],
    }));
  };

  const updateSkillCategory = (id: string, category: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) =>
        cat.id === id ? { ...cat, category } : cat
      ),
    }));
  };

  const updateSkillItems = (id: string, skills: string[]) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) =>
        cat.id === id ? { ...cat, skills } : cat
      ),
    }));
  };

  const removeSkillCategory = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((cat) => cat.id !== id),
    }));
  };

  return (
    <div className="editor-pane h-screen overflow-y-auto p-4 bg-[#F3F4F6]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[13px] font-bold uppercase tracking-widest text-black">
          Resume Editor
        </h1>
      </div>

      {/* ─── PROFILE ─── */}
      <SectionWrapper
        title="Profile"
        isVisible={resume.visibility.profile}
        onToggleVisibility={() => toggleVisibility('profile')}
      >
        <div className="grid grid-cols-2 gap-x-3">
          <Field
            label="Full Name"
            value={resume.profile.name}
            onChange={(v) => updateProfile('name', v)}
          />
          <Field
            label="Title"
            value={resume.profile.title}
            onChange={(v) => updateProfile('title', v)}
          />
          <Field
            label="Email"
            value={resume.profile.email}
            onChange={(v) => updateProfile('email', v)}
            type="email"
          />
          <Field
            label="Phone"
            value={resume.profile.phone}
            onChange={(v) => updateProfile('phone', v)}
            type="tel"
          />
          <Field
            label="LinkedIn"
            value={resume.profile.linkedin}
            onChange={(v) => updateProfile('linkedin', v)}
          />
          <Field
            label="GitHub"
            value={resume.profile.github}
            onChange={(v) => updateProfile('github', v)}
          />
          <div className="col-span-2">
            <Field
              label="Portfolio"
              value={resume.profile.portfolio}
              onChange={(v) => updateProfile('portfolio', v)}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ─── SUMMARY ─── */}
      <SectionWrapper
        title="Summary"
        isVisible={resume.visibility.summary}
        onToggleVisibility={() => toggleVisibility('summary')}
      >
        <Field
          label="Professional Summary"
          value={resume.profile.summary}
          onChange={(v) => updateProfile('summary', v)}
          multiline
        />
      </SectionWrapper>

      {/* ─── EXPERIENCE ─── */}
      <SectionWrapper
        title="Experience"
        isVisible={resume.visibility.experience}
        onToggleVisibility={() => toggleVisibility('experience')}
      >
        {resume.experience.map((exp, idx) => (
          <div
            key={exp.id}
            className="mb-3 pb-3 border-b border-dashed border-[#D1D5DB] last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-medium">
                Position {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="p-0.5 hover:bg-[#FEE2E2] transition-colors"
              >
                <Trash2
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#EF4444]"
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-3">
              <Field
                label="Company"
                value={exp.company}
                onChange={(v) => updateExperience(exp.id, 'company', v)}
              />
              <Field
                label="Role"
                value={exp.role}
                onChange={(v) => updateExperience(exp.id, 'role', v)}
              />
              <Field
                label="Start Date"
                value={exp.startDate}
                onChange={(v) => updateExperience(exp.id, 'startDate', v)}
              />
              <Field
                label="End Date"
                value={exp.endDate}
                onChange={(v) => updateExperience(exp.id, 'endDate', v)}
              />
            </div>
            <div className="mt-1">
              <label className="block text-[10px] uppercase tracking-widest text-[#6B7280] font-medium mb-1">
                Key Achievements
              </label>
              <DynamicList
                items={exp.bullets}
                onChange={(bullets) => updateExpBullets(exp.id, bullets)}
                placeholder="Add achievement..."
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-black mt-2 transition-colors"
        >
          <Plus size={12} strokeWidth={1.5} />
          <span className="uppercase tracking-wider font-medium">
            Add Position
          </span>
        </button>
      </SectionWrapper>

      {/* ─── EDUCATION ─── */}
      <SectionWrapper
        title="Education"
        isVisible={resume.visibility.education}
        onToggleVisibility={() => toggleVisibility('education')}
      >
        {resume.education.map((edu, idx) => (
          <div
            key={edu.id}
            className="mb-3 pb-3 border-b border-dashed border-[#D1D5DB] last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-medium">
                Education {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="p-0.5 hover:bg-[#FEE2E2] transition-colors"
              >
                <Trash2
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#EF4444]"
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-3">
              <Field
                label="School"
                value={edu.school}
                onChange={(v) => updateEducation(edu.id, 'school', v)}
              />
              <Field
                label="Degree"
                value={edu.degree}
                onChange={(v) => updateEducation(edu.id, 'degree', v)}
              />
              <Field
                label="Year"
                value={edu.year}
                onChange={(v) => updateEducation(edu.id, 'year', v)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-black mt-2 transition-colors"
        >
          <Plus size={12} strokeWidth={1.5} />
          <span className="uppercase tracking-wider font-medium">
            Add Education
          </span>
        </button>
      </SectionWrapper>

      {/* ─── SKILLS ─── */}
      <SectionWrapper
        title="Skills"
        isVisible={resume.visibility.skills}
        onToggleVisibility={() => toggleVisibility('skills')}
      >
        {resume.skills.map((cat, idx) => (
          <div
            key={cat.id}
            className="mb-3 pb-3 border-b border-dashed border-[#D1D5DB] last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-medium">
                Category {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeSkillCategory(cat.id)}
                className="p-0.5 hover:bg-[#FEE2E2] transition-colors"
              >
                <Trash2
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#EF4444]"
                />
              </button>
            </div>
            <Field
              label="Category Name"
              value={cat.category}
              onChange={(v) => updateSkillCategory(cat.id, v)}
            />
            <div className="mt-1">
              <label className="block text-[10px] uppercase tracking-widest text-[#6B7280] font-medium mb-1">
                Skills
              </label>
              <DynamicList
                items={cat.skills}
                onChange={(skills) => updateSkillItems(cat.id, skills)}
                placeholder="Add skill..."
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSkillCategory}
          className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-black mt-2 transition-colors"
        >
          <Plus size={12} strokeWidth={1.5} />
          <span className="uppercase tracking-wider font-medium">
            Add Category
          </span>
        </button>
      </SectionWrapper>
    </div>
  );
};
