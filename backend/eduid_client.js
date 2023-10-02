require('dotenv').config();
const {
    EDUID_CLIENT_ID,
    EDUID_CLIENT_SECRET,
    EDUID_SERVER_HOST,
    EDUID_SERVER_TOKEN_URL,
    EDUID_SERVER_TOKEN_PATH,
    EDUID_SERVER_AUTHORIZE_URL,
    EDUID_SERVER_AUTHORIZE_PATH,
} = process.env;

const { AuthorizationCode } = require('simple-oauth2');

const eduid_config = {
    client: {
        id: EDUID_CLIENT_ID,
        secret: EDUID_CLIENT_SECRET
    },
    auth: {
        tokenHost: EDUID_SERVER_HOST,
        tokenPath: EDUID_SERVER_TOKEN_PATH,
        authorizeHost: EDUID_SERVER_HOST,
        authorizePath: EDUID_SERVER_AUTHORIZE_PATH
    },
    options: {
        authorizationMethod: 'body',
    },
};

const eduid_client = new AuthorizationCode(eduid_config);

const eduid_authorization_uri = eduid_client.authorizeURL({});

module.exports = {
    eduid_client,
    eduid_authorization_uri,
}