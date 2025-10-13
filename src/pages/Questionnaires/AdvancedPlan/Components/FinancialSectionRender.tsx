
import React, { useState } from 'react';
import QuestionRenderer from './QuestionRenderer';
import { advancedSections, initialAdvancedFormData } from '../data/AdvanceFormData';

const FinancialSectionRenderer = () => {
  const [formData, setFormData] = useState(initialAdvancedFormData);
  const [currentSection, setCurrentSection] = useState('section_9');
  const [showErrors, setShowErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Find the current section
  const section = advancedSections.find(s => s.section_id === currentSection);

  // Handle input changes
  const handleInputChange = (path: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div className="financial-section">
      <h2>{section.section_name}</h2>
      <p>{section.section_description}</p>
      
      {/* Render all questions in this section */}
      {section.questions.map(question => (
        <QuestionRenderer
          key={question.id}
          question={question}
          formData={formData}
          handleInputChange={handleInputChange}
          showErrors={showErrors}
          validationErrors={validationErrors}
        />
      ))}
      
      {/* Render question groups if they exist */}
      {section.questionGroups?.map(group => (
        <div key={group.groupName} className="question-group">
          <h3>{group.groupName}</h3>
          {group.questions.map(question => (
            <QuestionRenderer
              key={question.id}
              question={question}
              formData={formData}
              handleInputChange={handleInputChange}
              showErrors={showErrors}
              validationErrors={validationErrors}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FinancialSectionRenderer;