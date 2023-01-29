import React, { Fragment } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexChild, flexRow, sw16 } from "../../styles";
import { RoundedButton } from "../Touchables/RoundedButton";
import { CustomSpacer } from "./Spacer";

export interface ActionButtonsProps {
  buttonContainerStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
  cancelDisabled?: boolean;
  cancelTextStyle?: TextStyle;
  continueButtonStyle?: ViewStyle;
  continueDebounce?: boolean;
  continueDisabled?: boolean;
  continueLoading?: boolean;
  continueTextStyle?: TextStyle;
  handleCancel?: () => void;
  handleContinue?: () => void;
  labelCancel?: string;
  labelContinue?: string;
}

export const ActionButtons = ({
  buttonContainerStyle,
  cancelButtonStyle,
  cancelDisabled,
  cancelTextStyle,
  continueButtonStyle,
  continueDebounce,
  continueDisabled,
  continueLoading,
  continueTextStyle,
  handleCancel,
  handleContinue,
  labelCancel,
  labelContinue,
}: ActionButtonsProps) => {
  const buttonCancel = labelCancel !== undefined ? labelCancel : "Cancel";
  const buttonContinue = labelContinue !== undefined ? labelContinue : "Continue";

  return (
    <View style={{ ...flexRow, ...flexChild, ...buttonContainerStyle }}>
      {handleCancel !== undefined ? (
        <Fragment>
          <RoundedButton
            buttonStyle={cancelButtonStyle}
            disabled={cancelDisabled}
            onPress={handleCancel}
            secondary={true}
            text={buttonCancel}
            textStyle={cancelTextStyle}
          />
          <CustomSpacer isHorizontal={true} space={sw16} />
        </Fragment>
      ) : null}
      {handleContinue !== undefined ? (
        <RoundedButton
          buttonStyle={continueButtonStyle}
          loading={continueLoading}
          withDebounce={continueDebounce !== undefined ? continueDebounce : true}
          disabled={continueDisabled}
          onPress={handleContinue}
          text={buttonContinue}
          textStyle={continueTextStyle}
        />
      ) : null}
    </View>
  );
};
