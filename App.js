import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, ScrollView} from 'react-native';
import Form from 'react-native-jsonschema-form';
import schema from './json/schema.json';
import axios from 'axios';
import uischema from './json/uischema.json';
import data from './json/data.json';
import DatePicker from 'react-native-date-picker';

export default function App() {
  const POST_URL = 'https://dev.ekareinc.com/api/1.14/web/patients?clinic=1218';

  const widgets = {
    DateWidget: CustomDate,
  };

  const postPatientData = async p => {
    p.is_enabled = true;
    p.Clinic_id_clinic = 1218;
    axios
      .post(POST_URL, p, {
        headers: {
          api_key: '68f1456bd3d17950b8e950aac446b9c1',
          api_pass: '7c89ad287e0ba21d58647201dc8b3c69',
          user: 'impioneer',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = e => {
    const newPatient = e.formData;
    console.log(newPatient);
    postPatientData(newPatient);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.notch} />
      <Form
        schema={schema}
        uiSchema={uischema}
        submitTitle={'Patient Creation'}
        noValidate={false}
        liveValidate={true}
        showErrorList={false}
        widgets={widgets}
        onSubmit={onSubmit}
      />
    </ScrollView>
  );
}

const CustomDate = function (props) {
  const date = new Date('04/24/1998');
  console.log(props);
  return (
    <DatePicker
      date={date}
      onDateChange={event => {
        props.onChange(event.toDateString());
      }}
      androidVariant="nativeAndroid"
      mode="date"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  notch: {
    width: '100%',
    height: 15,
  },
});
