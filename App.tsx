import { AppLoading, Font } from 'expo';
import React from 'react';
import Background from './components/background';
import CurrentTemp from './components/current-temp';
import DateLocation from './components/date-location';
import Wrapper from './components/wrapper';

interface State {
  assetsLoaded: boolean;
}

export default class App extends React.Component<{}, State> {
  public state = {
    assetsLoaded: false,
  };

  public render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {
      return (
        <>
          <Background />
          <Wrapper>
            <DateLocation location="Perth, WA" date="Saturday, 26 January" time="4:30pm" />
            <CurrentTemp temp="30" description="Clear. Winds southeasterly 15 to 25 km/h." />
          </Wrapper>
        </>
      );
    } else {
      return <AppLoading startAsync={this.loadAssets} onFinish={this.setAssetsLoaded} onError={console.warn} />;
    }
  }

  private loadAssets = async () => {
    await this.loadFonts();
    return;
  };

  private setAssetsLoaded = () => {
    this.setState({
      assetsLoaded: true,
    });
  };

  private loadFonts = async () => {
    await Font.loadAsync({
      'font-light': require('./assets/fonts/HKGrotesk-Light.otf'),
      'font-regular': require('./assets/fonts/HKGrotesk-Regular.otf'),
      'font-bold': require('./assets/fonts/HKGrotesk-Bold.otf'),
    });
  };
}
