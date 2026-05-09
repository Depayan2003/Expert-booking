import { useLocalSearchParams, useRouter } from "expo-router";

import {
  View, TextInput, Text,
  TouchableOpacity, StyleSheet,
  ActivityIndicator
} from "react-native";
import { useState } from "react";
import API from "../api";

export default function Booking() {
  const { expertId, slot } = useLocalSearchParams();
  const s = JSON.parse(slot);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const book = async () => {
    const { name, email, phone, notes } = form;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setMessage("⚠️ Name, Email and Phone are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await API.post("/bookings", {
        name,
        email,
        phone,
        notes,
        expertId,
        date: s.date,
        time: s.time
      });

      // ✅ Success UI feedback
      setMessage("✅ Booking Successful!");

      setTimeout(() => {
        router.replace("/");
      }, 1500);

      // 🧹 Clear form
      setForm({
        name: "",
        email: "",
        phone: "",
        notes: ""
      });

    } catch (err) {
      console.log(err?.response?.data || err.message);

      setMessage(
        err?.response?.data?.message ||
        "❌ Booking failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Book Slot</Text>

      <Text style={styles.slot}>
        {s.date} • {s.time}
      </Text>

      {/* 🔔 MESSAGE */}
      {message !== "" && (
        <Text style={styles.message}>{message}</Text>
      )}

      <TextInput
        placeholder="Name *"
        value={form.name}
        style={styles.input}
        onChangeText={t => setForm({ ...form, name: t })}
      />

      <TextInput
        placeholder="Email *"
        value={form.email}
        style={styles.input}
        onChangeText={t => setForm({ ...form, email: t })}
      />

      <TextInput
        placeholder="Phone *"
        value={form.phone}
        style={styles.input}
        onChangeText={t => setForm({ ...form, phone: t })}
      />

      <TextInput
        placeholder="Notes (optional)"
        value={form.notes}
        style={[styles.input, { height: 80 }]}
        multiline
        onChangeText={t => setForm({ ...form, notes: t })}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading && { opacity: 0.6 }
        ]}
        onPress={book}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Confirm Booking</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },

  slot: {
    marginBottom: 15,
    fontWeight: "600",
    color: "#555"
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff"
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600"
  },

  message: {
    marginBottom: 10,
    fontWeight: "600",
    color: "#333"
  },
});