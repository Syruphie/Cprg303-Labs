import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import vacationDestinations, {
  VacationDestination,
} from "../../lib/vacationsDestinations";

// Interface for Wikipedia API response
interface WikipediaResponse {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

const Lab4: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(
    null
  );
  const [wikipediaData, setWikipediaData] = useState<WikipediaResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWikipediaData = async (city: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          city
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Wikipedia data");
      }

      const data: WikipediaResponse = await response.json();
      setWikipediaData(data);
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
      Alert.alert("Error", "Failed to load city information");
      setWikipediaData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationPress = (destination: VacationDestination) => {
    if (selectedDestination === destination.id) {
      // If clicking the same destination, close it
      setSelectedDestination(null);
      setWikipediaData(null);
    } else {
      // Open new destination and fetch Wikipedia data
      setSelectedDestination(destination.id);
      fetchWikipediaData(destination.location);
    }
  };

  const renderDestination = (destination: VacationDestination) => {
    const isSelected = selectedDestination === destination.id;

    return (
      <View key={destination.id} style={styles.destinationContainer}>
        <TouchableOpacity
          style={[
            styles.destinationHeader,
            isSelected && styles.selectedHeader,
          ]}
          onPress={() => handleDestinationPress(destination)}
        >
          <Text style={styles.locationText}>{destination.location}</Text>
          <Text style={styles.chevron}>{isSelected ? "▼" : "▶"}</Text>
        </TouchableOpacity>

        {isSelected && (
          <View style={styles.detailsContainer}>
            <View style={styles.basicDetails}>
              <Text style={styles.detailText}>Price: ${destination.price}</Text>
              <Text style={styles.detailText}>
                Average Temperature: {destination.average_yearly_temperature}
              </Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>
                  Loading city information...
                </Text>
              </View>
            ) : wikipediaData ? (
              <View style={styles.wikipediaContainer}>
                {wikipediaData.thumbnail && (
                  <Image
                    source={{ uri: wikipediaData.thumbnail.source }}
                    style={styles.cityImage}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.wikipediaTitle}>{wikipediaData.title}</Text>
                <Text style={styles.wikipediaExtract}>
                  {wikipediaData.extract}
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vacation Destinations</Text>
      <Text style={styles.subtitle}>Tap on a destination to see details</Text>

      {vacationDestinations.map(renderDestination)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  destinationContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  destinationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  selectedHeader: {
    backgroundColor: "#e3f2fd",
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  chevron: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 16,
  },
  basicDetails: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  wikipediaContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
  },
  cityImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  wikipediaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  wikipediaExtract: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    textAlign: "justify",
  },
});

export default Lab4;
