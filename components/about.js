import React ,{Component } from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Image,ImageBackground} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import {Avatar} from 'react-native-paper'

export default class About extends Component{


    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#0C0C0C',flexDirection:'row',alignItems:'center',width:width,height:100}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                        <Entypo name='menu' style={{color:'white',margin:20,marginTop:20}} size={40} />
                    </TouchableOpacity>
                    <Image
                        source={
                        require('../images/home.png')}
                        style={{height: 110,marginLeft:25,width: 200,resizeMode: 'stretch',borderRadius:150}}/>
                        <TouchableOpacity onPress={()=>{this.signOut(),console.log('logout')}}>
                            <MaterialCommunityIcons name='logout' style={{color:'white',margin:20,marginLeft:50,marginTop:20}} size={40} />
                        </TouchableOpacity>
                </View>
                <ImageBackground
                source={
                    require('../images/homeback.jpg')}
                        style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}/>
             {/* <Text>about</Text> */}
            <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>DESIGN ENGINEERING PROJECT</Text>
            <Text style={{color:'white',fontSize:20,margin:10}}>Team ID: 264542</Text>
            <Text style={{color:'white',fontSize:20,margin:10,fontWeight:'bold',fontFamily:''}}>Team Members:</Text>


            <View style={{flexDirection:"row",alignItems:"center",marginBottom:10,marginLeft:20}}>
                {/* <Avatar.Image source={} style={{marginTop:20}} /> */}
                <Avatar.Image source={require('../images/25.jpg')} style={{marginTop:20}} />
                <View style={{marginLeft:10,marginTop:5}}>
                    <Text style={{color:'#fff',fontSize:19}}>Shahil Mangroliya</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>shahil.mangroliya123@gmail.com</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>180420107525</Text>

                </View>
            </View>

            <View style={{flexDirection:"row",alignItems:"center",marginLeft:20,marginBottom:10}}>
                {/* <Avatar.Image source={{uri:'https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/67693891_2325351350851451_2425867648416874496_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_ohc=lTmNVh5jS5sAX8TD3cv&oh=86d2c3624aad0ba9f8ad163ba37ea747&oe=5FBF6499'}} style={{marginTop:20}} /> */}
                <Avatar.Image source={require('../images/30.jpg')} style={{marginTop:20}} />
                <View style={{marginLeft:10,marginTop:5}}>
                    <Text style={{color:'#fff',fontSize:19}}>Sanket Naliyadra</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>sanketnaliyadra00@gmail.com</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>180420107530</Text>
                </View>
            </View>

            <View style={{flexDirection:"row",marginBottom:10,alignItems:"center",marginLeft:20}}>
                {/* <Avatar.Image source={{uri:'https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/75545962_2860531360648457_8417434647964680192_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_ohc=QGPcCqJQ8yAAX-mFb0v&oh=d646c2e16535b160d9a63068fba22a9f&oe=5FC03149'}} style={{marginTop:20}} /> */}
                <Avatar.Image source={require('../images/15.jpg')} style={{marginTop:20}} />
                {/* <Avatar.Image source={require('../images/updates1.png')} style={{marginTop:20}} /> */}
                <View style={{marginLeft:10,marginTop:5}}>
                    <Text style={{color:'#fff',fontSize:19}}>Sahilkumar Hirpara</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>sahilhirpara2000@gmail.com</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>180420107515</Text>
                </View>
            </View>

            <View style={{flexDirection:"row",marginBottom:10,alignItems:"center",marginLeft:20}}>
                <Avatar.Image source={require('../images/61.jpg')} style={{marginTop:20}} />
                {/* <Avatar.Image source={{uri:'https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/59343119_430980454345878_8101690732789628928_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_ohc=KohfmBkav0kAX9_dTNU&oh=3a5b87dacc4a9f001043aae5a7a15b50&oe=5FC1671B'}} style={{marginTop:20}} /> */}
                {/* <Avatar.Image source={require('../images/updates1.png')} style={{marginTop:20}} /> */}
                <View style={{marginLeft:10,marginTop:5}}>
                    <Text style={{color:'#fff',fontSize:19}}>Piyushbhai Vaghela</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>piyushbvaghela641@gmail.com</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>180420107561</Text>
                </View>
            </View>

            <View style={{flexDirection:"row",marginBottom:10,alignItems:"center",marginLeft:20}}>
                <Avatar.Image source={require('../images/58.jpg')} style={{marginTop:20}} />
                {/* <Avatar.Image source={{uri:'https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/95067791_2869952426455711_2409351252895858688_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_ohc=3llHYi1jfQ4AX_bjowa&oh=7e43899da96addd7daafd5082dbd0b1b&oe=5FC1660C'}} style={{marginTop:20}} /> */}
                {/* <Avatar.Image source={require('../images/updates1.png')} style={{marginTop:20}} /> */}
                <View style={{marginLeft:10,marginTop:5}}>
                    <Text style={{color:'#fff',fontSize:19}}>Utsavkumar Satani</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>utsavsatani00@gmail.com</Text>
                    <Text style={{color:"#fff",opacity:0.6}}>180420107548</Text>
                </View>
            </View>
            </View>
            // <Text>about</Text>
        );
    }
}