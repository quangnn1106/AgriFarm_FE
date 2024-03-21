import * as React from 'react';

const useGeolocation = () => {
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error('Error getting geolocation:', error);
          setError('Error getting geolocation');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };

  React.useEffect(() => {
    getLocation();
  }, []); // Run only once on component mount

  return { latitude, longitude, error };
};

export default useGeolocation;
