import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Exercise5JobApplication() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Full name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) tempErrors.email = 'Valid email is required.';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    if (!position.trim()) tempErrors.position = 'Position is required.';
    if (!education) tempErrors.education = 'Education level is required.';

    const expNum = Number(experience);
    if (experience === '' || isNaN(expNum) || expNum < 0) {
      tempErrors.experience = 'Years of experience must be 0 or greater.';
    }

    if (coverLetter.trim().length < 50) {
      tempErrors.coverLetter = `Cover letter must be at least 50 characters (currently ${coverLetter.trim().length}).`;
    }

    if (!cvFile) tempErrors.cvFile = 'Please select a CV file.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(false);
    if (validate()) setSubmitted(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Job Application Form</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput style={styles.input} placeholder="Position Applied For" value={position} onChangeText={setPosition} />
      {errors.position && <Text style={styles.error}>{errors.position}</Text>}

      <Text style={styles.label}>Education Level:</Text>
      <View style={styles.row}>
        {['High School', 'Bachelor', 'Master', 'PhD'].map((lvl) => (
          <TouchableOpacity key={lvl} style={[styles.chip, education === lvl && styles.chipSelected]} onPress={() => setEducation(lvl)}>
            <Text style={education === lvl ? styles.chipTextSelected : styles.chipText}>{lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.education && <Text style={styles.error}>{errors.education}</Text>}

      <TextInput style={styles.input} placeholder="Years of Experience" keyboardType="numeric" value={experience} onChangeText={setExperience} />
      {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}

      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Cover Letter (minimum 50 characters)"
        value={coverLetter}
        onChangeText={setCoverLetter}
      />
      {errors.coverLetter && <Text style={styles.error}>{errors.coverLetter}</Text>}

      <TouchableOpacity style={styles.uploadBtn} onPress={() => setCvFile('Resume_Applicant.pdf')}>
        <Text style={styles.uploadText}>{cvFile ? `Selected: ${cvFile}` : 'Select CV (PDF/DOCX)'}</Text>
      </TouchableOpacity>
      {errors.cvFile && <Text style={styles.error}>{errors.cvFile}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>

      {submitted && <Text style={styles.success}>Application submitted successfully</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#6f42c1' },
  chipSelected: { backgroundColor: '#6f42c1' },
  chipText: { color: '#6f42c1' },
  chipTextSelected: { color: '#fff' },
  uploadBtn: { borderWidth: 1, borderStyle: 'dashed', borderColor: '#6f42c1', padding: 12, borderRadius: 6, marginTop: 12, alignItems: 'center' },
  uploadText: { color: '#6f42c1', fontWeight: '600' },
  button: { backgroundColor: '#6f42c1', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  success: { color: 'green', fontWeight: 'bold', marginTop: 15, textAlign: 'center' }
});