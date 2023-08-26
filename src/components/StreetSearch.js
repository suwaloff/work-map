import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { iconMarker } from './../components/IconMarker';
import { Marker } from 'react-leaflet';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './StreetSearch.module.css';
import { BsSearch } from 'react-icons/bs';

const provider = new OpenStreetMapProvider();

function StreetSearch({ OpenNewStreet, position, showMarker, setShowMarker }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const map = useMap();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }
    setLoading(true);
    const inputValue = text;
    const results = await provider.search({
      query: `${inputValue} Гомель, Гомельская область, Беларусь`,
    });

    const filteredResults = results.filter((result) =>
      result.label.includes('Гомель, Гомельская область')
    );

    if (filteredResults && filteredResults[0]) {
      const { x: longitude, y: latitude } = filteredResults[0];
      OpenNewStreet([latitude, longitude]);
      setShowMarker(true);
      setText('');
    } else {
      alert('Адрес не найден');
      setLoading(false);
      setText('');
    }
  };

  useEffect(() => {
    if (map && showMarker) {
      map.flyTo(position, 18, { animate: false, duration: 1 });
      setLoading(false);
    }
  }, [position, map, showMarker]);

  return (
    <div className={styles.StreetSearchContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="поиск улицы.."
        ></input>
        <button type="submit">
          <BsSearch />
        </button>
      </form>
      {loading && <CircularProgress color="secondary" />}
      {showMarker && <Marker position={position} icon={iconMarker} />}
    </div>
  );
}

export default StreetSearch;
