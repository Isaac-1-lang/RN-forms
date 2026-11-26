import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DOCTORS_BY_DEPT = {
  Cardiology: ['Dr. Smith', 'Dr. Adams'],
  Neurology: ['Dr. Lee', 'Dr. Patel'],
  Pediatrics: ['Dr. Gomez', 'Dr. Brown'],
};

export default function Exercise4HospitalAppointment() {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!patientName.trim()) tempErrors.patientName = 'Patient name is required.';
    if (!/^\+?[0-9]{7,15}$/.test(phone)) tempErrors.phone = 'Valid phone number is required.';

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!department) tempErrors.department = 'Please select a department.';
    if (!doctor) tempErrors.doctor = 'Please select a doctor.';

    // Challenge: Date validation & not in the past
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      tempErrors.date = 'Enter date in YYYY-MM-DD format.';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selectedDate.getTime())) {
        tempErrors.date = 'Invalid calendar date.';
      } else if (selectedDate < today) {
        tempErrors.date = 'The appointment date cannot be in the past.';
      }
    }

    if (!time.trim()) tempErrors.time = 'Appointment time is required.';
    if (reason.trim().length < 10) tempErrors.reason = 'Reason for visit must contain at least 10 characters.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    setSuccess(false);
    if (validate()) setSuccess(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hospital Appointment Request Form</Text>

      <TextInput style={styles.input} placeholder="Patient Name" value={patientName} onChangeText={setPatientName} />
      {errors.patientName && <Text style={styles.error}>{errors.patientName}</Text>}

      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput style={styles.input} placeholder="Email (Optional)" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>Select Department:</Text>
      <View style={styles.row}>
        {Object.keys(DOCTORS_BY_DEPT).map((dept) => (
          <TouchableOpacity
            key={dept}
            style={[styles.chip, department === dept && styles.chipSelected]}
            onPress={() => { setDepartment(dept); setDoctor(''); }}
          >
            <Text style={department === dept ? styles.chipTextSelected : styles.chipText}>{dept}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.department && <Text style={styles.error}>{errors.department}</Text>}

      {department ? (
        <>
          <Text style={styles.label}>Select Doctor:</Text>
          <View style={styles.row}>
            {DOCTORS_BY_DEPT[department].map((doc) => (
              <TouchableOpacity
                key={doc}
                style={[styles.chip, doctor === doc && styles.chipSelected]}
                onPress={() => setDoctor(doc)}
              >
                <Text style={doctor === doc ? styles.chipTextSelected : styles.chipText}>{doc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}
      {errors.doctor && <Text style={styles.error}>{errors.doctor}</Text>}

      <TextInput style={styles.input} placeholder="Appointment Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      {errors.date && <Text style={styles.error}>{errors.date}</Text>}

      <TextInput style={styles.input} placeholder="Appointment Time (e.g., 10:30 AM)" value={time} onChangeText={setTime} />
      {errors.time && <Text style={styles.error}>{errors.time}</Text>}

      <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="Reason for Visit (min 10 chars)" value={reason} onChangeText={setReason} />
      {errors.reason && <Text style={styles.error}>{errors.reason}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>

      {success && <Text style={styles.success}>Appointment booked with {doctor} on {date} at {time}!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8' },
  chipSelected: { backgroundColor: '#17a2b8' },
  chipText: { color: '#17a2b8' },
  chipTextSelected: { color: '#fff' },
  button: { backgroundColor: '#17a2b8', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  success: { color: 'green', fontWeight: 'bold', marginTop: 15, textAlign: 'center' }
});