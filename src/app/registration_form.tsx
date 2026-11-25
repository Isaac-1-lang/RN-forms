import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Exercise1Registration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Full name is required.';
    else if (fullName.trim().length < 3) tempErrors.fullName = 'Full name must be at least 3 characters.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) tempErrors.email = 'Email address is invalid.';

    if (password.length < 8) tempErrors.password = 'Password must contain at least 8 characters.';
    if (confirmPassword !== password) tempErrors.confirmPassword = 'Passwords do not match.';

    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    else if (!phoneRegex.test(phone)) tempErrors.phone = 'Enter a valid phone number.';

    if (!acceptTerms) tempErrors.acceptTerms = 'You must accept the terms and conditions.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(false);
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Registration Form</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <View style={styles.switchRow}>
        <Switch value={acceptTerms} onValueChange={setAcceptTerms} />
        <Text style={styles.switchLabel}>I accept the Terms & Conditions</Text>
      </View>
      {errors.acceptTerms && <Text style={styles.error}>{errors.acceptTerms}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {submitted && <Text style={styles.success}>Registration successful! Account created.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  switchLabel: { marginLeft: 10 },
  button: { backgroundColor: '#007BFF', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  success: { color: 'green', fontWeight: 'bold', marginTop: 15, textAlign: 'center' }
});