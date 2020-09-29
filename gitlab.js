/**
 * @summary Provides functions to access the Gitlab API
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
const https = require("https");
const querystring = require("querystring");

/**
 *  @param endpoint - a string of the desired endpoint; must include the slash as a first char
 *  @param extraParams - an object including all the parameters to be sent along with the request
 *  @return Promise - resolved at the end of the response with data from the response, or rejected on error
 *          Returned object keys:
 *              1. data       -> parsed JSON response
 *              2. page       -> the current page for results with multiple pages
 *              3. totalPages -> the number of pages for results with multiple pages
 *  @desc initiate an asynchronous GET request to the Gitlab API at the given endpoint, returning a promise.
 */
let get = async (endpoint, extraParams) => {

    return new Promise((resolve, reject) => {

        // Build the URL
        const params = querystring.stringify({
            access_token: process.env.GITLAB_TOKEN, per_page: 100, membership: true, ...extraParams
        });
        let url = "https://git.twogether.io/api/v4" + endpoint + "?" + params;

        // Initiate request
        https.get(url, (res) => {
            let data = "";

            // Process each buffer
            res.on("data", (chunk) => {
                data += chunk;
            });

            // End response
            res.on("end", () => {
                resolve({
                    data: JSON.parse(data), page: res.headers["x-page"], totalPages: res.headers["x-total-pages"]
                });
            });

            // Handle errors
        }).on("error", (err) => {
            reject(err);
        });
    });
};