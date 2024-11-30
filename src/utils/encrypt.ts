import crypto from 'crypto';

/**
 * Encypt ID by HMAC SHA256 algorithm
 * @param {string} id
 * @param {string} secretKey
 * @returns {string}
 */
function encryptId(id: string, secretKey: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(id);
  const encodedId = hmac.digest('hex');
  return encodedId;
}

export default encryptId;
