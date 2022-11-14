const store = require("./store");

async function login(data) {
    // await validation(schema.login, data);
    return store.login(data);
}
async function sendCodRecoverPass(data) {
    return store.codRecoverPass(data)
}

async function checkCod(data) {
    return store.compareCod(data)
}

async function changePassword(data) {
    return store.passChange(data)
}

module.exports = {
    login,
    sendCodRecoverPass,
    checkCod,
    changePassword
};