import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View, Text, TouchableOpacity,
  ScrollView, StyleSheet
} from "react-native";
import { useEffect, useState } from "react";
import socket from "../../socket";

export default function Detail() {
  const { data, bookedDate, bookedTime } = useLocalSearchParams();
  const expert = JSON.parse(data);

  const [state, setState] = useState(expert);
  const router = useRouter();

  useEffect(() => {
    socket.emit("join_expert", expert._id);

    socket.off("slotBooked"); // ✅ clear old listeners

    socket.on("slotBooked", ({ date, time }) => {
      setState(prev => ({
        ...prev,
        slots: prev.slots.map(s =>
          s.date === date && s.time === time
            ? { ...s, isBooked: true }
            : s
        )
      }));
    });

    return () => socket.off("slotBooked");
  }, []);

  useEffect(() => {
  if (bookedDate && bookedTime) {
    setState(prev => ({
      ...prev,
      slots: prev.slots.map(s =>
        s.date === bookedDate && s.time === bookedTime
          ? { ...s, isBooked: true }
          : s
      )
    }));
  }
}, [bookedDate, bookedTime]);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.name}>{state.name}</Text>
        <Text style={styles.meta}>{state.category}</Text>
        <Text style={styles.meta}>{state.experience} yrs experience</Text>
      </View>

      <Text style={styles.section}>Available Slots</Text>

      {state.slots.map((s, i) => (
        <View key={i} style={styles.slotCard}>
          <Text style={styles.slotText}>
            {s.date} • {s.time}
          </Text>

          <TouchableOpacity
            disabled={s.isBooked}
            style={[
              styles.slotBtn,
              s.isBooked && styles.disabledBtn
            ]}
            onPress={() =>
              router.push({
                pathname: "/booking",
                params: {
                  expertId: state._id,
                  slot: JSON.stringify(s)
                }
              })
            }
          >
            <Text style={styles.slotBtnText}>
              {s.isBooked ? "Booked" : "Book"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  name: { fontSize: 20, fontWeight: "bold" },
  meta: { color: "#555", marginTop: 4 },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },

  slotCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  slotText: { fontSize: 14 },

  slotBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  disabledBtn: {
    backgroundColor: "#aaa",
  },

  slotBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

