import {StyleSheet} from 'react-native';
import {heights as DHeight} from '../../common/heights';
// import {headingText3} from '../../../common/Typography';

const styles = StyleSheet.create({
  toolbarContainer: {
    height: DHeight(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerStyle: {
    height: DHeight(48),

    marginTop: DHeight(32),
    marginBottom: DHeight(12),
    flexDirection: 'row-reverse',
    alignSelf: 'center',
  },
  underlineStyleBase: {
    height: DHeight(48),
    width: DHeight(48),
    borderRadius: DHeight(24),
    // ...headingText3,
  },
  underlineStyleHighLighted: {},
  image: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#222546',
  },
  header: {
    // flex: 3,
    // justifyContent: 'flex-end',
    // paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default styles;
