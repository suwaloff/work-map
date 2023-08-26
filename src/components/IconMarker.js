import L from 'leaflet';

const iconMarker = new L.Icon({
  iconUrl: './iconMarker.png',
  iconRetinaUrl: './iconMarker.png',
  iconSize: [61, 61],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export { iconMarker };
