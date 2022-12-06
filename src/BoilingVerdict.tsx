import React, {useMemo} from 'react';
import {Text} from 'react-native';

interface IBoilingVerdict {
  celcius: number;
}

export default function BoilingVerdict(props: IBoilingVerdict) {
  const {celcius = ''} = props;
  const verdict = useMemo(() => {
    return celcius >= 100 ? (
      <Text>The water would boil.</Text>
    ) : (
      <Text>The water would not boil.</Text>
    );
  }, [celcius]);
  return verdict;
}
