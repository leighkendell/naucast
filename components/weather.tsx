import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components';
import CurrentTemp from './current-temp';
import DateLocation from './date-location';
import FadeInView from './fade-in-view';
import Stat from './stat';
import Stats from './stats';

const weatherQuery = gql`
  query Weather($lat: Float!, $lng: Float!) {
    location(lat: $lat, lng: $lng) {
      name
      observations {
        temperature
        windDirectionText
        windSpeed
        issueDateTime
        rainfallSince9am
      }
    }
  }
`;

interface Props {
  coords: { lat: number; lng: number };
  style?: StyleProp<ViewStyle>;
}

class Weather extends React.Component<Props> {
  public render() {
    const { coords, style } = this.props;
    const { lat, lng } = coords;

    return (
      <Query query={weatherQuery} variables={{ lat, lng }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator size="large" color="#fff" />;
          }

          if (error) {
            return `Error!: ${error}`;
          }

          const { location } = data;

          return (
            <FadeInView>
              <DateLocation location={location.name} dateTime={location.observations.issueDateTime} />
              <CurrentTemp temp={location.observations.temperature} />
              <Stats>
                <Stat text={location.observations.windDirectionText} icon="wind" />
                <Stat text={`${location.observations.rainfallSince9am}mm`} icon="rain" />
              </Stats>
            </FadeInView>
          );
        }}
      </Query>
    );
  }
}

const StyledWeather = styled(Weather)`
  width: 100%;
  height: 100%;
`;

export default StyledWeather;
