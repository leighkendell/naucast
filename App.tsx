import { AppLoading, Constants, Font, Location, Permissions } from 'expo';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import Background from './components/background';
import CurrentTemp from './components/current-temp';
import DateLocation from './components/date-location';
import Error from './components/error';
import Stat from './components/stat';
import Stats from './components/stats';
import Wrapper from './components/wrapper';
import { theme } from './helpers/theme';

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
    const { assetsLoaded, refreshing, error } = this.state;

    if (assetsLoaded) {
      return (
        <>
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
            {!error && !refreshing && (
              <>
                <DateLocation location="Perth, WA" date="Saturday, 26 January" time="4:30pm" />
                <CurrentTemp temp="30" description="Clear. Winds southeasterly 15 to 25 km/h." />
                <Stats>
                  <Stat text="SE" icon="wind" />
                  <Stat text="5%" icon="rain" />
                </Stats>
              </>
            )}
            {error && <Error>{error}</Error>}
          </Wrapper>
        </>
      );
    } else {
      return <AppLoading startAsync={this.loadAssets} onFinish={this.setAssetsLoaded} onError={console.warn} />;
    }
  }

  private onRefresh = () => {
    this.getLocation();
    this.setState({
      refreshing: true,
    });
  };

  private getLocation = async () => {
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

    this.setState({
      refreshing: false,
    });
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

  private loadFonts = async () => {
    await Font.loadAsync({
      'font-light': require('./assets/fonts/HKGrotesk-Light.otf'),
      'font-regular': require('./assets/fonts/HKGrotesk-Regular.otf'),
      'font-bold': require('./assets/fonts/HKGrotesk-Bold.otf'),
    });
  };
}
