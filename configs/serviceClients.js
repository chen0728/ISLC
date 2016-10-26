var config = require('../lib/common/config');
var RestClient = require('../lib/common/restClient');

function ServiceClients() {
    this.thisClient = new RestClient({baseUrl: config.thisClientUrl});
}

module.exports = new ServiceClients();



