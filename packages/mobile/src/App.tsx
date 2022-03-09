import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, Text, View, Button, TextInput} from 'react-native';
import Toast from 'react-native-simple-toast';

import {getStore} from './redux';
import UserList from './components/UserList/UserList';

type Props = {
  showHiddenText?: boolean;
};

const App: React.FC<Props> = ({showHiddenText = true}) => {
  const [state, setstate] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const showToast = () => {
    Toast.show('Toast Message');
  };

  const onChangeText = (eventValue: string) => {
    setValue(eventValue);
  };

  return (
    <Provider store={getStore()}>
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 20,
            justifyContent: 'center',
          }}>
          <Button onPress={() => setstate(!state)} title="Show Text" />

          {state && <Text style={{fontSize: 24, marginTop: 20}}>Hi!</Text>}

          <Button onPress={showToast} title="Show Toast" />

          <Text testID="textExample" style={{fontSize: 24, marginTop: 20}}>
            Hi!
          </Text>

          <Text style={{fontSize: 24, marginTop: 20}}>Example Text</Text>
          <Text style={{fontSize: 24, marginTop: 20}}>Example Text</Text>

          {showHiddenText && (
            <Text testID="hiddenText" style={{fontSize: 24, marginTop: 20}}>
              Hidden Text
            </Text>
          )}

          <TextInput
            testID="inputExample"
            onChangeText={event => onChangeText(event)}
            placeholder="Placeholder text"
            value={value}
            style={{borderWidth: 1, padding: 10, marginVertical: 10}}
          />
          <UserList />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
