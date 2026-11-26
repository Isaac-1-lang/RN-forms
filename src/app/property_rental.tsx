import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Exercise8RentalApplication() {
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('1200'); // Used for the 3x income rule
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [location, setLocation] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!applicantName.trim()) tempErrors.applicantName = 'Applicant name is required.';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) tempErrors.email = 'Valid email is required.';
    if (!propertyType) tempErrors.propertyType = 'Property type is required.';

    const bedNum = Number(bedrooms);
    if (!Number.isInteger(bedNum) || bedNum <= 0) {
      tempErrors.bedrooms = 'Number of bedrooms must be greater than 0.';
    }

    const rentNum = Number(monthlyRent);
    const incNum = Number(monthlyIncome);
    if (monthlyIncome === '' || isNaN(incNum) || incNum <= 0) {
      tempErrors.monthlyIncome = 'Monthly income must be greater than 0.';
    } else if (!isNaN(rentNum) && rentNum > 0 && incNum < rentNum * 3) {
      // Challenge Business Rule
      tempErrors.monthlyIncome = `Monthly Income must be at least 3 times the monthly rent ($${rentNum * 3}).`;
    }

    if (!location.trim()) tempErrors.location = 'Preferred location is required.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(moveInDate)) tempErrors.moveInDate = 'Enter move-in date (YYYY-MM-DD).';
    if (!employmentStatus) tempErrors.employmentStatus = 'Employment status is required.';
    if (additionalInfo.length > 250) tempErrors.additionalInfo = 'Maximum 250 characters allowed.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(false);
    if (validate()) setSubmitted(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Property Rental Application Form</Text>

      <TextInput style={styles.input} placeholder="Applicant Name" value={applicantName} onChangeText={setApplicantName} />
      {errors.applicantName && <Text style={styles.error}>{errors.applicantName}</Text>}

      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>Property Type:</Text>
      <View style={styles.row}>
        {['Apartment', 'House', 'Studio'].map((type) => (
          <TouchableOpacity key={type} style={[styles.chip, propertyType === type && styles.chipSelected]} onPress={() => setPropertyType(type)}>
            <Text style={propertyType === type ? styles.chipTextSelected : styles.chipText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.propertyType && <Text style={styles.error}>{errors.propertyType}</Text>}

      <TextInput style={styles.input} placeholder="Number of Bedrooms" keyboardType="numeric" value={bedrooms} onChangeText={setBedrooms} />
      {errors.bedrooms && <Text style={styles.error}>{errors.bedrooms}</Text>}

      <TextInput style={styles.input} placeholder="Property Monthly Rent ($)" keyboardType="numeric" value={monthlyRent} onChangeText={setMonthlyRent} />

      <TextInput style={styles.input} placeholder="Your Monthly Income ($)" keyboardType="numeric" value={monthlyIncome} onChangeText={setMonthlyIncome} />
      {errors.monthlyIncome && <Text style={styles.error}>{errors.monthlyIncome}</Text>}

      <TextInput style={styles.input} placeholder="Preferred Location" value={location} onChangeText={setLocation} />
      {errors.location && <Text style={styles.error}>{errors.location}</Text>}

      <TextInput style={styles.input} placeholder="Move-in Date (YYYY-MM-DD)" value={moveInDate} onChangeText={setMoveInDate} />
      {errors.moveInDate && <Text style={styles.error}>{errors.moveInDate}</Text>}

      <Text style={styles.label}>Employment Status:</Text>
      <View style={styles.row}>
        {['Employed', 'Self-Employed', 'Student'].map((status) => (
          <TouchableOpacity key={status} style={[styles.chip, employmentStatus === status && styles.chipSelected]} onPress={() => setEmploymentStatus(status)}>
            <Text style={employmentStatus === status ? styles.chipTextSelected : styles.chipText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.employmentStatus && <Text style={styles.error}>{errors.employmentStatus}</Text>}

      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        maxLength={250}
        placeholder="Additional Information (Optional, max 250 chars)"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />
      {errors.additionalInfo && <Text style={styles.error}>{errors.additionalInfo}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Rental Application</Text>
      </TouchableOpacity>

      {submitted && <Text style={styles.success}>Rental application approved and submitted!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#2e7d32' },
  chipSelected: { backgroundColor: '#2e7d32' },
  chipText: { color: '#2e7d32' },
  chipTextSelected: { color: '#fff' },
  button: { backgroundColor: '#2e7d32', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  success:  { color: 'green', fontWeight: 'bold', marginTop: 15, textAlign: 'center' }
});