import * as Location from "expo-location";

// | ErrorConstructor

export const getCurrentLocation =
  (): Promise<Location.LocationObject | null> => {
    const timeout = 5000;
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Error getting gps location after ${(timeout * 2) / 1000} s`
          )
        );
      }, timeout * 2);
      setTimeout(async () => {
        resolve(await Location.getLastKnownPositionAsync());
        console.log("getLastKnownPositionAsync", 1);
      }, timeout);
      resolve(await Location.getCurrentPositionAsync());
      console.log("getCurrentPositionAsync", 2);
    });
  };
