import React, {useState, useEffect, useRef, useReducer} from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { useNavigation, CommonActions, useIsFocused } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { deleteContact, getContacts } from '../../Utils/ServiceUtils';
import { saveContact } from '../../Redux/Actions/ContactActions';
import { ContactCardStyle, FloatingButtonStyle, GlobalStyle, HeaderStyle, HeaderWithBackButtonStyle } from '../../components/GlobalStyle';
import {Header, TabController, SearchBar} from '../components/Header';
import ContactCard from './components/ContactCard';
import ContactBottomSheet from './components/ContactBottomSheet';
import { moderateScale } from 'react-native-size-matters';
import AddContactButton from './components/AddContactButton';

const FloatingAddButton = ({
  onPressButton
}) => (
  <View style={FloatingButtonStyle.floatingButton}>
      <TouchableOpacity onPress={() => onPressButton && onPressButton()}>
        <MaterialCommunityIcons 
          name={"account-plus"}
          size={moderateScale(25)}
          color={"#fff"}
        />
      </TouchableOpacity>
    </View>
)

const ContactHome = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContact] = useState(null)
  const [contactSelected, setContactSelected] = useState({})
  const [tabSelected, setTabSelected] = useState("all")
  const [searchText, setSearchText] = useState("")
  const [showFilteredContacts, setShowFilteredContacts] = useState(false)
  const [filteredContacts, setFilteredContacts] = useState([])
  const [enableImage, setEnableImage] = useState(true)
  const [showAddButton, setShowAddButton] = useState(true)

  const bottomSheetRef = useRef(null)

  const [_, forceUpdate] = useReducer((x) => x + 1, 0)

  // to determine if the screen is focused
  const isFocused = useIsFocused()

  const contactRed = useSelector(state => state.ContactReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    getContactsData()
  }, [isFocused])

  useEffect(() => {
    if(searchText === "") {
      setShowFilteredContacts(false)
    } else {
      setShowFilteredContacts(true)
      // filter here
      if(contactRed.contacts.length > 0) {
        setFilteredContacts(contactRed.contacts.filter((item) => {
          return item.firstName.toLowerCase().includes(searchText.toLowerCase()) || item.lastName.toLowerCase().includes(searchText.toLowerCase())
        }))
      }
    }
  }, [searchText])

  const getContactsData = () => {
    getContacts()
      .then(res => {
        // save the result to redux
        dispatch(saveContact(res.data.data))
        setIsLoading(false)
        Toast.show(res.data.message, Toast.SHORT)
      })
      .catch(err => {
        Toast.show(err.data.message, Toast.SHORT)
      })
  }

  const contactDelete = (id) => {
    Alert.alert("Are you sure to delete this contact?", "This action cannot be undone", 
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            deleteContact(id)
            .then(res => {
              Toast.show(res.data.message, Toast.SHORT)
              forceUpdate()
              closeBottomSheet()
            })
            .catch(err => {
              Toast.show("Oops, Contact Unavailable", Toast.SHORT)
            })
          }
        }
      ]
    )
  }

  const BottomSheetContent = ({
    data,
    onDeleteButtonPress,
    onEditButtonPress
  }) => {
    const initialLetterName = data.firstName.charAt(0).toUpperCase()

    return(
      <View>
        <View style={[[HeaderStyle.container, 
          {alignItems: 'center', height: moderateScale(80)}
        ]]}>
          <TouchableOpacity onPress={() => onDeleteButtonPress && onDeleteButtonPress(data.id)}>
            <MaterialCommunityIcons
              name="delete-empty"
              color={"#082032"}
              size={moderateScale(30)}
            />
          </TouchableOpacity>

          <View style={{flex: 1}} />

          <TouchableOpacity onPress={() => onEditButtonPress && onEditButtonPress()}>
            <FontAwesome5
              name="user-edit"
              color={"#082032"}
              size={moderateScale(25)}
            />
          </TouchableOpacity>
          </View>

          <View style={{
            // width: '100%',
            paddingVertical: moderateScale(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {
              enableImage == true ? (
                <Image 
                  source={{uri: data.photo}}
                  style={[GlobalStyle.roundedImage, {width: moderateScale(100), height: moderateScale(100)}]}
                  onError={(err) => {
                    setEnableImage(false)
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
            <View style={{marginTop: moderateScale(16)}}>
              <Text style={[{fontWeight: 'bold', color: "#000"}]}>
                {`${data.firstName} ${data.lastName}`}
              </Text>
            </View>
            <View style={{marginTop: moderateScale(16)}}>
              <Text style={[{fontWeight: 'bold', color: "#000"}]}>
                {`Age: ${data.age}`}
              </Text>
            </View>
          </View>
      </View>
    )
  }

  const navigateTo = ({screenName, params = {}}) => {
    navigation.navigate(screenName, params)
  };

  const openBottomSheet = () => {
    bottomSheetRef.current.setModalVisible(true)
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current.setModalVisible(false)
  }

  const bottomSheetRender = () => (
    <ContactBottomSheet
      actionSheetRef={bottomSheetRef}
      onClose={() => {
        closeBottomSheet()
        setEnableImage(true)
      }}
      isFullScreen={true}
      style={{ height: heightPercentageToDP('40%') }}
    >
      <BottomSheetContent 
        data={contactSelected}
        onDeleteButtonPress={(id) => {
          contactDelete(id)
        }}
        onEditButtonPress={() => {
          navigateTo({
            screenName: "ContactEdit",
            params: {id: contactSelected.id}
          })
          closeBottomSheet()
        }}
      />
    </ContactBottomSheet>
  )

  return(
    <View style={GlobalStyle.container}>
      {/* <TabController 
        selected={tabSelected} 
        onPress={(select) => {
          setTabSelected(select)
        }}
      /> */}
      <Header 
        props={route}
        onRefreshPressed={() => {
          getContactsData()
          forceUpdate()
        }}
      />
      <ScrollView
        onMomentumScrollBegin={(e) => setShowAddButton(false)}
        onMomentumScrollEnd={(e) => setShowAddButton(true)}
        onScrollBeginDrag={(e) => setShowAddButton(false)}
      >
        <SearchBar 
          value={searchText}
          onChangeText={text => {setSearchText(text)}}
        />
        {
          isLoading === true ?
            <ActivityIndicator 
              size={"large"}
              color={"#C9CCD5"}
            />
          : (
            <FlatList 
              data={showFilteredContacts == true ? filteredContacts : contactRed.contacts}
              renderItem={({item}) => (
                <ContactCard
                  data={item}
                  onPress={id => {
                    console.log("[ContactHome] ContactCard onPress id: ", id)
                    setContactSelected(item)
                    // setShowAddButton(true)
                    openBottomSheet()
                  }}
                />
              )}
              keyExtractor={(item, index) => {String(item + index)}}
            />
          )
        }
        {bottomSheetRender()}
        {/* <AddContactButton 
          showSnackbar={showAddButton}
          onCloseSnackBar={async() => {
            setShowAddButton(false)
          }}
          onRefreshConnection={async() => {
            setShowAddButton(false)
          }}
        /> */}
      </ScrollView>
      <FloatingAddButton 
        onPressButton={() => {
          navigateTo({screenName: "ContactAdd"})
        }}
      />
    </View>
  )
};

export default ContactHome;
