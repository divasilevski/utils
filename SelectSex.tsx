import * as React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../UI/Button";
import CustomRadio from "../UI/Radio";
import CustomText from "../UI/Text";

type Sex = "women" | "man" | null;
type SelectSexProps = {
  onSelect: (sex: Sex) => void;
};

export default function SelectSex({ onSelect }: SelectSexProps) {
  const [sex, setSex] = React.useState(null as Sex);

  const onPressRadio = (sex: Sex) => () => setSex(sex);
  const onPressButton = () => onSelect(sex);

  return (
    <View style={styles.container}>
      <CustomText type="h1" style={styles.text}>
        Укажите ваш пол для более точных рекомедаций
      </CustomText>
      <View style={styles.radios}>
        <CustomRadio
          style={styles.radio}
          checked={sex === "women"}
          onPress={onPressRadio("women")}
        >
          Женщина 👩
        </CustomRadio>
        <CustomRadio checked={sex === "man"} onPress={onPressRadio("man")}>
          Мужчина 👨
        </CustomRadio>
      </View>
      <View style={styles.control}>
        <CustomButton
          onPress={onPressButton}
          style={styles.button}
          disabled={sex === null}
          title="Применить"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingBottom: 24,
    backgroundColor: Colors.background,

    elevation: 9,
    shadowColor: "#000000",
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  text: {
    width: 250,
  },
  radios: {
    flexDirection: "row",
    marginTop: 24,
  },
  radio: {
    marginRight: 24,
  },
  control: {
    marginTop: 32,
    alignItems: "flex-end",
  },
  button: {
    width: 177,
  },
});
