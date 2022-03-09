import React from 'react';
import {Text, FlatList, Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchUsersAction} from '../../redux/modules/users/actions';

const UserList = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.data);
  const isFetching = useSelector(state => state.user.isFetching);

  const loadItems = () => {
    dispatch(fetchUsersAction());
  };

  return (
    <View style={{alignItems: 'flex-start', marginTop: 20}}>
      <Text style={{fontSize: 24}}>Users List</Text>
      <Button title="Load items" onPress={loadItems} />
      {isFetching ? (
        <Text>Fetching...</Text>
      ) : data?.length ? (
        <FlatList
          testID="flatlistExample"
          refreshing={isFetching}
          data={data}
          renderItem={({item}) => <Text>{item?.name}</Text>}
        />
      ) : (
        <Text>No data...</Text>
      )}
    </View>
  );
};

export default UserList;
