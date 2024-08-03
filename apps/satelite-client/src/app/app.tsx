import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import TerminatorLayer from './terminator';
import { SatelliteData } from './interfaces';
import { CoordinatesList } from './coordinates-list';
import CustomIcon from './sateliteIcon';

const StyledApp = styled.div`
  height: 500px;
  width: 500px;
  box-sizing: border-box;
  border: 1px solid red;
`;

const fetchMyData = async () => {
  const response = await axios.get('http://localhost:3000/');
  return response.data;
};

export function App() {
  const [dataArray, setDataArray] = useState<Map<string, SatelliteData>>(
    new Map()
  );

  const { data, error, isLoading } = useQuery<SatelliteData, boolean>(
    'satelite',
    fetchMyData,
    {
      refetchInterval: 10000, // 10 seconds
    }
  );

  useEffect(() => {
    if (data) {
      setDataArray((prevState) => {
        prevState.set(
          data.iss_position.latitude + data.iss_position.longitude,
          data
        );
        return prevState;
      });
    }
  }, [data]);

  const positionsArray: Array<[number, number]> = Array.from(
    dataArray?.values()
  ).map((position) => [
    Number(position.iss_position.latitude),
    Number(position.iss_position.longitude),
  ]);

  return (
    <StyledApp>
      <MapContainer
        center={[0, 0]}
        zoom={1}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          errorTileUrl="https://via.placeholder.com/256?text=Tile+Not+Available"
        />
        <Polyline pathOptions={{ color: 'red' }} positions={positionsArray} />
        {data?.iss_position ? (
          <Marker
            icon={CustomIcon}
            position={[
              Number(data?.iss_position.latitude),
              Number(data?.iss_position.longitude),
            ]}
          >
            x
          </Marker>
        ) : (
          <Marker position={[0, 0]}>searching for satellite</Marker>
        )}
        <TerminatorLayer />
      </MapContainer>
      <CoordinatesList
        error={error}
        loading={isLoading}
        list={positionsArray}
      />
    </StyledApp>
  );
}

export default App;
