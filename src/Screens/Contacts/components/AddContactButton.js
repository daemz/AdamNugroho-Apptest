import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

const AddContactButton = ({ showSnackbar, onCloseSnackBar, onRefreshConnection }) => {
  return (
    <Modal
      style={{
        // height: moderateScale(20),
        marginHorizontal: 16, 
        // marginHorizontal: 0, 
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      isVisible={showSnackbar}
      backdropColor={'transparent'}
      // backdropColor={'green'}
      onBackdropPress={() => onCloseSnackBar && onCloseSnackBar()}
      useNativeDriver
      hideModalContentWhileAnimating>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#E1400D',
          borderRadius: 4,
        }}>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: "#fff",
              textAlign: 'left'
            }}
          >
            Ups, sepertinya aksesmu ke internet terputus.
            <TouchableOpacity onPress={() => onRefreshConnection && onRefreshConnection()}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: "#fff",
                  textDecorationLine: "underline"
                }}
              >
                klik untuk memuat ulang
              </Text>
            </TouchableOpacity>
          </Text>
        <View style={{ marginTop: 16, alignItems: 'flex-end' }}>
          <TouchableOpacity
            // hitSlop={{ left: 20, right: 20, top: 10, bottom: 20 }}
            onPress={() => onCloseSnackBar && onCloseSnackBar()}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: moderateScale(14),
                color: "#fff"
              }}
            >
              Tutup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddContactButton;
