import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Alert,ActivityIndicator,Keyboard,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'
// import { StackedBarChart } from 'react-native-svg-charts'

var x;

export default class EditProfile extends Component{
    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
      state={
        name:'',
        phone:'',
        email:'',
        details:'',
        designation:'',
        isLoading:false
      }
      
      update=()=>{
        if( this.state.name === '' || this.state.phone === '' || this.state.enrol === '' ) {
            Alert.alert('Enter proper details to signup!')
          } else {
            this.setState({
              isLoading: true,
            })
          x = firebase.auth().currentUser.uid

        firebase.database().ref("users/"+x+"/").update({
            name:this.state.name,
            // email:this.state.email,
            phone:this.state.phone,
        })
        .then(
        firebase.firestore().collection('facultyData')
        .doc(this.state.email)
        .update({
          details:this.state.details,
          designation:this.state.designation
        })
        )
        .then(

            this.props.navigation.replace('PROFILE')
        )
      }
    }
      
    async componentDidMount(){


         
      x = await firebase.auth().currentUser.uid
      this.setState({currentuser:x})
      console.log(x,'done')
      await firebase.database().ref("users").on("value",datasnap=>{
        console.log(datasnap.val()[x]);
        // email=datasnap.val()[x].email
        // name=datasnap.val()[x].name
        // phone=datasnap.val()[x].phone
        // email=datasnap.val()[x].email
        // enrol=datasnap.val()[x].enrollment
        this.setState({name:datasnap.val()[x].name})
        this.setState({phone:datasnap.val()[x].phone})
        this.setState({email:datasnap.val()[x].email})
        // this.setState({enrol:datasnap.val()[x].enrollment})
    })
     firebase.firestore()
    .collection('facultyData')
    .doc(this.state.email)
    .get()
    .then(doc => {
      if (doc.exists) {
        this.setState({details:doc.data().details})
        this.setState({designation:doc.data().designation})
        console.log(doc.data());
      }
    })
      }
    render(){

        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
            <View style={{flex:1}}>
            {this.state.isLoading &&
                <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute',elevation:7}}> 
                        <View style={{    position: 'absolute',elevation:6,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                          <ActivityIndicator size='large' color="white"/>
                        </View>
                        </View>

                }
                <ImageBackground
                source={
                  require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,resizeMode: 'cover',position:'absolute'}}/>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.navigate('PROFILE')}}>
                            <MaterialIcons name='arrow-back' style={{color:'white',marginLeft:10,marginTop:45}} size={50} />
                        </TouchableOpacity>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
                        <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',marginLeft:width/3.7,marginTop:40,fontFamily:'',fontSize:35}}>Edit Profile</Text>
                    </View>
                        <View style={{margin:10,marginTop:40,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='user' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                         <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.55,}}>{this.state.name}</Text>
                            
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='phone' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Phone No.'
                            keyboardType='phone-pad'
                            maxLength={10}
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            // defaultValue={this.state.phone}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            value={this.state.phone}
                            onChangeText={(text) => this.setState({phone:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                            
                        </View>

                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='mail' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                            <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.55,}}>{this.state.email}</Text>


                            
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='medal' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter designation'
                            keyboardType='ascii-capable'
                            maxLength={10}
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            // defaultValue={this.state.phone}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            value={this.state.designation}
                            onChangeText={(text) => this.setState({designation:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                            
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',width:width-20,height:200,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:-4,width:60,height:60,elevation:6}}>
                            <Entypo name='info' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:18,width:width-100,height:200,marginLeft:60,color:'white',opacity:0.80}}
                            placeholder='Enter About You'
                            // maxLength={12}
                            multiline={true}
                            
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            // defaultValue={this.state.details}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            value={this.state.details}
                            onChangeText={(text) => this.setState({details:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                            
                        </View>
                        <View style={{marginBottom:20,marginTop:20,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.update()}}>
                        <View style={{backgroundColor:'#F9C04D',margin:10,justifyContent:'center',borderRadius:28,marginTop:10,height:55,width:200}}>
                            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',fontFamily:''}}>Update</Text>  
                        </View>
                        </TouchableOpacity>
                        </View>
                        

            </View>        
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

        );
    }
}