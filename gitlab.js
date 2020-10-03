/**
 * @summary Provides functions to access the Gitlab API
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
const https = require("https");
const querystring = require("querystring");
const fs = require("fs").promises;
const {existsSync} = require("fs");

/**
 *  @param outputFile - the file path where the output should be written to; must include file extension.
 *  @param data - the raw JSON data to be written to the output file
 *  @return Promise - resolved after the JSON has been written in the outputFile
 *  @desc Asynchronously writes the given JSON to the specified file path
 */
let writeLocalJSON = async (outputFile, data) => {
    try {
        await fs.writeFile(outputFile, JSON.stringify(data));
    } catch (e) {
        if (e) {
            throw e;
        }
    }
};

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
let getPage = async (endpoint, extraParams) => {

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

/**
 *  @param endpoint - a string of the desired endpoint; must include the slash as a first char
 *  @param outputFile - the file path where the output should be written to; must include file extension.
 *                      if null, the function returns the JSON response without writing it to a file
 *  @param extraParams - an object including all the parameters to be sent along with the request
 *  @return Promise - if outputFile is a file path. Resolved after the JSON data is written to a file successfully
 *  @return JSON data - if outputFile  is null
 *  @desc Repeatedly calls the get function until all available pages have been requested. If a file path for the
 *        output file is specified, the JSON data is written there; otherwise, the JSON data is returned.
 */
let getAllPages = async (endpoint, outputFile = null, extraParams) => {

    let data = [];
    let currentPage = 1;
    let totalPages = 1;

    // Gets data from all pages
    do {
        const response = await getPage(endpoint, {page: currentPage, ...extraParams});
        data = data.concat(response.data);
        currentPage++;
        totalPages = response.totalPages;
    } while (currentPage <= totalPages);

    // Writes or returns the JSON data
    if (outputFile) {
        await writeLocalJSON(outputFile, data);
    } else {
        return data;
    }
};

/**
 *  @param projectName - a lowercase string representing the name of the requested project
 *  @param shouldProjectsUpdate - flag, true if the project list should be updated before iterating through it
 *  @return Object - a parsed JSON object that represents the project as per the Gitlab API
 *  @throws ProjectNotFoundError - thrown when the project passed as an argument cannot be found
 *  @desc Looks for the project in the locally stored list first for a faster retrieval. If the project cannot be
 *        found, the local list is updated by querying the API again. The function recursively calls itself  once to
 *        look for the project in the updated database, then throws a ProjectNotFoundError if it fails.
 */
let getProjectByName = async (projectName, shouldProjectsUpdate = false) => {

    // Looks for the project locally
    if (existsSync("projects.json") || shouldProjectsUpdate) {

        let projectList = JSON.parse(await fs.readFile("projects.json"));
        let project;

        for (let index in projectList) {
            if (projectList[index].name.toLowerCase() === projectName) {
                project = projectList[index];
            }
        }

        if (project) {
            return project;
        } else {
            throw new ProjectNotFoundError("Project not found: " + projectName);
        }

        // Updates the local project list, then calls itself one last time
    } else {
        await getAllPages("/projects", "projects.json");
        await getProjectByName(projectName, false);
    }

};

/**
 *  @param projectName - a lowercase string representing the name of the requested project
 *  @return Object - a parsed JSON object that represents the issues as per the Gitlab API
 *  @desc Queries the Gitlab API for all issues in the repository if the given project.
 */
let getIssuesByProject = async (projectName) => {
    let project = await getProjectByName(projectName);
    return await getAllPages(`/projects/${project.id}/issues`);
};

/**
 *  @return Object - a validated campaignInfo object which holds all the relevant campaign URLs
 *  @throws CampaignInfoParseError - thrown by inner functions if the campaignInfo object failed to build
 *  @desc Checks if the required campaign information is present before returning the campaignInfo object.
 */
let getCampaignInfo = async (projectName) => {

    /**
     *  @return Array - an array with all URLs found in the 'campaign info' ticket
     *  @throws CampaignInfoParseError - thrown if the campaign info ticket cannot be found in any of the issues
     *  @desc Finds the issue which holds campaign information, then returns all URLs found in its description.
     */
    let getAllUrls = async () => {

        const issues = await getIssuesByProject(projectName);

        for (let issue in issues) {
            if (issues[issue].title.toLowerCase().includes("campaign info")) {
                const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gm;
                return issues[issue].description.match(urlRegex);
            }
        }

        throw new CampaignInfoParseError("Failed to find 'Campaign Info' issue for project: " + projectName);
    };

    /**
     *  @return Object - an object in which all relevant URLs are registered as keys
     *  @throws CampaignInfoParseError - thrown if the campaignInfo object is missing 1 or more of the required URLs
     *  @desc Iterates through all URLs found in the 'Campaign Info' issue, and uses the relevant ones to build
     *        the campaignInfo object. Before returning, it validates the campaign info to make sure that it
     *        includes all of the required URLs.
     */
    let buildCampaignInfo = async () => {

        const urls = await getAllUrls();
        let campaignInfo = {};

        for (let url in urls) {

            if (urls[url].includes("edit-campaign")) {
                campaignInfo.edit = urls[url];
            } else if (urls[url].includes("create-campaign")) {
                campaignInfo.test = urls[url];
            } else if (urls[url].includes("zpl.io")) {
                campaignInfo.zeplin = urls[url];
            } else if (urls[url].includes("invis.io")) {
                campaignInfo.invision = urls[url];
            }

        }

        /**
         *  @return Object - a validated campaignInfo in which all required URLs are present
         *  @throws CampaignInfoParseError - thrown if the campaignInfo object is missing 1 or more of the required URLs
         *  @desc Checks if the required campaign information is present before returning the campaignInfo object.
         */
        let validateCampaignInfo = async (campaignInfo) => {

            let requiredInfo = ["edit", "test"];
            let missingInfo = [];

            requiredInfo.forEach(info => {
                if (campaignInfo[info] == null) {
                    missingInfo.push(info);
                }
            });

            if (missingInfo.length === 0) {
                return campaignInfo;
            } else {
                throw new CampaignInfoParseError("Failed to find URL(s): " + missingInfo + " for project " + projectName);
            }
        };

        return validateCampaignInfo(campaignInfo);
    };

    return buildCampaignInfo();
};

module.exports = {
    getCampaignInfo: getCampaignInfo
};