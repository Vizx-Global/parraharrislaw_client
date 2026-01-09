import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ValidationSummary = ({ showErrors, validationErrors }) => {
  if (!showErrors || Object.keys(validationErrors).length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
    >
      <div className="flex items-center gap-2 text-red-700 mb-2">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-semibold">Please complete all required fields</span>
      </div>
      <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
        {Object.entries(validationErrors).map(([fieldId, error]) => (
          <li key={fieldId}>{error}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ValidationSummary;