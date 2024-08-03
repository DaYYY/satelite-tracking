import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import leafletTerminator from 'leaflet-terminator'; // It would be great to have typings but oh well 

const TerminatorLayer = () => {
  const map = useMap();

  useEffect(() => {
    // Create the terminator layer
    const terminator = leafletTerminator();
    terminator.addTo(map);

    // Update the terminator layer every 10 minutes
    const intervalId = setInterval(() => {
      terminator?.setTime(new Date());
    }, 600000); // 10 minutes

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
      map.removeLayer(terminator);
    };
  }, [map]);

  return null;
};

export default TerminatorLayer;
