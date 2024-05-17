class CustomEncoder {
  constructor(secretKey) {
    const key = process.env.SECRET_KEY || secretKey && secretKey || process.env.PATH;
    this.key = key.replace(/[0-9]/g, '');
  }

  encode(str) {
    let encodedStr = "";
    let keyIndex = 0;
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      let keyCharCode = this.key.charCodeAt(keyIndex);
      keyIndex = (keyIndex + 1) % this.key.length;

      // Substitution
      charCode = (charCode + keyCharCode) % 256;

      // Transposition
      if (i % 2 === 0) {
        charCode = (charCode + 13) % 256;
      } else {
        charCode = (charCode - 13 + 256) % 256;
      }

      encodedStr += String.fromCharCode(charCode);
    }
    return btoa(encodedStr);
  }

  decode(string) {
    let decodedStr = "";
    let keyIndex = 0;
    const str = atob(string);
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      let keyCharCode = this.key.charCodeAt(keyIndex);
      keyIndex = (keyIndex + 1) % this.key.length;

      // Inverse transposition
      if (i % 2 === 0) {
        charCode = (charCode - 13 + 256) % 256;
      } else {
        charCode = (charCode + 13) % 256;
      }

      // Inverse substitution
      charCode = (charCode - keyCharCode + 256) % 256;

      decodedStr += String.fromCharCode(charCode);
    }
    return decodedStr;
  }
}


export default encoder = new CustomEncoder();
