const supabase = require('./supabaseClient');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FILE_TYPE_CONFIG = {
  resume: { bucket: 'resumes', maxSize: 5 * 1024 * 1024 }, 
  candidate_avatar: { bucket: 'candidate-avatars', maxSize: 2 * 1024 * 1024 }, 
  company_img: { bucket: 'company-imgs', maxSize: 2 * 1024 * 1024 }, 
  system_announcement: { bucket: 'system-announcements', maxSize: 5 * 1024 * 1024 }, 
};

const FILE_TYPE_ALLOWED_EXT = {
  resume: ['.pdf', '.doc', '.docx'],
  candidate_avatar: ['.jpg', '.jpeg', '.png'],
  company_img: ['.jpg', '.jpeg', '.png'],
  system_announcement: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
};

const isExtensionAllowed = (fileExt, fileType) => {
  const allowedExts = FILE_TYPE_ALLOWED_EXT[fileType];
  if (!allowedExts) return false; 

  return allowedExts.includes(fileExt.toLowerCase());
};

const mimeTypeFromExt = (ext) => {
  const mimeTypes = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  };
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
};

const isMimeTypeMatchingExt = (fileExt, mimeType) => {
  const expectedMime = mimeTypeFromExt(fileExt);
  return expectedMime === mimeType;
};

const uploadFile = async (fileBuffer, originalName, mimeType, fileType) => {
  const config = FILE_TYPE_CONFIG[fileType];
  if (!config) throw new Error(`Invalid file type category: ${fileType}`);
	
  const fileExt = path.extname(originalName);

  if (!isExtensionAllowed(fileExt, fileType)) {
    throw new Error(`File extension ${fileExt} is not allowed for ${fileType}`);
  }

  if (!isMimeTypeMatchingExt(fileExt, mimeType)) {
    throw new Error(`MIME type ${mimeType} does not match file extension ${fileExt}`);
  }

  if (fileBuffer.length > config.maxSize) {
    throw new Error(`File exceeds size limit of ${config.maxSize / (1024 * 1024)} MB`);
  }

  const fileName = `${uuidv4()}${fileExt}`;

  const { data, error } = await supabase.storage
    .from(config.bucket)
    .upload(fileName, fileBuffer, {
      contentType: mimeTypeFromExt(fileExt),
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from(config.bucket)
    .getPublicUrl(fileName);

  return {
    fileName,
    fileUrl: publicUrlData.publicUrl,
    bucket: config.bucket,
  };
};

module.exports = {
  uploadFile,
};
