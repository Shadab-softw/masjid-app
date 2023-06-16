/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import CONSTANT from "../constants";

const HijriDate = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [hijriDate, setHijriDate] = useState("");
  const [hijriMonth, setHijriMonth] = useState("");
  const [hijriYear, setHijriYear] = useState("");

  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (month < 10) month = "0" + month;

  const formattedToday = dd + "-" + month + "-" + year;

  const getHijriDate = async () => {
    try {
      const response = await fetch(
        `http://api.aladhan.com/v1/gToH/${formattedToday}`
      );
      const json = await response.json();
      setData(json.data);
      setHijriDate(json.data.hijri.day);
      setHijriMonth(json.data.hijri.month.en);
      setHijriYear(json.data.hijri.year);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHijriDate();
  }, [data]);

  return (
    <View style={styles.box}>
      <View style={styles.today}>
        <View
          style={{
            width: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={CONSTANT.App.screenImages.moon}
            style={{ width: 22, height: 22 }}
          />
          <Text
            style={{
              fontSize: 16,
              // fontWeight: '500',
              lineHeight: 19,
              color: "#A7C829",
              alignSelf: "stretch",
            }}
          >
            Today
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="small" color="#A7C829" />
        ) : (
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginTop: 4 }}>
            {hijriDate + " " + hijriMonth + "," + hijriYear + " Hijri"}
          </Text>
        )}
      </View>
      <View>
        <Image
          source={CONSTANT.App.screenImages.star}
          style={{
            height: 60,
            width: 39,
            marginRight: 38,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  today: {
    padding: 13,
  },
  horizoLine: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#9D9D9D",
    marginTop: 10,
  },
  styleIcon: {
    width: 80,
    height: 80,
  },
  showAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  paginText: {
    color: "#888",
  },
  textActive: {
    color: "#FFFFFF",
  },
  text: {
    // fontWeight: '600',
    fontSize: 20,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 24,
    // fontStyle: 'normal',
  },
  calender: {
    width: "100%",
    height: 400,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 10,
  },
  verseCard: {
    width: "100%",
    height: "auto",
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 10,
  },
  qibla: {
    width: "100%",
    height: 360,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    // paddingTop: 20,
    borderRadius: 10,
  },
  calanderText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  rowData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  ribbon: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 10,
    borderRadius: 10,
  },
  paypal: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HijriDate;
