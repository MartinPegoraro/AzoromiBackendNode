const store = require("./store");

async function login(data) {
    // await validation(schema.login, data);
    return store.login(data);
}

module.exports = {
    login,
};