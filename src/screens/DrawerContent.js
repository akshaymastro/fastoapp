import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {color} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {bindActionCreators} from 'redux';
import {showHome} from '../redux/common/actions';
import { CommonActions } from "@react-navigation/native";

import {AuthContext} from '../component/context';
import {useSelector, useDispatch, connect} from 'react-redux';
import {LinearGradient} from 'react-native-linear-gradient';

export function DrawerContent(props) {
  let [mobilenoo, setmobilenoo] = useState('');
  let [username, setusername] = useState('');

  useEffect(() => {
    GetDataFromAsyncc();

    // randomfunction();
  }, []);

  //const dispatch = useDispatch()

  const GetDataFromAsyncc = async () => {
    try {
      let dataUserr = await AsyncStorage.getItem('USER');
      // let statuss = await JSON.parse(dataUserr)

      setmobilenoo((mobilenoo = statuss.user.Mobile));
      setusername((username = statuss.user.firstName + statuss.user.lastName));

      console.log('stattusss' + statuss);

      //  dispatch({type:'PASS_SIGN',payload:dataUser})
    } catch (err) {
      console.log(err);
    }
  };

  const paperTheme = useTheme();

  // const { signOut, toggleTheme } = React.useContext(AuthContext);

  //    console.log('Drawer Screen' + UserData)
  const signOut = () => {
    props.showHome(false);
   // props.navigation.navigate('SignInScreen');
   props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: "SignInScreen",
          params: null ,
        },
      ],
    })
  );
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../assets/neeraj.jpg')}
                size={50}
                style={styles.avtar}
              />

              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Neeraj Pharia</Title>
                <Caption style={styles.caption}> 999 240 3542</Caption>
                <Caption style={styles.captionid}>
                  Customer Id : FSTO12521
                </Caption>
              </View>
            </View>
            {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              style={styles.invite}
              label="Invite & Earn"
              labelStyle={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}
              headerTitleAlign="center"
              onPress={() => {
                props.navigation.navigate('InviteEarn');
              }}
            />

            
            <DrawerItem
              style={styles.about}
              labelStyle={{color: '#000', fontSize: 16, fontWeight: 'bold'}}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              style={styles.about}
              labelStyle={{color: '#000', fontSize: 16, fontWeight: 'bold'}}
              label="Orders"
              onPress={() => {
                props.navigation.navigate('DetailsScreen');
              }}
            />
            <DrawerItem
              label="Accounts"
              style={styles.about}
              labelStyle={{color: '#000', fontSize: 16, fontWeight: 'bold'}}
              onPress={() => {
                props.navigation.navigate('AboutScreen');
              }}
            />
            <DrawerItem
              style={styles.about}
              labelStyle={{color: '#000', fontSize: 16, fontWeight: 'bold'}}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
            <DrawerItem
              style={styles.about}
              labelStyle={{color: '#000', fontSize: 16, fontWeight: 'bold'}}
              label="How To Get Ride"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />
            
          </Drawer.Section>
          <Drawer.Section>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text> Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text> Language English / हिन्दी</Text>
                <View pointerEvents="none">
                  <Switch />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
// showHome

function mapStateToProps(state) {
  return {
    isOnline: state.network.isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showHome: bindActionCreators(showHome, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#054091',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#054091',
  },
  captionid: {
    fontSize: 14,
    lineHeight: 14,
    color: 'black',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avtar: {
    shadowOffset: {width: 50, height: 20},
    shadowColor: '#fff',
    shadowOpacity: 1,
    elevation: 20,
  },
  invite: {
    backgroundColor: '#3b316e',
    borderRadius: 50,

    fontWeight: 'bold',
    paddingLeft: 28,
    marginLeft: 50,
    marginRight: 50,
  },
  about: {
    backgroundColor: '#f4eeee',
  },
});
