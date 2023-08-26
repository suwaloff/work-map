import { MdOutlineMyLocation } from 'react-icons/md';
import { useMap } from 'react-leaflet';

function MyLocation({ setPosition }) {
  const map = useMap();

  const handleClick = () => {
    map.locate();
  };

  const handleLocationFound = (e) => {
    map.flyTo(e.latlng, 18, { animate: false, duration: 1 });
  };

  map.on('locationfound', handleLocationFound);

  return (
    <>
      <button className="buttonMyLocal" onClick={handleClick}>
        <MdOutlineMyLocation style={{ color: 'red' }} />
      </button>
    </>
  );
}

export default MyLocation;
