import ApolloClient from 'apollo-boost';
import { AppLoading, Constants, Font, Location, Permissions } from 'expo';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { RefreshControl, View } from 'react-native';
import Background from './components/background';
import Error from './components/error';
import Weather from './components/weather';
import Wrapper from './components/wrapper';
import { theme } from './helpers/theme';

const client = new ApolloClient({
  uri: 'https://naucast-api.now.sh',
});

interface State {
  assetsLoaded: boolean;
  refreshing: boolean;
  error: string;
  coords: { lat: number; lng: number };
}

export default class App extends React.Component<{}, State> {
  public state = {
    assetsLoaded: false,
    refreshing: false,
    error: null,
    coords: null,
  };

  public componentDidMount() {
    this.getLocation();
  }

  public render() {
    const { assetsLoaded, refreshing, error, coords } = this.state;

    if (assetsLoaded) {
      return (
        <ApolloProvider client={client}>
          <Background />
          <View
            style={{ height: Constants.statusBarHeight }}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
          />
          <Wrapper
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
                tintColor="#fff"
                colors={[theme.colors.lightBlue]}
              />
            }
          >
            {!error && !refreshing && <Weather coords={coords} />}
            {error && <Error>{error}</Error>}
          </Wrapper>
        </ApolloProvider>
      );
    } else {
      return <AppLoading startAsync={this.loadAssets} onFinish={this.setAssetsLoaded} onError={console.warn} />;
    }
  }

  private onRefresh = () => {
    this.getLocation();
    this.setRefreshing(true);
  };

  private getLocation = async () => {
    this.setRefreshing(true);

    // Request location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Please allow location access to use this app',
      });
    }

    // Get coords and update state
    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState({
      coords: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
    });

    this.setRefreshing(false);
  };

  private loadAssets = async () => {
    await this.loadFonts();
    return;
  };

  private setAssetsLoaded = () => {
    this.setState({
      assetsLoaded: true,
    });
  };

  private clearError() {
    this.setState({ error: null });
  }

  private setRefreshing(val: boolean) {
    this.setState({
      refreshing: val,
    });
  }

  private loadFonts = async () => {
    await Font.loadAsync({
      'font-light': require('./assets/fonts/AvenirNext-UltraLight.ttf'),
      'font-regular': require('./assets/fonts/AvenirNext-Regular.ttf'),
      'font-bold': require('./assets/fonts/AvenirNext-DemiBold.ttf'),
    });
  };
}
