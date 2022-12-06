import React, {useCallback} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface ITemperatureComponent {
  temperature: string;
  onTemperatureChange: (e: any) => void;
  scale: string;
}

const scaleNames: any = {
  c: 'Celcius',
  f: 'Farenheit',
};

export default function TemperatureComponent(props: ITemperatureComponent) {
  const {temperature, onTemperatureChange, scale} = props;

  const handleOnTemperatureChange = useCallback(
    (value: string) => {
      onTemperatureChange(value);
    },
    [onTemperatureChange],
  );

  return (
    <View>
      <Text>Enter Temperature in {scaleNames[scale]}:</Text>
      <TextInput
        value={temperature}
        onChangeText={handleOnTemperatureChange}
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginVertical: 10,
  },
});
