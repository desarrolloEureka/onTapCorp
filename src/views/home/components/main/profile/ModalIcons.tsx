import React from 'react';
import { View, TouchableOpacity, Modal, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import IconZoom from './icons/IconZoom';
import IconWhatsAppB from './icons/IconWhatsAppB';
import IconVSCO from './icons/IconVSCO';
import IconBooking from './icons/IconBooking';
import IconOnlyFans from './icons/IconOnlyFans';

const ModalIcons = ({
  isModalIcons,
  setModalIcons,
  value,
  val,
  keyItem,
  handleDataNetworks
}: {
  isModalIcons: boolean;
  setModalIcons: (e: boolean) => void;
  handleDataNetworks: (e: any) => void;
  value: any;
  val: any;
  keyItem: any;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalIcons}
      onRequestClose={() => {
        setModalIcons(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(128, 128, 128, 0.7)'
        }}>
        <View
          style={{
            height: '85%',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#02AF9B',
            borderRadius: 25
          }}>
          <View
            style={{
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => setModalIcons(false)}>
              <Icon name="close" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '92%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: '95%',
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Url</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'www' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'www',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome5 name="link" size={20} color="#02AF9B" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Facebook
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'facebook' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'facebook',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <Ionicons
                          name="logo-facebook"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Threads
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'threads' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'threads',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="square-threads"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Linkedin
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'linkedin' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'linkedin',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <Ionicons
                          name="logo-linkedin"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>Messenger</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'messenger' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'messenger',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <Fontisto name="messenger" size={25} color="#02AF9B" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Instagram
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'instagram' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'instagram',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <Ionicons
                          name="logo-instagram"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Tiktok</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'tiktok' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'tiktok',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="tiktok"
                          size={21}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Snapchat
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'snapchat' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'snapchat',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome
                          name="snapchat-square"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>X</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'twitter' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'twitter',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="square-x-twitter"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Twitch</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'twitch' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'twitch',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="twitch"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Youtube
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'youtube' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'youtube',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="youtube"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Whatsapp
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'whatsapp' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'whatsapp',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="whatsapp"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>Zoom</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'zoom' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'zoom',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <IconZoom />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Line</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'line' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'line',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="line"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Gmail</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'gmail' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'gmail',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <MaterialCommunityIcons
                          name="gmail"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Email</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'email' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'email',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <MaterialCommunityIcons
                          name="email"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>Phone</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'phone' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'phone',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome name="phone" size={25} color="#02AF9B" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Telegram
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'telegram' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'telegram',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="telegram"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 12 }}>
                        WhatsApp Business
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'whatsappbusiness'
                              ? '#babcbf'
                              : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'whatsappbusiness',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <IconWhatsAppB />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Skype</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'skype' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'skype',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="skype"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>We Chat</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'wechat' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'wechat',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <AntDesign name="wechat" size={25} color="#02AF9B" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Paypal</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'paypal' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'paypal',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="paypal"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>VSCO</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'vsco' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'vsco',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <IconVSCO />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Tumblr</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'tumblr' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'tumblr',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="square-tumblr"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>Vimeo</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'vimeo' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'vimeo',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="vimeo-v"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Spotify
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'spotify' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'spotify',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="spotify"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Deezer</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'deezer' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'deezer',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="deezer"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Apple Music
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'applemusic' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'applemusic',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <Fontisto name="applemusic" size={25} color="#02AF9B" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 12 }}>
                        Google Maps
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'googlemaps' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'googlemaps',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <MaterialCommunityIcons
                          name="google-maps"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Trip Advisor
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'tripadvisor' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'tripadvisor',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome5Brands
                          name="tripadvisor"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Booking
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'booking' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'booking',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <IconBooking />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>Tinder</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'tinder' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'tinder',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <Fontisto name="tinder" size={25} color="#02AF9B" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1 / 0.3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white' }}>Amazon</Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'amazon' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'amazon',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="amazon"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Only Fans
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'onlyfans' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'onlyfans',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <IconOnlyFans />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Air Bnb
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'airbnb' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'airbnb',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="airbnb"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <View
                      style={{
                        height: '30%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text style={{ color: 'white', fontSize: 13 }}>
                        Pinterest
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: '95%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          height: '85%',
                          width: '65%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            val.icon === 'pinterest' ? '#babcbf' : 'white',
                          flexDirection: 'row',
                          borderRadius: 10
                        }}
                        onPress={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: 'pinterest',
                            subindex: 'icon',
                            key: keyItem
                          })
                        }>
                        <FontAwesome6Brands
                          name="pinterest"
                          size={25}
                          color="#02AF9B"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalIcons;
