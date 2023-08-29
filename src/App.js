import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  LayerGroup,
} from 'react-leaflet';
import { BsArrowsFullscreen } from 'react-icons/bs';
import StreetSearch from './components/StreetSearch';
import MyLocation from './components/MyLocation';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const [position, setPosition] = useState([52.435, 30.99]);
  const [showMarker, setShowMarker] = useState(false);
  const [localTileUrl1, setLocalTileUrl1] = useState('');
  const [localTileUrl2, setLocalTileUrl2] = useState('');
  const [showFullScreen, setShowFullScreen] = useState(true);

  function OpenNewStreetHandler(position) {
    setPosition(position);
  }

  function showAll() {
    setShowFullScreen(!showFullScreen);
  }

  function getLocalTileUrls() {
    const basePath1 = 'file:///storage/emulated/0/.onlyOurLine/oldmap';
    const basePath2 = 'file:///storage/emulated/0/.WorkMap/fullold';

    window.resolveLocalFileSystemURL(basePath1, function (fileEntry) {
      setLocalTileUrl1(`${fileEntry.toInternalURL()}{z}/{x}/{-y}.png`);
    });

    window.resolveLocalFileSystemURL(basePath2, function (fileEntry) {
      setLocalTileUrl2(`${fileEntry.toInternalURL()}{z}/{x}/{-y}.png`);
    });
  }

  useEffect(() => {
    getLocalTileUrls();
  }, []);

  return (
    <div className="App">
      <MapContainer
        attributionControl={false}
        center={position}
        zoom={14}
        minZoom={12}
        style={{ height: '100vh' }}
        zoomControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Карта 1">
            <TileLayer
              url={localTileUrl2}
              minZoom={12}
              maxZoom={21}
              minNativeZoom={16}
              maxNativeZoom={20}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Карта 2">
            <LayerGroup>
              <TileLayer
                detectRetina={true}
                maxNativeZoom={19}
                maxZoom={21}
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TileLayer
                url={localTileUrl1}
                minZoom={12}
                maxZoom={20}
                minNativeZoom={16}
                maxNativeZoom={20}
              />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>
        {showFullScreen && (
          <div>
            <StreetSearch
              OpenNewStreet={OpenNewStreetHandler}
              position={position}
              showMarker={showMarker}
              setShowMarker={setShowMarker}
            />
            <MyLocation setPosition={setPosition} />
            <ZoomControl />
          </div>
        )}
        <button className="buttonShow" onClick={() => showAll()}>
          <BsArrowsFullscreen />
        </button>
      </MapContainer>
    </div>
  );
}

export default App;
