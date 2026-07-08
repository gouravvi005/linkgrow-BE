export interface ParsedUserAgent {
  browser: string;
  os: string;
  device: string;
}

export function parseUserAgent(uaString: string | undefined): ParsedUserAgent {
  if (!uaString) {
    return { browser: 'Unknown', os: 'Unknown', device: 'desktop' };
  }

  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'desktop';

  // Device Detection
  if (/mobile/i.test(uaString)) {
    device = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(uaString)) {
    device = 'tablet';
  }

  // Browser Detection
  if (/chrome|crios/i.test(uaString)) {
    browser = 'Chrome';
  } else if (/firefox|fxios/i.test(uaString)) {
    browser = 'Firefox';
  } else if (/safari/i.test(uaString) && !/chrome|crios/i.test(uaString)) {
    browser = 'Safari';
  } else if (/opr/i.test(uaString)) {
    browser = 'Opera';
  } else if (/edg/i.test(uaString)) {
    browser = 'Edge';
  }

  // OS Detection
  if (/windows/i.test(uaString)) {
    os = 'Windows';
  } else if (/iphone|ipad|ipod/i.test(uaString)) {
    os = 'iOS';
  } else if (/macintosh|mac os x/i.test(uaString)) {
    os = 'macOS';
  } else if (/android/i.test(uaString)) {
    os = 'Android';
  } else if (/linux/i.test(uaString)) {
    os = 'Linux';
  }

  return { browser, os, device };
}
