import { toInteger } from 'lodash';
import React, {useState, useEffect, useReducer} from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { ContactCardStyle, GlobalStyle, HeaderStyle } from '../../components/GlobalStyle';
import { UIInput } from '../../components/UIInput';
import { addNewContact, editContact, getContactDetail } from '../../Utils/ServiceUtils';
import { HeaderWithBackButton } from '../components/Header';
import ContactBottomSheet from './components/ContactBottomSheet';

const TopComponent = ({
  data,
  enableImage = true,
  setEnableImage,
  firstName,
  lastName,
  age,
  handleTextChange
}) => {
  return(
    <View style={{
      width: '100%',
      paddingVertical: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: "center",
      paddingHorizontal: moderateScale(14)
    }}>
      {
        // enableImage == true ? (
        //   <Image 
        //     source={{uri: data.photo}}
        //     style={[GlobalStyle.roundedImage, {width: moderateScale(110), height: moderateScale(110)}]}
        //     onError={(err) => {
        //       setEnableImage && setEnableImage(false)
        //     }}
        //   />
        // ) : (
        //   <View style={ContactCardStyle.initialLetterNameStyle}> 
        //     <Text style={{color: "#C9CCD5", fontWeight: 'bold', fontSize: moderateScale(20)}}>
        //       {initialLetterName}
        //     </Text>
        //   </View>
        // )
      }

      <UIInput 
        label="First Name"
        placeholder="Input First Name"
        value={firstName}
        onTextChange={(text) => handleTextChange && handleTextChange("firstName", text)}
      />
      <UIInput 
        label="Last Name"
        placeholder="Input Last Name"
        value={lastName}
        onTextChange={(text) => handleTextChange && handleTextChange("lastName", text)}
      />
      <UIInput 
        label="Age"
        placeholder="Input Age"
        value={age}
        onTextChange={(text) => handleTextChange && handleTextChange("age", text)}
      />
    </View>
  )
}


const ContactAdd = ({ navigation, route }) => {
  // const [contactData, setContactData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingEditing, setLoadingAdd] = useState(false)
  const [enableImage, setEnableImage] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const { navigate } = useNavigation()
  

  const id = route.params.id
  
  useEffect(() => {
    // getContactData()
  }, [])

  const handleTextChange = (type, text) => {
    if(type === "firstName"){
      setFirstName(text)
    } else if(type === "lastName") {
      setLastName(text)
    } else if(type === "age") {
      setAge(toInteger(text))
    }
  }

  const checkSubmit = () => {
    if (firstName != "" && lastName != "" && age != "") {
      return true
    } else {
      return false
    }
  }

  const submitAdd = () => {
    if (checkSubmit() == true){
      setLoadingAdd(true)
      addNewContact({
        firstName: firstName,
        lastName: lastName,
        age: age,
        // photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmiXxUZbmQ9S_RCQPjD39C6FZB5S3w76A-Q&usqp=CAU" // DEFAULT
        photo: "N/A"
      })
        .then(res => {
          setLoadingAdd(false)
          navigation.goBack()
          Toast.show(res.data.message, Toast.SHORT)
        })
        .catch(err => {
          Toast.show(`Failed to add contact`, Toast.SHORT)
          setLoadingAdd(false)
        })
    } else {
      Toast.show("Please fill in all the form before proceed")
    }
  }

  return (
    <View style={GlobalStyle.container}>
      <HeaderWithBackButton 
        headerTitle={"Add A New Contact"}
        onBackButtonPress={() => {navigation.goBack()}}
      />
        {
          // isLoading == true ? (
          //   <View style={{height: "100%"}}> 
          //     <ActivityIndicator 
          //       size={"large"}
          //       color={"#C9CCD5"}
          //     />
          //   </View>
          // ) : (
            <ScrollView>
              <TopComponent 
                data={{}}
                enableImage={enableImage}
                setEnableImage={(val) => setEnableImage(val)}
                firstName={firstName}
                lastName={lastName}
                age={age}
                handleTextChange={(type, text) => handleTextChange(type, text)}
              />
            </ScrollView>
          // )
        }
        <TouchableOpacity 
          onPress={() => submitAdd()}
          disabled={loadingEditing}
        >
          <View style={{
            backgroundColor: "#3DB2FF", 
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(14),
            marginHorizontal: moderateScale(12),
            marginVertical: moderateScale(16),
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {
              loadingEditing == true ?
                <ActivityIndicator 
                  size={"small"}
                  color={"#C9CCD5"}
                />
              :
                <Text style={GlobalStyle.text}>
                  {`Save Contact`}
                </Text>
            }  
          </View>
        </TouchableOpacity>
    </View>
  )
};

export default ContactAdd;
