import {POLICIES_URL, TERM_URL} from "constants/system.constant";

export enum ENV {
    PRODUCTION = "production",
    DEVELOPMENT = "development"
}

/**
 *
 *
 * Thay đổi khi build or dev
 *
 *
 */


export const ENVIRONMENT: ENV = __DEV__ ? ENV.DEVELOPMENT : ENV.PRODUCTION

/**
 <<<<<<< src/configs/index.ts
 * Domain cho dev
 */
const DEVELOPER_DOMAIN = "https://chat-law-api.iceo.tech";
const DEVELOPER_DOMAIN_MEDIA = "https://media.lgbt.appuni.io";
const DEVELOPER_DOMAIN_API = DEVELOPER_DOMAIN + "/api";
const DEVELOPER_DOMAIN_CHAT = "https://chat-law-api.iceo.tech";
const DEVELOPER_DOMAIN_CHAT_API = DEVELOPER_DOMAIN_CHAT + "/api";
const DEVELOPER_DOMAIN_SOCKET = "https://dev-socket.whiteg.app";

/**
 * Domain cho production
 */
const PRODUCTION_DOMAIN = "https://chat-law-api.iceo.tech";
const PRODUCTION_DOMAIN_MEDIA = "https://media.lgbt.appuni.io";
const PRODUCTION_DOMAIN_API = PRODUCTION_DOMAIN + "/api";
const PRODUCTION_DOMAIN_CHAT = "https://chat-law-api.iceo.tech";
const PRODUCTION_DOMAIN_CHAT_API = PRODUCTION_DOMAIN_CHAT + "/api";
const PRODUCTION_DOMAIN_SOCKET = "https://socket-ishare.whiteg.app/socket";

const INIT_RUNTIME_DOMAIN_MEDIA = ENVIRONMENT === ENV.PRODUCTION ? PRODUCTION_DOMAIN_MEDIA : DEVELOPER_DOMAIN_MEDIA;
const INIT_RUNTIME_DOMAIN_API = ENVIRONMENT === ENV.PRODUCTION ? PRODUCTION_DOMAIN_API : DEVELOPER_DOMAIN_API;
const INIT_RUNTIME_DOMAIN_CHAT = ENVIRONMENT === ENV.PRODUCTION ? PRODUCTION_DOMAIN_CHAT : DEVELOPER_DOMAIN_CHAT;
const INIT_RUNTIME_DOMAIN_SOCKET = ENVIRONMENT === ENV.PRODUCTION ? PRODUCTION_DOMAIN_SOCKET : DEVELOPER_DOMAIN_SOCKET;
const INIT_RUNTIME_DOMAIN_CHAT_API = ENVIRONMENT === ENV.PRODUCTION ? PRODUCTION_DOMAIN_CHAT_API : DEVELOPER_DOMAIN_CHAT_API;

export let APP_URL = {
    env: ENVIRONMENT === ENV.PRODUCTION ? 'product' : 'develop', // or production
    APP_API_REQUEST_TIMEOUT: 15, // in second, NOT microseconds
    APP_AJAX_URL: INIT_RUNTIME_DOMAIN_API + '',
    APP_UPLOAD_MEDIA: INIT_RUNTIME_DOMAIN_MEDIA + '/upload-media' + `?callback=${DEVELOPER_DOMAIN}/api/chat-media/create`,
    APP_CHAT_MEDIA: INIT_RUNTIME_DOMAIN_CHAT_API + "/chat-media",
    VUE_APP_URL_CHAT_SOCKET: INIT_RUNTIME_DOMAIN_SOCKET + '/socket',

    APP_CHAT_ROOT: INIT_RUNTIME_DOMAIN_CHAT,
    TERM: TERM_URL,
    POLICIES: POLICIES_URL
}

export function setUrlEnv(isProduction: boolean) {
    const RUNTIME_DOMAIN = isProduction ? PRODUCTION_DOMAIN : DEVELOPER_DOMAIN;
    const RUNTIME_DOMAIN_MEDIA = isProduction ? PRODUCTION_DOMAIN_MEDIA : DEVELOPER_DOMAIN_MEDIA;
    const RUNTIME_DOMAIN_API = isProduction ? PRODUCTION_DOMAIN_API : DEVELOPER_DOMAIN_API;
    const RUNTIME_DOMAIN_CHAT = isProduction ? PRODUCTION_DOMAIN_CHAT : DEVELOPER_DOMAIN_CHAT;
    const RUNTIME_DOMAIN_SOCKET = isProduction ? PRODUCTION_DOMAIN_SOCKET : DEVELOPER_DOMAIN_SOCKET;
    const RUNTIME_DOMAIN_CHAT_API = isProduction ? PRODUCTION_DOMAIN_CHAT_API : DEVELOPER_DOMAIN_CHAT_API;
    APP_URL = {
        env: isProduction ? 'product' : 'develop', // or production
        APP_API_REQUEST_TIMEOUT: 15, // in second, NOT microseconds
        APP_AJAX_URL: RUNTIME_DOMAIN_API + '',
        APP_UPLOAD_MEDIA: RUNTIME_DOMAIN_MEDIA + '/upload-media' + `?callback=${DEVELOPER_DOMAIN}/api/chat-media/create`,
        APP_CHAT_MEDIA: RUNTIME_DOMAIN_CHAT_API + "/chat-media",
        VUE_APP_URL_CHAT_SOCKET: RUNTIME_DOMAIN_SOCKET + '/socket',

        APP_CHAT_ROOT: RUNTIME_DOMAIN_CHAT,
        TERM: TERM_URL,
        POLICIES: POLICIES_URL
    }
}
