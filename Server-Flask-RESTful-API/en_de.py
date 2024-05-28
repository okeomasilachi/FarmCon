import re
import os
import base64


class CustomEncoder:
    """
    A class that provides encoding and decoding functionality using a custom algorithm.
    """

    def __init__(self, secret_key=None):
        """
        Initializes the CustomEncoder object.
        """
        sec_key = os.environ.get("SECRET_KEY", None)
        if not sec_key:
            sec_key = secret_key
        self.__key = re.sub(r'\d', '', sec_key if sec_key else os.environ.get("PATH"))

    def encode(self, str):
        """
        Encodes the given string using the custom algorithm.

        Args:
            str (str): The string to be encoded.

        Returns:
            str: The encoded string.
        """
        encoded_str = ""
        key_index = 0
        for char in str:
            char_code = ord(char)
            key_char_code = ord(self.__key[key_index])
            key_index = (key_index + 1) % len(self.__key)
            char_code = (char_code + key_char_code) % 256
            if key_index % 2 == 0:
                char_code = (char_code + 13) % 256
            else:
                char_code = (char_code - 13 + 256) % 256
            encoded_str += chr(char_code)
        return base64.b64encode(encoded_str.encode('utf-8')).decode('utf-8')

    def decode(self, encoded_str):
        """
        Decodes the given encoded string using the custom algorithm.

        Args:
            encoded_str (str): The encoded string to be decoded.

        Returns:
            str: The decoded string.
        """
        decoded_str = ""
        key_index = 0

        encoded_str = base64.b64decode(encoded_str).decode(
            'utf-8')
        for char in encoded_str:
            char_code = ord(char)
            key_char_code = ord(self.__key[key_index])
            key_index = (key_index + 1) % len(self.__key)
            if key_index % 2 == 0:
                char_code = (char_code - 13 + 256) % 256
            else:
                char_code = (char_code + 13) % 256
            char_code = (char_code - key_char_code + 256) % 256
            decoded_str += chr(char_code)
        return decoded_str
