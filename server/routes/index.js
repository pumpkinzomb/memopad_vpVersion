const account = require('./account');
const memo = require('./memo')

module.exports = (router) => {
    account(router)
    memo(router)
}
