
var hosts = {
    'FILEHOST': 'http://localhost:8848'
};

var config = {
    'FILE_SHOW_LEVEL': 10,
    'API_GET_ALL_FILES': hosts.FILEHOST + '/allfiles',
    'API_GET_DIR_CHILD': hosts.FILEHOST + '/child',
    'API_GET_SEARCH': hosts.FILEHOST + '/search'
};

export default config;