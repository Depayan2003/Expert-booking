import { View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import API from "../api";

export default function MyBookings() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await API.get(`/bookings?email=${email}`);
    setData(res.data);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Bookings</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={fetch}>
        <Text style={styles.buttonText}>Fetch Bookings</Text>
      </TouchableOpacity>

      <ScrollView>
        {data.map(b => (
          <View key={b._id} style={styles.card}>
            <Text style={styles.bold}>{b.date} • {b.time}</Text>
            <Text>{b.name}</Text>
            <Text style={styles.status}>{b.status}</Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff"
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600"
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },

  bold: { fontWeight: "bold" },

  status: {
    marginTop: 4,
    color: "#2563eb",
    fontWeight: "600"
  }
});