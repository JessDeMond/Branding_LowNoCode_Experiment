import React from 'react';
import { DecryptText } from './DecryptText';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12 group">
      <h2 className="text-3xl md:text-4xl font-bold text-onyx mb-4 tracking-tight">
        <DecryptText text={title} />
      </h2>
      <div className="h-[2px] w-24 bg-gradient-to-r from-teal to-transparent mb-4 transition-all duration-500 group-hover:w-48" />
      {subtitle && (
        <p className="text-slate font-light text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};