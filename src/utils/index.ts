import queryString from 'query-string';
import CryptoJS from 'crypto-js';
/**
 * 获取URL参数
 */
export function parseQuery() {
  return queryString.parseUrl(window.location.href).query;
}

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF'); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为密钥偏移量
export class Encrypt {
  //加密
  static encrypt(value: string): string {
    let srcs = CryptoJS.enc.Utf8.parse(value);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString().toUpperCase();
  }
  //解密
  static decode(value: string): string {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(value);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
  static encryptBase64(value: string): string {
    return window.btoa(value);
  }
  //var str = btoa(encodeURIComponent("中文汉字"));
  //还可以解码回来
  //decodeURIComponent(atob(enc)) =>  中文汉字
  static decodeBase64(value: string): string {
    return window.atob(value);
  }
}
