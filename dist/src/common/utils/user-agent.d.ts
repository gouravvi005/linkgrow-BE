export interface ParsedUserAgent {
    browser: string;
    os: string;
    device: string;
}
export declare function parseUserAgent(uaString: string | undefined): ParsedUserAgent;
