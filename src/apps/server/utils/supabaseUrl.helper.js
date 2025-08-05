const supabase = require('./supabaseClient');

const generateSignedUrl = async (file_path, expiresInSeconds = 3600) => {
  const bucketName = file_path.split('/')[0];
  const fileName = file_path.split('/').slice(1).join('/');

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .createSignedUrl(fileName, expiresInSeconds);

  if (error) {
    console.error('Signed URL Error:', error);
    return null;
  }

  return data.signedUrl;
};

module.exports = { generateSignedUrl };
