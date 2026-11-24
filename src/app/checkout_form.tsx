import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Exercise6Checkout() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [errors, setErrors] = useState({});
  const [orderSummary, setOrderSummary] = useState(null);

  const validate = () => {
    let tempErrors = {};
    if (!customerName.trim()) tempErrors.customerName = 'Customer name is required.';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) tempErrors.email = 'Valid email is required.';
    if (!address.trim()) tempErrors.address = 'Delivery address is required.';
    if (!city.trim()) tempErrors.city = 'City is required.';

    // Challenge Rule: Integer greater than 0
    const qtyNum = Number(quantity);
    if (!Number.isInteger(qtyNum) || qtyNum <= 0) {
      tempErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!paymentMethod) tempErrors.paymentMethod = 'Select a payment method.';
    if (!deliveryOption) tempErrors.deliveryOption = 'Select a delivery option.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckout = () => {
    setOrderSummary(null);
    if (validate()) {
      setOrderSummary({
        customerName,
        address: `${address}, ${city}`,
        quantity: Number(quantity),
        total: (Number(quantity) * 29.99).toFixed(2),
        paymentMethod,
        deliveryOption,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>E-Commerce Checkout</Text>

      <TextInput style={styles.input} placeholder="Customer Name" value={customerName} onChangeText={setCustomerName} />
      {errors.customerName && <Text style={styles.error}>{errors.customerName}</Text>}

      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput style={styles.input} placeholder="Delivery Address" value={address} onChangeText={setAddress} />
      {errors.address && <Text style={styles.error}>{errors.address}</Text>}

      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      {errors.city && <Text style={styles.error}>{errors.city}</Text>}

      <TextInput style={styles.input} placeholder="Product Quantity" keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
      {errors.quantity && <Text style={styles.error}>{errors.quantity}</Text>}

      <Text style={styles.label}>Payment Method:</Text>
      <View style={styles.row}>
        {['Credit Card', 'Mobile Money', 'Cash on Delivery'].map((pm) => (
          <TouchableOpacity key={pm} style={[styles.chip, paymentMethod === pm && styles.chipSelected]} onPress={() => setPaymentMethod(pm)}>
            <Text style={paymentMethod === pm ? styles.chipTextSelected : styles.chipText}>{pm}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.paymentMethod && <Text style={styles.error}>{errors.paymentMethod}</Text>}

      <Text style={styles.label}>Delivery Option:</Text>
      <View style={styles.row}>
        {['Standard (3-5 Days)', 'Express (Next Day)'].map((opt) => (
          <TouchableOpacity key={opt} style={[styles.chip, deliveryOption === opt && styles.chipSelected]} onPress={() => setDeliveryOption(opt)}>
            <Text style={deliveryOption === opt ? styles.chipTextSelected : styles.chipText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.deliveryOption && <Text style={styles.error}>{errors.deliveryOption}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      {orderSummary && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <Text>Customer: {orderSummary.customerName}</Text>
          <Text>Deliver to: {orderSummary.address}</Text>
          <Text>Quantity: {orderSummary.quantity} item(s)</Text>
          <Text>Payment: {orderSummary.paymentMethod}</Text>
          <Text>Delivery: {orderSummary.deliveryOption}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 6 }}>Total: ${orderSummary.total}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#e65100' },
  chipSelected: { backgroundColor: '#e65100' },
  chipText: { color: '#e65100' },
  chipTextSelected: { color: '#fff' },
  button: { backgroundColor: '#e65100', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  summaryBox: { marginTop: 20, padding: 15, backgroundColor: '#fff3e0', borderRadius: 8, borderWidth: 1, borderColor: '#ffb74d' },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 }
});