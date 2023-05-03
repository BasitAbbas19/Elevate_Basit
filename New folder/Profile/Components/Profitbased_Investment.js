import react, { useState, useEffect, useContext } from "react";
import { Alert, Keyboard } from "react-native";

import { View, Text, Button, TextInput } from "react-native";
import AppContext from "./AppContext";
import axios from "axios";
import { Platform } from "react-native";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
function Profitbased_Investment() {
  const stripe = useStripe();
  const [amount, setamount] = useState("");
  const [percent, setpercent] = useState();
  const [text, settext] = useState(true);
  const [errprompt, seterrprompt] = useState({});
  function checkcredentials(e1) {
    let errors = {};
    if (e1 === "") {
      errors.amount = "Investment amount is required";
      settext(false);
    }
    return errors;
  }

  // const save = () => {
  //   let temp = amount * 0.3;
  //   settext(true);
  //   seterrprompt(checkcredentials(amount));
  //   Keyboard.dismiss();
  //   if (Object.keys(checkcredentials(amount)).length === 0) {
  //     alert("Your profit is:- " + temp + " rupees");
  //     //   edit();
  //   }
  // };

  const pay = async () => {
    try {
      if (amount < 1) return Alert.alert("You cannot donate below 1 INR");
      //sending request
      const response = await fetch("http://192.168.1.36:3080/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount, name: "Ali" }),
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      await axios
        .post(`http://192.168.1.36:3080/Campaign/profit_investment`, {
          profit_amount: amount,
          cid: 5,
          investor_id: 3,
        })
        .then(function (response) {
          console.log(response.data);
          Alert.alert("Payment Complete,thankyou");
        })
        .catch(function (error) {
          console.log(error.msg);
        });
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong,try again later");
    }
  };
  const getpercent = async () => {
    await axios
      .get(`http://192.168.1.36:3080/Campaign/profit/5`)
      .then(function (response) {
        let temp = response.data.campaign_profit_percentage;
        setpercent(temp);
      })
      .catch(function (error) {
        console.log(error.msg);
      });
  };

  useEffect(() => {
    getpercent();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51MyMrzEBgz1Gk70hQ56CokGaRKkUYDWhV16OJlzsIYKxfdPgzEZBQ7FnQlClbQmRecpMBPXCR06bKjif93OfyyPd00cwV5DZYt">
      <Text
        style={{
          marginTop: "3%",
          fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          marginHorizontal: "5%",
          fontSize: 17,
          color: "#808080",
          textAlign: "center",
        }}
      >
        The Profit will be {percent}% of the invested amount
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "7%",
        }}
      >
        <Text style={{ marginLeft: "3%", fontSize: 17 }}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={(element) => {
            setamount(element);
          }}
          placeholder="Enter your investment amount"
          keyboardType="number-pad"
          style={{
            marginLeft: "6%",
            backgroundColor: "#ffffff",
            width: "80%",
            height: 40,
            borderBottomWidth: 1,
            borderColor: "#dcdcdc",
          }}
        />
      </View>
      <View style={{ marginLeft: "23%", marginTop: "1%" }}>
        <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
          {errprompt.amount}
        </Text>
      </View>
      {Platform.OS === "ios" ? (
        <View style={{ marginTop: "7%" }}>
          <Button title="Submit" color={"#D6252E"} onPress={pay}></Button>
        </View>
      ) : (
        <View style={{ width: "20%", alignSelf: "center" }}>
          <Button title="Submit" color={"#D6252E"} onPress={pay}></Button>
        </View>
      )}
    </StripeProvider>
  );
}
export default Profitbased_Investment;
