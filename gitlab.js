/**
 * @summary Provides functions to access the Gitlab API
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
const https = require("https");
const querystring = require("querystring");
const fs = require("fs").promises;

/**
 *  @param endpoint - a string of the desired endpoint; must include the slash as a first char
 *  @param extraParams - an object including all the parameters to be sent along with the request
 *  @return Promise - resolved at the end of the response with data from the response, or rejected on error
 *          Returned object keys:
 *              1. data       -> parsed JSON response
 *              2. page       -> the current page for results with multiple pages
 *              3. totalPages -> the number of pages for results with multiple pages
 *  @desc Initiate an asynchronous GET request to the Gitlab API at the given endpoint, returning a promise.
 */
let get = async (endpoint, extraParams) => {

    return new Promise((resolve, reject) => {

        // Build the URL
        const params = querystring.stringify({
            access_token: process.env.GITLAB_TOKEN, per_page: 100, membership: true, simple: true, ...extraParams
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

/**
 *  @param endpoint - a string of the desired endpoint; must include the slash as a first char
 *  @param outputFile - the file path where the output should be written to; must include file extension
 *  @param extraParams - an object including all the parameters to be sent along with the request
 *  @return Promise - resolved after the JSON data is written to a file successfully
 *  @desc Repeatedly calls the get function until all available pages have been requested and stored locally.
 */
let getAllPages = async (endpoint, outputFile, extraParams) => {

    let data = [];
    let currentPage = 1;
    let totalPages = 1;

    // Gets data from all pages
    do {
        const response = await get(endpoint, {page: currentPage, ...extraParams});
        data = data.concat(response.data);
        currentPage++;
        totalPages = response.totalPages;
    } while (currentPage <= totalPages);

    // Stores the JSON data into a local file
    await fs.writeFile(outputFile, JSON.stringify(data), err => {
        if (err) {
            throw err;
        }
    });
};

/**
 *  @param projectName - a lowercase string representing the name of the requested project
 *  @param shouldProjectsUpdate - flag, tells whether the local projects should be updated before throwing an error
 *  @return Object - a parsed JSON object that represents the project as per the Gitlab API
 *  @throws ProjectNotFoundError - thrown when the project passed as an argument cannot be found
 *  @desc Looks for the project in the locally stored list first for a faster retrieval. If the project cannot be
 *        found, the local list is updated by querying the API again. The function recursively calls itself  once to
 *        look for the project in the updated database, then throws a ProjectNotFoundError if it fails.
 */
let getProjectByName = async (projectName, shouldProjectsUpdate = true) => {

    // Looks for the project locally
    try {
        let projectList = JSON.parse(await fs.readFile("projects.json"));

        for (let project in projectList) {
            if (projectList[project].name.toLowerCase() === projectName) {
                return projectList[project];
            }
        }
        // Updates the local project list, then calls itself one last time
    } catch (e) {
        if (shouldProjectsUpdate) {
            await getAllPages("/projects", "projects.json");
            await getProjectByName(projectName, false);
        } else {
            throw new ProjectNotFoundError("Project not found: " + projectName);
        }
    }
};

module.exports = {
    getProjectByName: getProjectByName
};