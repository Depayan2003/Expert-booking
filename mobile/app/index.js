import { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, StyleSheet
} from "react-native";
import API from "../api";
import { useRouter } from "expo-router";

export default function Home() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter();

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const res = await API.get("/experts");
      setExperts(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = experts.filter(e =>
    (category === "All" || e.category === category) &&
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [filtered]);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const categories = ["All", ...new Set(experts.map(e => e.category))];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>Expert Booking System</Text>

      {/* 🔍 Search */}
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setPage(1);
        }}
        style={styles.input}
      />

      {/* 🏷 Category (FIXED SCROLL) */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.categoryContainer}        
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                category === cat && styles.activeCategory
              ]}
              onPress={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.activeCategoryText
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 📂 My Bookings */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/my-bookings")}
      >
        <Text style={styles.buttonText}>My Bookings</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}

      {!loading && filtered.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No experts found
        </Text>
      )}

      {/* 📜 List */}
      <View>
        {paginated.map(e => (
          <TouchableOpacity
            key={e._id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/expert/[id]",
                params: { id: e._id, data: JSON.stringify(e) }
              })
            }
          >
            <Text style={styles.name}>{e.name}</Text>
            <Text>{e.category}</Text>
            <Text>{e.experience} yrs exp</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📄 Pagination */}
      {filtered.length > itemsPerPage && (
        <View style={styles.pagination}>

          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setPage(prev => prev - 1)}
            style={[
              styles.pageBtn,
              page === 1 && styles.disabledBtn
            ]}
          >
            <Text>Prev</Text>
          </TouchableOpacity>

          <Text style={styles.pageText}>
            Page {page} / {totalPages}
          </Text>

          <TouchableOpacity
            disabled={page === totalPages}
            onPress={() => setPage(prev => prev + 1)}
            style={[
              styles.pageBtn,
              page === totalPages && styles.disabledBtn
            ]}
          >
            <Text>Next</Text>
          </TouchableOpacity>

        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  // ✅ FIXED CATEGORY SCROLL
  categoryWrapper: {
    marginBottom: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },

  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
  },

  activeCategory: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  categoryText: {
    fontSize: 14,
    color: "#333",
  },

  activeCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  pageBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  pageText: {
    fontSize: 14,
    fontWeight: "500",
  },

  disabledBtn: {
    opacity: 0.5,
  },
});