// How many real WordPress projects the estimation model has actually been
// checked against so far. Bump this by hand as each new project gets
// reviewed — never round up. Any copy on the site that claims real-project
// calibration should read from this constant instead of hardcoding a number.
export const CALIBRATED_PROJECT_COUNT = 0;

// Single on/off switch for search-engine indexing. Both robots.txt
// (src/app/robots.ts) and the noindex meta tag (src/app/layout.tsx) read
// this, so going live is one flip here instead of hunting through two files.
export const IS_LIVE = false;
