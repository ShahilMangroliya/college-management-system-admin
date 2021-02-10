import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,ActivityIndicator,Alert,Keyboard,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput, ScrollView} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
// const i 
var x;


const firebaseConfig = {
    apiKey: "AIzaSyC9_BW2RyOyKD3w8Za_Krhz5pJcswHyfZY",
    authDomain: "up2020-64b8e.firebaseapp.com",
    databaseURL: "https://up2020-64b8e.firebaseio.com",
    projectId: "up2020-64b8e",
    storageBucket: "up2020-64b8e.appspot.com",
    messagingSenderId: "1033212055436",
    appId: "1:1033212055436:web:c866dd6e2eea508fc190a9"
  };





export default class Signup extends Component{
    state={
        name:'',
        phone:'',
        email:'',
        pass:'',
        enrol:'',
        isLoading:false,
        uid:'',
        currentuser:''
    }
    registerUser = () => {
        if(this.state.email === '' || this.state.pass === '' || this.state.name === '' || this.state.phone === '' ) {
          Alert.alert('Enter proper details to signup!')
        } else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.pass)
          .then(() => {
          x = firebase.auth().currentUser.uid



          firebase.database().ref("users/"+x+"/").set({
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            // enrollment:this.state.enrol
        })
        firebase.firestore().collection('facultyData')
        // .add({
          // firebase.firestore().collection('user/'+x+'/amountData')
        .doc(this.state.email)
        .set({
          name:this.state.name,
          email:this.state.email,
          phone:this.state.phone,
          details:'',
          designation:'',
          image:''
        })
            this.props.navigation.replace('HOME')
          })
          .catch((error) => {
            console.log('error portion')
            switch (error.code) {
                case 'auth/invalid-email':
                    Alert.alert('Enter Valid Email')
                    this.setState({isLoading:false})
                    break;
                case 'auth/user-not-found':
                    Alert.alert('user id and password not found')
                    this.setState({isLoading:false})
                    break;
                case 'auth/wrong-password':
                    Alert.alert('Enter Correct Password')
                    this.setState({isLoading:false})
                    break;
                case 'auth/weak-password':
                    Alert.alert('weak-password')
                    this.setState({isLoading:false})
                    break;
                case 'auth/too-many-requests':
                    Alert.alert('Please Try After Few Moment')
                    this.setState({isLoading:false})
                    break;
                default:
                    Alert.alert('Try With Different Email Id.')
                    // console.log(error.code)
                    this.setState({isLoading:false})
            }
        })         
        }
      }
      componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {this.setState({uid:user.uid})})
          console.log(this.state.uid);
            console.log('//////////////////////////////////////2/////');
        }    

    render(){
        return(
            
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
            <View style={{}}>
              <ScrollView>
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
                    source={require('../images/back.jpg')}
                        style={{opacity:1,height:height,width:width,resizeMode: 'cover',position:'absolute'}}/>
                        
                        
                        
                        <View style={{height:height,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        
                        
                        
                        
                        <Image
                        source={
                        require('../images/updates1.png')}
                        style={{height: 200,alignSelf:'center',marginTop:10,marginBottom:-50,width: 200,resizeMode: 'stretch',borderRadius:150}}/>
                        <View style={{margin:10,marginTop:40,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='user' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Name'
                            keyboardType=''
                            placeholderTextColor="white"
                            onChangeText={(text) => this.setState({name:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='phone' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Phone No.'
                            keyboardType='phone-pad'
                            maxLength={10}
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({phone:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='mail' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Email Id'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({email:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='lock' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Password'
                            keyboardType='ascii-capable'
                            secureTextEntry={true}
                            placeholderTextColor="white"
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({pass:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>


                        
                        <View style={{marginBottom:20,marginTop:20,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.registerUser()}}>
                        <View style={{backgroundColor:'#F9C04D',margin:10,justifyContent:'center',borderRadius:28,marginTop:10,height:55,width:200}}>
                            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',fontFamily:''}}>Signup</Text>  
                        </View>
                        </TouchableOpacity>
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:17,color:'#A1A1A8',marginBottom:10}}>Already a member? </Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.replace('Login')}}>
                        <View style={{borderWidth:4,borderColor:'#A1A1A8',justifyContent:'center',borderRadius:25,width:250,alignItems:'center',height:50,elevation:6}}>
                          <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',color:'#A1A1A8'}}>Login</Text>
                        </View>
                        </TouchableOpacity>
                        </View>


                
             {/* <Text>edit profile</Text> */}
             </View>
             </ScrollView>
            </View>         
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>


        );
    }
}