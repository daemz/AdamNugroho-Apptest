jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));

// jest.mock('@react-navigation/native', () => ({
//   useNavigation: () => jest.fn(),
//   useNavigationParam: jest.fn(jest.requireActual(
//    '@react-navigation/native'
//   ).useNavigationParam),
//  }));