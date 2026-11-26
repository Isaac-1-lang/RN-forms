import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Exercise2Admission() {
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prevSchool, setPrevSchool] = useState('');
  const [program, setProgram] = useState('');
  const [score, setScore] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!studentName.trim()) tempErrors.studentName = 'Student name is required.';
    if (!dob.trim()) tempErrors.dob = 'Date of birth is required.';
    if (!gender) tempErrors.gender = 'Please select a gender.';
    if (!nationality.trim()) tempErrors.nationality = 'Nationality is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) tempErrors.email = 'Valid email is required.';

    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    if (!prevSchool.trim()) tempErrors.prevSchool = 'Previous school is required.';
    if (!program) tempErrors.program = 'Please select a program.';

    const numScore = Number(score);
    if (score === '' || isNaN(numScore) || numScore < 0 || numScore > 100) {
      tempErrors.score = 'Score must be a number between 0 and 100.';
    } else if (numScore < 50) {
      // Challenge Rule
      tempErrors.score = 'Academic Score must be at least 50 for the application to proceed.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    setConfirmed(false);
    if (validate()) setConfirmed(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Admission Form</Text>

      <TextInput style={styles.input} placeholder="Student Name" value={studentName} onChangeText={setStudentName} />
      {errors.studentName && <Text style={styles.error}>{errors.studentName}</Text>}

      <TextInput style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
      {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

      <Text style={styles.label}>Gender:</Text>
      <View style={styles.row}>
        {['Male', 'Female', 'Other'].map((g) => (
          <TouchableOpacity key={g} style={[styles.chip, gender === g && styles.chipSelected]} onPress={() => setGender(g)}>
            <Text style={gender === g ? styles.chipTextSelected : styles.chipText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

      <TextInput style={styles.input} placeholder="Nationality" value={nationality} onChangeText={setNationality} />
      {errors.nationality && <Text style={styles.error}>{errors.nationality}</Text>}

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput style={styles.input} placeholder="Previous School" value={prevSchool} onChangeText={setPrevSchool} />
      {errors.prevSchool && <Text style={styles.error}>{errors.prevSchool}</Text>}

      <Text style={styles.label}>Program:</Text>
      <View style={styles.row}>
        {['Science', 'Arts', 'Engineering', 'Business'].map((p) => (
          <TouchableOpacity key={p} style={[styles.chip, program === p && styles.chipSelected]} onPress={() => setProgram(p)}>
            <Text style={program === p ? styles.chipTextSelected : styles.chipText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.program && <Text style={styles.error}>{errors.program}</Text>}

      <TextInput style={styles.input} placeholder="Academic Score (0-100)" keyboardType="numeric" value={score} onChangeText={setScore} />
      {errors.score && <Text style={styles.error}>{errors.score}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>

      {confirmed && <Text style={styles.success}>Application submitted successfully!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#007BFF' },
  chipSelected: { backgroundColor: '#007BFF' },
  chipText: { color: '#007BFF' },
  chipTextSelected: { color: '#fff' },
  button: { backgroundColor: '#28a745', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  success: { color: 'green', fontWeight: 'bold', marginTop: 15, textAlign: 'center' }
});