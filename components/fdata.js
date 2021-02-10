import React ,{Component} from 'react'
import { Text ,View,Dimensions,Image,TouchableOpacity,ScrollView,Linking,ImageBackground} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import data from './data/faculty.json'
// import Animated from 'react-native-reanimated'
import firebase from 'firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default class FacultyData extends Component{

    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground
                source={
                    require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,resizeMode: 'cover',position:'absolute'}}/>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.navigate('FACULTY DETAILS')}}>
                     <MaterialIcons name='arrow-back' style={{color:'white',marginLeft:10,marginTop:40}} size={40} />
                     </TouchableOpacity>
                <View style={{margin:10}}>
                <Image source={{uri:this.props.route.params.item.image}} style={{margin:10,alignSelf:'center',height:width/2.5,borderRadius:40,marginTop:48,width:width/2.5}}/>
                <Text style={{alignSelf:'center',fontWeight:'bold',fontFamily:'',marginBottom:20,fontSize:18,color:'white'}}>{this.props.route.params.item.name}</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:18,marginBottom:20,color:'white'}}>Number: </Text>
                <Text onPress={()=>Linking.openURL('tel:'+this.props.route.params.item.number)} style={{fontSize:18,marginBottom:20,color:'white'}}>{this.props.route.params.item.phone}</Text>
                </View>
                {/* <Text onPress={()=>Linking.openURL('tel:'+this.props.route.params.item.number)} style={{fontSize:18,marginTop:-15,marginBottom:20,color:'white'}}>                     {data[this.props.route.params.id].number1}</Text> */}
                <View  style={{flexDirection:'row'}}>
                <Text style={{fontSize:18,marginBottom:20,fontWeight:'bold',fontFamily:'',color:'white'}}>Email: </Text>
                <Text onPress={()=>Linking.openURL('mailto:'+this.props.route.params.item.email)} style={{fontSize:18,marginBottom:20,color:'white'}}>{this.props.route.params.item.email}</Text>
                </View>


                <Text style={{fontSize:18,fontWeight:'bold',fontFamily:'',color:'white'}}>Area of Interest: </Text>
                <Text style={{fontSize:17,marginBottom:20,color:'white'}}>          {this.props.route.params.item.details}</Text>
                <Text style={{fontSize:18,marginBottom:0,fontWeight:'bold',fontFamily:'',color:'white'}}>Designation: </Text>
                <Text style={{fontSize:17,marginBottom:20,color:'white'}}>{this.props.route.params.item.designation}</Text>

                </View>
            </View>
        );
    }
}