import React from 'react';
import { 
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { GlobalStyle, HeaderStyle, HeaderWithBackButtonStyle, SearchBarStyle } from '../../components/GlobalStyle';

const headerText = "Your Contacts"

const Header = ({
  props,
  onRefreshPressed
}) => {
  console.log("[Header] props: ", props);
  return(
    <View style={HeaderStyle.container}>
      <Text style={[HeaderStyle.text, {fontWeight: 'bold', fontSize: moderateScale(20), flex: 1}]}>
        {headerText}
      </Text>
      <TouchableOpacity onPress={() => onRefreshPressed && onRefreshPressed()}>
        <IonIcons 
          name={"refresh"}
          color={"#C9CCD5"}
          size={25}
          style={{
            marginRight: moderateScale(6)
          }}
        />
      </TouchableOpacity>
      <AntDesign 
        name={"contacts"}
        color={"#C9CCD5"}
        size={25}
      />
    </View>
  )
};

const TabController = ({selected = "all", onPress = () => null}) => {
  return (
    <View style={[HeaderStyle.container, {alignItems: 'center', justifyContent: "space-evenly"}]}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <View style={selected == "all" ? HeaderStyle.tabContainerActive : HeaderStyle.tabContainerInactive}>
          <Text style={[HeaderStyle.text, {fontSize: moderateScale(12)}]}>
            All
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("missed")}>
        <View style={selected == "missed" ? HeaderStyle.tabContainerActive : HeaderStyle.tabContainerInactive}>
          <Text style={[HeaderStyle.text, {fontSize: moderateScale(12)}]}>
            Missed
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const SearchBar = ({
  value = "",
  onChangeText
}) => {
  return(
    <View style={SearchBarStyle.container}>
      <IonIcons 
        name={"md-search-outline"}
        color={"#C9CCD5"}
        size={20}
        style={{
          marginRight: moderateScale(4)
        }}
      />
      <TextInput 
        placeholder={"Search"}
        value={value}
        placeholderTextColor={"#C9CCD5"}
        onChangeText={(text) => onChangeText(text)}
        style={{
          color: "#fff"
        }}
      />
    </View>
  )
}

const HeaderWithBackButton = ({
  headerTitle = null,
  onBackButtonPress,
  onEditButtonPress
}) => {
  return(
    <View style={HeaderStyle.container}>
      {/* <View style={HeaderWithBackButtonStyle.buttonBorder}> */}
        <TouchableOpacity onPress={() => onBackButtonPress && onBackButtonPress()}>
          <IonIcons 
            name="ios-chevron-back-outline"
            color={"#C9CCD5"}
            size={moderateScale(25)}
          />
        </TouchableOpacity>
      {/* </View> */}
      {
        headerTitle === null ?
          <View style={{flex: 1}}/>
        :
          <View style={{
            flex: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={[GlobalStyle.text, {fontWeight: "bold"}]}>
              {headerTitle}
            </Text>
          </View>
      }
      {
        headerTitle !== null &&
          <View style={{
            flex: 1,
          }}/>
      }
    </View>
  )
}

export {
  Header,
  TabController,
  SearchBar,
  HeaderWithBackButton
}
