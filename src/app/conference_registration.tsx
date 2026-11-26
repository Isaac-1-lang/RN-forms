import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Exercise7EventRegistration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [attendanceType, setAttendanceType] = useState('');
  const [days, setDays] = useState('');
  const [dietary, setDietary] = useState('');
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Full name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) tempErrors.email = 'Valid email is required.';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    if (!organization.trim()) tempErrors.organization = 'Organization is required.';
    if (!jobTitle.trim()) tempErrors.jobTitle = 'Job title is required.';
    if (!attendanceType) tempErrors.attendanceType = 'Select attendance type.';

    const numDays = Number(days);
    if (!Number.isInteger(numDays) || numDays < 1 || numDays > 3) {
      tempErrors.days = 'Number of days must be between 1 and 3.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = () => {
    setRegistered(false);
    if (validate()) setRegistered(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tech Conference Registration</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput style={styles.input} placeholder="Organization" value={organization} onChangeText={setOrganization} />
      {errors.organization && <Text style={styles.error}>{errors.organization}</Text>}

      <TextInput style={styles.input} placeholder="Job Title" value={jobTitle} onChangeText={setJobTitle} />
      {errors.jobTitle && <Text style={styles.error}>{errors.jobTitle}</Text>}

      <Text style={styles.label}>Attendance Type:</Text>
      <View style={styles.row}>
        {['Physical', 'Virtual'].map((type) => (
          <TouchableOpacity key={type} style={[styles.chip, attendanceType === type && styles.chipSelected]} onPress={() => setAttendanceType(type)}>
            <Text style={attendanceType === type ? styles.chipTextSelected : styles.chipText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.attendanceType && <Text style={styles.error}>{errors.attendanceType}</Text>}

      <TextInput style={styles.input} placeholder="Number of Days (1-3)" keyboardType="numeric" value={days} onChangeText={setDays} />
      {errors.days && <Text style={styles.error}>{errors.days}</Text>}

      <TextInput style={styles.input} placeholder="Dietary Requirement (Optional)" value={dietary} onChangeText={setDietary} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {registered && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeader}>Registration Successful</Text>
          <Text>Name: {fullName}</Text>
          <Text>Organization: {organization}</Text>
          <Text>Attendance: {attendanceType}</Text>
          <Text>Days: {days}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  row: { flexDirection: 'row', gap: 10, marginTop: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#00897b' },
  chipSelected: { backgroundColor: '#00897b' },
  chipText: { color: '#00897b' },
  chipTextSelected: { color: '#fff' },
  button: { backgroundColor: '#00897b', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  summaryBox: { marginTop: 20, padding: 15, backgroundColor: '#e0f2f1', borderRadius: 8 },
  summaryHeader: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#004d40' }
});