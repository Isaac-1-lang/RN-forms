import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

export default function Exercise3BankingTransfer() {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  const getErrors = () => {
    let errs = {};
    if (!accountName.trim()) errs.accountName = 'Account name is required.';
    if (!/^\d+$/.test(accountNumber)) errs.accountNumber = 'Account number must contain numbers only.';
    if (!amount || Number(amount) <= 0 || isNaN(Number(amount))) errs.amount = 'Amount must be greater than 0.';
    if (!currency.trim()) errs.currency = 'Currency is required.';
    if (description.length > 100) errs.description = 'Description cannot exceed 100 characters.';
    if (!/^\d{4}$/.test(pin)) errs.pin = 'PIN must be exactly 4 digits.';
    return errs;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0;

  if (showConfirmScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Transfer</Text>
        <View style={styles.card}>
          <Text style={styles.detail}>Recipient: {accountName}</Text>
          <Text style={styles.detail}>Account Number: {accountNumber}</Text>
          <Text style={styles.detail}>Amount: {currency} {Number(amount).toFixed(2)}</Text>
          {description ? <Text style={styles.detail}>Note: {description}</Text> : null}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('Success', 'Transfer completed!');
            setShowConfirmScreen(false);
          }}
        >
          <Text style={styles.buttonText}>Complete Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => setShowConfirmScreen(false)}>
          <Text style={styles.buttonText}>Edit Details</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Online Banking Transfer</Text>

      <TextInput style={styles.input} placeholder="Account Name" value={accountName} onChangeText={setAccountName} />
      {errors.accountName && <Text style={styles.error}>{errors.accountName}</Text>}

      <TextInput style={styles.input} placeholder="Account Number" keyboardType="numeric" value={accountNumber} onChangeText={setAccountNumber} />
      {errors.accountNumber && <Text style={styles.error}>{errors.accountNumber}</Text>}

      <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

      <TextInput style={styles.input} placeholder="Currency (e.g., USD, EUR)" value={currency} onChangeText={setCurrency} />
      {errors.currency && <Text style={styles.error}>{errors.currency}</Text>}

      <TextInput style={styles.input} placeholder="Transfer Description (Optional, max 100 chars)" maxLength={100} value={description} onChangeText={setDescription} />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <TextInput style={styles.input} placeholder="4-Digit PIN" keyboardType="numeric" secureTextEntry maxLength={4} value={pin} onChangeText={setPin} />
      {errors.pin && <Text style={styles.error}>{errors.pin}</Text>}

      <TouchableOpacity
        style={[styles.button, !isValid && styles.disabledBtn]}
        disabled={!isValid}
        onPress={() => setShowConfirmScreen(true)}
      >
        <Text style={styles.buttonText}>Review Transfer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  button: { backgroundColor: '#0056b3', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  disabledBtn: { backgroundColor: '#a0c4e8' },
  cancelBtn: { backgroundColor: '#6c757d', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  card: { padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  detail: { fontSize: 16, marginBottom: 8 }
});