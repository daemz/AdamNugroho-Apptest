import React, {useState} from 'react';
import { 
  Text, 
  View,
  Image,
  Touchable,
  TouchableOpacity
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { ContactCardStyle, GlobalStyle, HeaderStyle } from '../../../components/GlobalStyle';

const ContactCard = ({
    data,
    onPress
}) => {
  // console.log("[ContactCard] data: ", data);
  const [image, setImage] = useState({uri: data.photo})
  const [enableImage, setEnableImage] = useState(true)
  const [initialName, setInitialName] = useState(data.firstName.charAt(0).toUpperCase())

  return(
    <TouchableOpacity onPress={() => onPress && onPress(data.id)}>
      <View style={ContactCardStyle.cardContainer}>
          {
            enableImage === true ? (
              <Image 
                source={image}
                style={GlobalStyle.roundedImage}
                onError={() => {
                  // setImage(require("../../../resource/image/default_profile_image.png"))
                  setEnableImage(false)
                }}
              />
            )
            : (
              <View style={ContactCardStyle.initialLetterNameStyle}>
                <Text style={{color: "#C9CCD5", fontWeight: 'bold', fontSize: moderateScale(20)}}>
                  {initialName}
                </Text>
              </View>
            )
          }
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={HeaderStyle.text}>
              {`${data.firstName} ${data.lastName}`}
            </Text>
            {/* <Text style={[HeaderStyle.text, {color: "#C9CCD5"}]}>
              {`${data.age} y'o`}
            </Text> */}

          </View>
      </View>
    </TouchableOpacity>
  )
};

export default ContactCard;
