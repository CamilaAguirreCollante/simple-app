import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

export const encrypt = (data: string) => {
    return CryptoJS.AES.encrypt(data, environment.keyEncrypt).toString();
};

export const decrypt = <T>(valueEncrypt: string): T | null => {
    const valueDecrypt = CryptoJS.AES.decrypt(valueEncrypt, environment.keyEncrypt).toString(CryptoJS.enc.Utf8);
    if (!valueDecrypt) {
        return null;
    }
    return JSON.parse(valueDecrypt) as T;
}