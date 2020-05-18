/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
const jwt = require('jsonwebtoken');
const redis = require('redis');
const { promisify } = require('util');
const Response = require('./response');

const redisClient =
  process.env.NODE === 'production'
    ? redis.createClient(process.env.REDIS_URL)
    : redis.createClient();

const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

redisClient
  .on('connect', () => console.log('redis connected'))
  .on('error', (error) => console.log(error));

/** Class managing user sessions */
class SessionManager {
  /**
   * Generates a jwt token.
   * @param {object} data - User details.
   * @returns {string} token.
   */
  static generateToken(data) {
    const token = jwt.sign(
      {
        id: data._id,
        username: data.username,
        userRole: data.userRole
      },
      data.secret || process.env.TOKEN_SECRET,
      { expiresIn: '24hr' }
    );
    return token;
  }

  /**
   * Creates a redis session
   * @param {object} data - User details.
   * @param {object} res - response object.
   * @returns {string} token.
   */
  static async createSession(data, res) {
    const result = await this.checkToken(data.username);

    const token =
      result === 'null'
        ? Response.conflictError(res, "token doesn't exist")
        : this.generateToken(data);

    const { username } = data;

    redisClient.set(username, token);
    return token;
  }

  /**
   * Checks if token is in use
   * @param {string} userEmail - User email.
   * @returns {string} result.
   */
  static async checkToken(username) {
    const result = await getAsync(username);
    return result;
  }

  /**
   * Decodes a token
   * @param {object} data - User details.
   * @returns {object} User object
   */
  static decodeToken(data) {
    try {
      return jwt.verify(data.token, data.secret || process.env.TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Destroys a token.
   * @param {object} data - User details
   * @returns {number} result - 0 || 1
   */
  static async destroyToken(data) {
    const result = delAsync(data.username);
    return result; // result is either 0 or 1 (deleted)
  }

  /**
   * Verifies a token
   * @param {string} token
   * @returns {object} User object
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SessionManager;
