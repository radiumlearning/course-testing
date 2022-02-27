import React from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';

import {fetchExampleAction} from 'src/redux/modules/example/actions';

const Example = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchExampleAction());
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>This is a Test!</Text>
    </SafeAreaView>
  );
};

export default Example;
