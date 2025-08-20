import React from 'react';



export const renderTextWithLineBreaks = (
  text: string | null | undefined, 
  fallback: string = "No information available"
): React.ReactNode => {
  if (!text || text.trim() === "") return fallback;
  
  const processedText =text;
  
  return processedText.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < processedText.split('\n').length - 1 && <br />}
    </span>
  ));
};


export const truncateText = (
  text: string | null | undefined, 
  maxLength: number, 
  suffix: string = "..."
): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};


export const capitalizeWords = (text: string | null | undefined): string => {
  if (!text) return "";
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};


export const formatTextForDisplay = (text: string | null | undefined): string => {
  if (!text) return "";
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Replace multiple line breaks with single line break
    .trim();
};


export const countWords = (text: string | null | undefined): number => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};


export const findKeywords = (
  text: string | null | undefined, 
  keywords: string[], 
  caseSensitive: boolean = false
): string[] => {
  if (!text) return [];
  
  const searchText = caseSensitive ? text : text.toLowerCase();
  const searchKeywords = caseSensitive ? keywords : keywords.map(k => k.toLowerCase());
  
  return searchKeywords.filter(keyword => searchText.includes(keyword));
};
