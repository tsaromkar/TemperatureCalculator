import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import BoilingVerdict from './BoilingVerdict';
import TemperatureComponent from './TemperatureComponent';

interface ICalcState {
  temperature: string;
  scale: string;
}

const CalcState: ICalcState = {
  temperature: '',
  scale: '',
};

const toCelcius = (farenheit: number) => {
  return ((farenheit - 32) * 5) / 9;
};

const toFarenheit = (celcius: number) => {
  return (celcius * 9) / 5 + 32;
};

const convertTemp = (
  temperature: string,
  convert: (value: number) => number,
) => {
  const temp = parseFloat(temperature);
  if (isNaN(temp)) {
    return '';
  }
  const output = convert(temp);
  const rounded = Math.round(output * 1000) / 1000;
  return String(rounded);
};

export default function Calculator() {
  const [calcState, setCalcState] = useState(CalcState);

  const handleCeliusTempChange = useCallback((value: any) => {
    setCalcState({
      temperature: value,
      scale: 'c',
    });
  }, []);

  const handleFarenheitTempChange = useCallback((value: any) => {
    setCalcState({
      temperature: value,
      scale: 'f',
    });
  }, []);

  const celciusTemp = useMemo(
    () =>
      calcState.scale === 'f'
        ? convertTemp(calcState.temperature, toCelcius)
        : calcState.temperature,
    [calcState.scale, calcState.temperature],
  );

  const farenheitTemp = useMemo(
    () =>
      calcState.scale === 'c'
        ? convertTemp(calcState.temperature, toFarenheit)
        : calcState.temperature,
    [calcState.scale, calcState.temperature],
  );

  return (
    <View style={styles.container}>
      <TemperatureComponent
        scale="c"
        temperature={celciusTemp}
        onTemperatureChange={handleCeliusTempChange}
      />
      <TemperatureComponent
        scale="f"
        temperature={farenheitTemp}
        onTemperatureChange={handleFarenheitTempChange}
      />
      <BoilingVerdict celcius={parseFloat(celciusTemp)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
