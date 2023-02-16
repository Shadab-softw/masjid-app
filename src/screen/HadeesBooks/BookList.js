import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CONSTANT from '../../constants';

const BookList = ({books, number, start, end, navigation, name}) => {
  console.log('books>>>', number);
  const bookName = text => {
    const regex = /(<([^>]+)>)/gi;
    return text.replace(regex, '');
  };
  return (
    <View>
      <TouchableOpacity 
        onPress={() =>
          navigation.navigate(CONSTANT.App.screenNames.BookDetailsScreen, {
            titleEn: books[0].name,
            titleAr: books[1].name,
            hadeethsnumber: number,
            CollectionName: name,
            number: number,
          })
        }>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: '#fff', fontSize: 14}}>{number}</Text>

          <Text style={{color: '#A7C829', width: '40%', fontSize: 15}}>
            {bookName(books[0].name)}
          </Text>
          <Text style={{color: '#A7C829', fontSize: 18, width: '40%'}}>
            {books[1].name}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        <Text style={{color: '#fff', fontSize: 15,}}>{start}</Text>
        <Text style={{color: '#fff', fontSize: 15, marginHorizontal: 20}}>
          to
        </Text>
        <Text style={{color: '#fff', fontSize: 15}}>{end}</Text>
      </View>
    </View>
  );
};

export default BookList;
