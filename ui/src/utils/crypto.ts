// utils/crypto.ts
import CryptoJS from 'crypto-js';

const decrypt = (encryptedText: string, secretKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export { decrypt };
