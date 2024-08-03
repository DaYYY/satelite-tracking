import styled from 'styled-components';

export interface CoordinatesProps {
  error: boolean | null;
  loading: boolean;
  list: Array<[number, number]>;
}
const Numeric = styled.span`
  font-weight: 800;
`;
const ComponentHeader = styled.h1`
  font-size: 25px;
`;
export function CoordinatesList({ error, loading, list }: CoordinatesProps) {
  if (loading) {
    return <div> Data is loading...</div>;
  }
  if (list) {
    return (
      <div>
        <ComponentHeader> Received coordinates are</ComponentHeader>
        {error && <span>error fetching data</span>}

        <ul>
          {list.map((position) => (
            <li key={position[0] + position[1]}>
              Latitude - <Numeric>{position[0]}</Numeric>
              <br></br>
              Longitude - <Numeric> {position[1]}</Numeric>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
