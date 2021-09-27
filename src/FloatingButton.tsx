import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  ActivityIndicator,
  Modal,
  Alert,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Web from "./Web";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface Props {
  iconSize?: number;
  buttonSize?: number;
  iconBackgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonIconColor?: string;
  instagram?: boolean;
  twitter?: boolean;
  facebook?: boolean;
  linkedin?: boolean;
  friction?: number;
  webHeight?: number;
}

const FloatingButton = ({
  iconSize,
  iconBackgroundColor,
  buttonSize,
  buttonBackgroundColor,
  buttonIconColor,
  instagram = true,
  twitter = true,
  facebook = true,
  linkedin = true,
  webHeight,
  friction,
}: Props) => {
  const [all, setAll] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const twitterModal = useRef<Modalize>(null);
  const facebookModal = useRef<Modalize>(null);
  const linkedinModal = useRef<Modalize>(null);
  const instagramModal = useRef<Modalize>(null);

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: friction ? friction : 5,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const animatedStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "270deg"],
        }),
      },
    ],
  };

  const onTwitterPress = () => {
    twitterModal.current?.open();
  };

  const onFacebookPress = () => {
    facebookModal.current?.open();
  };

  const onInstagramPress = () => {
    instagramModal.current?.open();
  };

  const onLinkedinPress = () => {
    linkedinModal.current?.open();
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          {all && (
            <Animated.View style={[styles.iconsContainer, animatedStyle]}>
              {linkedin && (
                <Pressable
                  onPress={onLinkedinPress}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: iconBackgroundColor
                        ? iconBackgroundColor
                        : "#ffffff",
                    },
                  ]}
                >
                  <Icon
                    name="linkedin-square"
                    size={iconSize ? iconSize : 25}
                    color="#0e76a8"
                  />
                </Pressable>
              )}
              {facebook && (
                <Pressable
                  onPress={onFacebookPress}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: iconBackgroundColor
                        ? iconBackgroundColor
                        : "#ffffff",
                    },
                  ]}
                >
                  <Icon
                    name="facebook-square"
                    size={iconSize ? iconSize : 25}
                    color="#4267B2"
                  />
                </Pressable>
              )}
              {instagram && (
                <Pressable
                  onPress={onInstagramPress}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: iconBackgroundColor
                        ? iconBackgroundColor
                        : "#ffffff",
                    },
                  ]}
                >
                  <Icon
                    name="instagram"
                    size={iconSize ? iconSize : 25}
                    color="#8a3ab9"
                  />
                </Pressable>
              )}

              {twitter && (
                <Pressable
                  onPress={onTwitterPress}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: iconBackgroundColor
                        ? iconBackgroundColor
                        : "#ffffff",
                    },
                  ]}
                >
                  <Icon
                    name="twitter"
                    size={iconSize ? iconSize : 25}
                    color="#1DA1F2"
                  />
                </Pressable>
              )}
            </Animated.View>
          )}

          <Animated.View
            style={[
              styles.mainButtonContainer,
              rotation,
              {
                backgroundColor: buttonBackgroundColor
                  ? buttonBackgroundColor
                  : "#4000ff",
              },
            ]}
          >
            <Pressable onPress={toggleMenu}>
              <Icon
                name="share-alt"
                size={buttonSize ? buttonSize : 35}
                color={buttonIconColor ? buttonIconColor : "#ffffff"}
              />
            </Pressable>
          </Animated.View>
        </View>

        <Modalize
          ref={twitterModal}
          modalHeight={hp(webHeight ? webHeight : 90)}
        >
          <Web
            url="https://twitter.com"
            close={() => twitterModal.current?.close()}
          />
        </Modalize>

        <Modalize
          ref={facebookModal}
          modalHeight={hp(webHeight ? webHeight : 90)}
        >
          <Web
            url="https://facebook.com"
            close={() => facebookModal.current?.close()}
          />
        </Modalize>

        <Modalize
          ref={instagramModal}
          modalHeight={hp(webHeight ? webHeight : 90)}
        >
          <Web
            url="https://instagram.com"
            close={() => instagramModal.current?.close()}
          />
        </Modalize>

        <Modalize
          ref={linkedinModal}
          modalHeight={hp(webHeight ? webHeight : 90)}
        >
          <Web
            url="https://linkedin.com"
            close={() => linkedinModal.current?.close()}
          />
        </Modalize>
      </GestureHandlerRootView>
    </>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    left: 30,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 5,
    borderRadius: 100,
  },
  mainButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 5,
  },

  iconsContainer: {
    justifyContent: "space-evenly",
  },
});

/* 
<Pressable onPress={() => modalizeRef.current?.open()}>
  <Text> open web </Text>
</Pressable> */

/*  <Modalize ref={modalizeRef} modalHeight={hp(webHeight ? webHeight : 90)}>
   <Web />
 </Modalize> */
