'use server'
import CryptoJS from 'crypto-js';

const decrypt = async (encryptedText: string): Promise<string> => {
  console.log('private key server side', process.env.PRIVATE_KEY);
  const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.PRIVATE_KEY as string);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export { decrypt };
