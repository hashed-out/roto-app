import React from 'react'
import { StyleSheet, Button, Platform, View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
//import * as Calendar from 'expo-calendar';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
//import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default function Schedule() {

    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
      }

  return (
    <View>
    <CalendarList
      current={selectedDate}
      onDayPress={handleDateSelect}
      pastScrollRange={50}
      futureScrollRange={50}
      horizontal
      pagingEnabled
      style={{ borderWidth: 1, borderColor: 'gray' }}
    />
  </View>
  )
}

    