export const getLocation = () => {


    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
        (position) => {
            resolve([
                true,
                {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    errorMessage: ""
                }
            ]);
        },
        (error) => {
            reject([
                false,
                {
                    longitude: 0,
                    latitude: 0,
                    errorMessage: error.message
                }
            ]);
        }
    ));

};
