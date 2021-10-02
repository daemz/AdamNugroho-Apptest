import {
  StyleSheet,
  Platform
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#082032",
    // backgroundColor: "#fff",
    paddingHorizontal: moderateScale(8)
  },
  roundedImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: "cover", 
    borderRadius: 100,
    marginRight: moderateScale(12)
  },
  text: {
    fontSize: moderateScale(16),
    color: "#fff",
  },
  
}) 

export const HeaderStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: moderateScale(75),
    backgroundColor: "transparent",
    // backgroundColor: "red",
    padding: moderateScale(10),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: moderateScale(16),
    color: "#fff",
  },
  tabContainerActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3DB2FF",
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(30),
    borderRadius: 50
  },
  tabContainerInactive: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(30),
    borderColor: "#C9CCD5",
    borderWidth: 1,
    borderRadius: 50
  }
}) 

export const SearchBarStyle = StyleSheet.create({
  container: {
    height: moderateScale(45),
    backgroundColor: "transparent",
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(10),
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C9CCD5',
    borderWidth: .3,
    borderRadius: 50,
    flexDirection: 'row',
    marginBottom: moderateScale(10)
  }
})

export const ContactCardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row'
  },
  initialLetterNameStyle: {
    width: moderateScale(50),
    height: moderateScale(50), 
    borderRadius: 50,
    marginRight: moderateScale(12),
    backgroundColor: "#8CA1A5",
    // backgroundColor: "#CEE5D0",
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const HeaderWithBackButtonStyle = StyleSheet.create({
  buttonBorder: {
    padding: moderateScale(8),
    borderRadius: 50,
    borderColor: "#C8C6C6",
    borderWidth: .7
  }
})

export const UIInputStyle = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: moderateScale(2),
    backgroundColor: "transparent"
  },
  textInputView: {
    borderRadius: 5,
    backgroundColor: "#8CA1A5",
    // paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(10)
  }
})

export const FloatingButtonStyle = StyleSheet.create({
  floatingButton:{
    width: moderateScale(60),  
    height: moderateScale(60),   
    borderRadius: 100,            
    backgroundColor: '#3DB2FF',                                    
    position: 'absolute',                                          
    bottom: moderateScale(10),                                                    
    right: moderateScale(10), 
    justifyContent: 'center',
    alignItems: 'center'
  }
})