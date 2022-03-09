import React from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';

import {fetchUsersAction} from '../../redux/modules/users/actions';

const Example = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.data);
  const isFetching = useSelector(state => state.user.isFetching);

  React.useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log('isFetching: ', isFetching);
  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Users: {isFetching ? 'Fetching...' : data.length}</Text>
    </SafeAreaView>
  );
};

export default Example;
