import L from 'leaflet';
import myIcon from '../assets/FP_Satellite_icon.svg.png';

const CustomIcon = new L.Icon({
  iconUrl: myIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, 0],
});

export default CustomIcon;
