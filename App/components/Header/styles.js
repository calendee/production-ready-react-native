import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  buttonLeft: {
    alignItems: 'flex-start',
  },
  icon: {
    width: 18,
  },
});
