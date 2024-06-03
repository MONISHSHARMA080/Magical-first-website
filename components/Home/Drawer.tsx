import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Button, Drawer,Text } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import PillShapeButtonForDrawer from './buttons/pillShapeButtonForDrawer';
import { FlashList } from '@shopify/flash-list';
import JWTStore from '@/app/store';


interface propsInThisComponent{
  stateToToogleTheDrawerOn:Boolean
}
export default function DrawerToShowPreviousSites(
    { stateToToogleTheDrawerOn }:propsInThisComponent
        ) {
          // stateToToggleItOn can be the reactQuery state too that way we can get fetch when opened true and may be store the previous state in the
          // storage and zustand
          // const [stateToToggleItOn, setstateToToggleItOn]= useState(stateToToogleTheDrawerOn)
          
          // useEffect(()=>{
            //   setTimeout(()=>{console.log("stateToToggleItOn-- ",stateToToggleItOn);
            //         setstateToToggleItOn(true)
            // }, 2700)
            // },[stateToToggleItOn])

  const {  sitePromptArray } = JWTStore();
  const [drawerOnTheSide, setDrawerOnTheSide] = useState('');
  const drawerTranslateX = useSharedValue(-Dimensions.get('window').width /2);

  React.useEffect(() => {
    if (stateToToogleTheDrawerOn) {
      drawerTranslateX.value = withTiming(0, { duration: 110 });
    } else {
      drawerTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
    }
  }, [stateToToogleTheDrawerOn, drawerTranslateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drawerTranslateX.value }],
      // zIndex: 100, 
    };
  });


  return (
    // <View className="bg-slate-700 flex-1">
    <Animated.View
      style={[
        {
          // height: '100%',
          height: Dimensions.get('window').height -14,
          backgroundColor: "#fff",
          borderRadius: 45,
          width: Dimensions.get('window').width -20,
          alignSelf:'center',
          zIndex:100
        },
        animatedStyle,
      ]}
      className="m-4"
    >

        <View className="justify-end pb-4" style={{ height: '100%' }}>
          <Text className=' text-2xl self-center p-3'>Previous  website</Text>
          <FlashList
            data={sitePromptArray}
            renderItem={({ item }) => (
              <View style={{ borderRadius: 20, overflow: 'hidden' }}>
                <PillShapeButtonForDrawer
                  textToBeDisplayed={item}
                  colorOnTheBorderAndInTheText={'#ff9ace'}
                  function_to_run_on_touch={()=>{console.log("clicked the--> ",item )

                  }
                  }
                />
              </View>
            )}
            estimatedItemSize={20}
          />
        </View>
    </Animated.View>
  // </View>
  );
}