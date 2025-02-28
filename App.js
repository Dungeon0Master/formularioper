import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function App() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es obligatorio'),
    race: Yup.string().oneOf(['Humano', 'Elfo', 'Enano', 'Halfling'], 'Selecciona una raza válida').required('La raza es obligatoria'),
    resistance: Yup.number().min(1, 'Debe ser entre 1 y 5').max(5, 'Debe ser entre 1 y 5').required('Obligatorio'),
    agility: Yup.number().min(1, 'Debe ser entre 1 y 5').max(5, 'Debe ser entre 1 y 5').required('Obligatorio'),
    technique: Yup.number().min(1, 'Debe ser entre 1 y 5').max(5, 'Debe ser entre 1 y 5').required('Obligatorio'),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
          <Formik
            initialValues={{ name: '', race: '', resistance: '', agility: '', technique: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              Alert.alert('Personaje Creado', `Nombre: ${values.name}\nRaza: ${values.race}\nResistencia: ${values.resistance}\nAgilidad: ${values.agility}\nTécnica: ${values.technique}`);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <View style={styles.container}>
                <Text style={styles.title}>Registro de Personaje</Text>

                <TextInput style={styles.input} placeholder="Nombre del personaje" value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')} />
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <Picker selectedValue={values.race} style={styles.input} onValueChange={(itemValue) => setFieldValue('race', itemValue)}>
                  <Picker.Item label="Selecciona una raza" value="" />
                  <Picker.Item label="Humano" value="Humano" />
                  <Picker.Item label="Elfo" value="Elfo" />
                  <Picker.Item label="Enano" value="Enano" />
                  <Picker.Item label="Halfling" value="Halfling" />
                </Picker>
                {touched.race && errors.race && <Text style={styles.errorText}>{errors.race}</Text>}

                <TextInput style={styles.input} placeholder="Resistencia (1-5)" keyboardType="numeric" value={values.resistance.toString()} onChangeText={(text) => setFieldValue('resistance', Number(text))} onBlur={handleBlur('resistance')} />
                {touched.resistance && errors.resistance && <Text style={styles.errorText}>{errors.resistance}</Text>}

                <TextInput style={styles.input} placeholder="Agilidad (1-5)" keyboardType="numeric" value={values.agility.toString()} onChangeText={(text) => setFieldValue('agility', Number(text))} onBlur={handleBlur('agility')} />
                {touched.agility && errors.agility && <Text style={styles.errorText}>{errors.agility}</Text>}

                <TextInput style={styles.input} placeholder="Técnica (1-5)" keyboardType="numeric" value={values.technique.toString()} onChangeText={(text) => setFieldValue('technique', Number(text))} onBlur={handleBlur('technique')} />
                {touched.technique && errors.technique && <Text style={styles.errorText}>{errors.technique}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Crear Personaje</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10, backgroundColor: '#fff' },
  button: { width: '100%', backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10, fontWeight: 'bold' },
});
