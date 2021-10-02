import React, {useState, useEffect, useReducer} from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';

import { ContactCardStyle, GlobalStyle, HeaderStyle } from '../../components/GlobalStyle';
import { UIInput } from '../../components/UIInput';
import { editContact, getContactDetail } from '../../Utils/ServiceUtils';
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
  const initialLetterName = data.firstName.charAt(0)
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
        enableImage == true ? (
          <Image 
            source={{uri: data.photo}}
            style={[GlobalStyle.roundedImage, {width: moderateScale(110), height: moderateScale(110)}]}
            onError={(err) => {
              setEnableImage && setEnableImage(false)
            }}
          />
        ) : (
          <View style={[ContactCardStyle.initialLetterNameStyle, {width: moderateScale(70), height: moderateScale(70)}]}> 
            <Text style={{color: "#C9CCD5", fontWeight: 'bold', fontSize: moderateScale(20)}}>
              {initialLetterName}
            </Text>
          </View>
        )
      }

      <UIInput 
        label="First Name"
        value={firstName}
        onTextChange={(text) => handleTextChange && handleTextChange("firstName", text)}
      />
      <UIInput 
        label="Last Name"
        value={lastName}
        onTextChange={(text) => handleTextChange && handleTextChange("lastName", text)}
      />
      <UIInput 
        label="Age"
        value={age}
        onTextChange={(text) => handleTextChange && handleTextChange("age", text)}
      />

      {/* <View style={{marginTop: moderateScale(16)}}>
        <Text style={[GlobalStyle.text, {fontWeight: 'bold'}]}>
          {`${contactData.firstName} ${contactData.lastName}`}
        </Text>
      </View>
      <View style={{marginTop: moderateScale(16)}}>
        <Text style={[GlobalStyle.text, {fontWeight: 'bold'}]}>
          {`Age: ${contactData.age}`}
        </Text>
      </View> */}
    </View>
  )
}


const ContactEdit = ({ navigation, route }) => {
  const [contactData, setContactData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingEditing, setLoadingEditing] = useState(false)
  const [enableImage, setEnableImage] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  

  const id = route.params.id
  
  useEffect(() => {
    getContactData()
  }, [])

  useEffect(() => {
    // setInitialName(contactData.firstName.charAt(0))
  }, [enableImage])

  const handleTextChange = (type, text) => {
    // switch (type) {
    //   case "firstName":
    //     setFirstName(text)
    //     break;
    //   case "lastName":
    //     setLastName(text)
    //     break;
    //   case "age":
    //     setAge(text)
    //     break;
    //   default:
    //     break;
    // }
    if(type === "firstName"){
      setFirstName(text)
    } else if(type === "lastName") {
      setLastName(text)
    } else if(type === "age") {
      setAge(text)
    }
  }

  const getContactData = () => {
    getContactDetail(id)
      .then(res => {
        console.log("[ContactEdit] getContactData res: ", res);
        setContactData(res.data.data)
        setFirstName(res.data.data.firstName)
        setLastName(res.data.data.lastName)
        setAge(res.data.data.age)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        Toast.show(err.data.message, Toast.SHORT)
      })
  }

  const checkSubmit = () => {
    if (firstName != "" && lastName != "" && age != "") {
      return true
    } else {
      return false
    }
  }

  const submitEdit = () => {
    if(checkSubmit() == true) {
      setLoadingEditing(true)
      editContact({
        id: contactData.id,
        firstName: firstName,
        lastName: lastName,
        age: age,
        photo: "N/A"
      })
        .then(res => {
          setLoadingEditing(false)
          forceUpdate()
          Toast.show(res.data.message, Toast.SHORT)
        })
        .catch(err => {
          Toast.show(`${err}`, Toast.SHORT)
          setLoadingEditing(false)
        })
    } else {
      Toast.show("Please fill in all the form before proceed")
    }
  }

  return (
    <View style={GlobalStyle.container}>
      <HeaderWithBackButton 
        headerTitle={"Edit Contact"}
        onBackButtonPress={() => {navigation.goBack()}}
      />
        {
          isLoading == true ? (
            <View style={{height: "100%"}}> 
              <ActivityIndicator 
                size={"large"}
                color={"#C9CCD5"}
              />
            </View>
          ) : (
            <ScrollView>
              <TopComponent 
                data={contactData}
                enableImage={enableImage}
                setEnableImage={(val) => setEnableImage(val)}
                firstName={firstName}
                lastName={lastName}
                age={age}
                handleTextChange={(type, text) => handleTextChange(type, text)}
              />
            </ScrollView>
          )
        }
        <TouchableOpacity 
          onPress={() => submitEdit()}
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
                  {`Save Changes`}
                </Text>
            }  
          </View>
        </TouchableOpacity>
    </View>
  )
};

export default ContactEdit;
