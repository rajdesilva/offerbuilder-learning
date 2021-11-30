import { getDistanceFromLatLonInKm } from "../getDistanceFromLatLonInKm";

describe("getDistanceFromLatLonInKm function test", () => {
  test("getDistanceFromLatLonInKm check if distance between two lat long values are correct or not", () => {

    const lat1 = 48.2082;
    const lon1 = 16.3738;
    const lat2 = 48.199185;
    const lon2 = 16.3498688;
   
    expect(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)).toBe(2.037221700287667);//approx 2km
  });

  test("getDistanceFromLatLonInKm item absent case", () => {
    const lat1 = 18.4865;
    const lon1 = 73.7968;
    const lat2 = 18.4915;
    const lon2 = 73.8217;
    expect(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)).toBe(2.684056707118353); //approx 3km
  });

  test("getDistanceFromLatLonInKm values sent are null", () => {
    expect(getDistanceFromLatLonInKm(null, null, null, null)).toBe(0);
  });
});
