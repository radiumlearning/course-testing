import React from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';

import {fetchExampleAction} from '../../redux/modules/example/actions';

const Example = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.example.data);
  const isFetching = useSelector(state => state.example.isFetching);

  React.useEffect(() => {
    dispatch(fetchExampleAction());
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Users: {isFetching ? 'Fetching...' : data.length}</Text>
    </SafeAreaView>
  );
};

export default Example;
