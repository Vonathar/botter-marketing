/**
 * @summary Provides input validation for text fields.
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

/**
 * @summary Validates the projectName.
 * @desc Tests the given input against a regular expression to ensure it's valid.
 * @return {boolean} whether the input is valid.
 */
let validateProjectName = (input) => {
  /**
   * This regular expression matches a string using the following criteria:
   *
   * 1. it must start with 'pm'
   * 2. it may have a partner identifier, such as 'sa' or 'le'
   * 3. it must have a 3-digit major version
   * 4. it must have a hyphen
   * 5. it must have a 3-digit minor version
   * */
  const regex = /pm([a-z]{2})?\d{3}-\d{3}/gmi;
  return regex.test(input);
};

module.exports = {validateProjectName};