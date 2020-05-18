/* eslint-disable operator-linebreak */
const { hash, genSalt, compareSync } = require('bcrypt');

/** Class representing a password util. */
class Password {
  /**
   * Generates a new password.
   * @param {object} data - User details.
   * @returns {object} A new password.
   */
  constructor(data) {
    this.password = data.password;
  }

  /**
   * Encrypts the password.
   * @returns {string} newPassword.
   */
  async encryptPassword() {
    const salt = await (0, genSalt)(10);
    const newPassword = await hash(this.password, salt);
    return newPassword;
  }

  /**
   * Checks if the password matches.
   * @param {string} password - password.
   * @param {string} hashedPassword - hashedPassword.
   * @returns {function} newPassword.
   */
  static async checkPasswordMatch(password, hashedPassword) {
    return compareSync(password, hashedPassword);
  }

  /**
   * Random password generator.
   * @returns {function} newPassword.
   */
  static randomPassword() {
    const special = '!@#$%^&*()_+=<>';
    const rnum = Math.floor(Math.random() * special.length);
    const alphaNumeric =
      Math.random()
        .toString(36)
        .substring(2, 8) +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
    const password = alphaNumeric.replace(alphaNumeric[rnum], special[rnum]);
    return password;
  }
}

module.exports = Password;
