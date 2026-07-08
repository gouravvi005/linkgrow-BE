"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserAgent = parseUserAgent;
function parseUserAgent(uaString) {
    if (!uaString) {
        return { browser: 'Unknown', os: 'Unknown', device: 'desktop' };
    }
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'desktop';
    if (/mobile/i.test(uaString)) {
        device = 'mobile';
    }
    else if (/tablet|ipad|playbook|silk/i.test(uaString)) {
        device = 'tablet';
    }
    if (/chrome|crios/i.test(uaString)) {
        browser = 'Chrome';
    }
    else if (/firefox|fxios/i.test(uaString)) {
        browser = 'Firefox';
    }
    else if (/safari/i.test(uaString) && !/chrome|crios/i.test(uaString)) {
        browser = 'Safari';
    }
    else if (/opr/i.test(uaString)) {
        browser = 'Opera';
    }
    else if (/edg/i.test(uaString)) {
        browser = 'Edge';
    }
    if (/windows/i.test(uaString)) {
        os = 'Windows';
    }
    else if (/iphone|ipad|ipod/i.test(uaString)) {
        os = 'iOS';
    }
    else if (/macintosh|mac os x/i.test(uaString)) {
        os = 'macOS';
    }
    else if (/android/i.test(uaString)) {
        os = 'Android';
    }
    else if (/linux/i.test(uaString)) {
        os = 'Linux';
    }
    return { browser, os, device };
}
//# sourceMappingURL=user-agent.js.map