import axios from 'axios'
import Config from './config'


function getAllFiles(resolve, reject) {
    return axios.get(Config.API_GET_ALL_FILES)
                .then(data => resolve(data));
}

function testChildFiles(resolve, reject) {
    return axios.get(Config.API_GET_DIR_CHILD)
                .then(data => resolve(data));
}

function testSearching(resolve , reject) {
    return axios.get(Config.API_GET_SEARCH)
                .then(data => resolve(data));
}

function getChildFiles(did, resolve, reject) {
    return axios.get(Config.API_GET_DIR_CHILD + '/' + did)
                .then(data => resolve(data));
}

function getSearch(keyword, resolve, reject) {
    return axios.get(Config.API_GET_SEARCH + '?keyword=' + keyword)
                .then(data =>  resolve(data));
}

export default {
    'GETFILE': getAllFiles,
    'GETCHILDFILE': getChildFiles,
    'GETSEARCH': getSearch,
    'TESTCHILDFILE': testChildFiles,
    'TESTSEARCH': testSearching
};