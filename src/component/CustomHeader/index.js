import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CONSTANT from '../../constants';
import { FontAwesomes } from '../../constants/Icons';

const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'10%',
        paddingHorizontal:15,
        marginTop:'3%'

    },
    home:{
        width: '100%',
        // marginTop:20,
        // padding:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    


    }
})

const CustomHeader=({image,icon,navigation,onPress,OnLongPress,home,style})=>{
    return(
        <View style={styles.header}>

{
    home && <View style={styles.home}>
        <TouchableOpacity
                style={[style,{width:100,height:70}]}
                onPress={onPress}


        >
        <Image source={image} style={{width:'100%',height:'100%'}} />

        </TouchableOpacity>
        <TouchableOpacity
                style={[style,{width:25,height:25}]}
                onPress={OnLongPress}

        >
        <Image source={icon} style={{width:'100%',height:'100%'}} />

        </TouchableOpacity>


        {/* <TouchableOpacity
        style={[style,{width:50,height:50,justifyContent:'center',alignItems:'center'}]}
        >
            <Image source={CONSTANT.App.screenImages.logo} resizeMode="cover"
            style={{width:'100%',height:'100%'}}/>

        </TouchableOpacity>
        <TouchableOpacity
                // style={[style,{width:32,height:32,justifyContent:'center',alignItems:'center'}]}
                onPress={OnLongPress}

        >
            <Image source={CONSTANT.App.screenImages.bell}
            style={{width:'100%',height:'100%'}}/>
        </TouchableOpacity> */}
        </View>
}

            
        </View>
    )
}

export default CustomHeader;