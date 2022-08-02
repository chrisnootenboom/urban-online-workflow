import store from './scenario';
import WKT from 'ol/format/WKT';

const wkt = new WKT();
const apiBaseURL = 'http://127.0.0.1:8000';

export async function createSession() {
  return (
    window.fetch(`${apiBaseURL}/users`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
}

export async function getAllScenarios(sessionID) {
  return (
    window.fetch(`${apiBaseURL}/scenarios/${sessionID}`, {
      method: 'get',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
}

export async function getScenario(id) {
  return (
    window.fetch(`${apiBaseURL}/scenario/${id}`, {
      method: 'get',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
}

export async function makeScenario(sessionID, name, description) {
  return (
    window.fetch(`${apiBaseURL}/scenario/${sessionID}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, description: description }),
    })
      .then((response) => response.json())
      .then((json) => json.scenario_id)
      .catch((error) => console.log(error))
  );
}

export async function getJobStatus(jobID) {
  return (
    window.fetch(`${apiBaseURL}/job/${jobID}`, {
      method: 'get',
    })
      .then((response) => response.json().status)
      .catch((error) => console.log(error))
  );
}

export async function doWallpaper(targetCoords, patternID, scenarioID) {
  // side-effect here where feature w/ lulc table is added to scenario
  const targetWKT = `POLYGON((${
    targetCoords.map(
      (coords) => `${coords[0]} ${coords[1]}`,
    ).join(', ')
  }))`;

  console.log(targetWKT, scenarioID, patternID);
  return (
    window.fetch(`${apiBaseURL}/wallpaper`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario_id: scenarioID,
        target_parcel_wkt: targetWKT,
        pattern_id: patternID,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
}

export async function convertToSingleLULC(geom, lulcCode, scenarioID) {
  return Promise.resolve('fooJobID');
}

export async function getWallpaperResults(jobID) {
  const lulcTable = {
    forest: window.crypto.getRandomValues(new Uint8Array(1))[0],
    housing: window.crypto.getRandomValues(new Uint8Array(1))[0],
    grass: window.crypto.getRandomValues(new Uint8Array(1))[0],
    commercial: window.crypto.getRandomValues(new Uint8Array(1))[0],
    orchard: window.crypto.getRandomValues(new Uint8Array(1))[0],
  };
  return Promise.resolve(lulcTable);
}

export async function getLulcTableForParcel(geom) {
  // In general, this table will be built as part of a
  // wallpapering action, but there is the case where we
  // want to see this table for a parcel we select, before
  // doing any wallpapering. The values will come from the
  // baseline LULC.
  const lulcTable = {
    forest: window.crypto.getRandomValues(new Uint8Array(1))[0],
    grass: window.crypto.getRandomValues(new Uint8Array(1))[0],
    housing: window.crypto.getRandomValues(new Uint8Array(1))[0],
    commercial: window.crypto.getRandomValues(new Uint8Array(1))[0],
    orchard: window.crypto.getRandomValues(new Uint8Array(1))[0],
  };
  return Promise.resolve(lulcTable);
}

// A lookup for landuse codes that will always remain constant
export async function getLulcCodes() {
  const table = {
    1: 'forest',
    2: 'grass',
    3: 'housing',
    4: 'commercial',
    5: 'orchard',
  };
  return Promise.resolve(table);
}

export async function getPatterns(sessionID) {
  return (
    window.fetch(`${apiBaseURL}/pattern/${sessionID}`, {
      method: 'get',
    })
      .then((response) => response.json())
      // .then((json) => console.log(json))
      .catch((error) => console.log(error))
  );
}

// Return a globally unique ID for the pattern
export async function createPattern(geom, name) {
  console.log(`create pattern ${name} with geometry ${geom}`);
  return Promise.resolve(window.crypto.getRandomValues(new Uint8Array(1))[0]);
}
