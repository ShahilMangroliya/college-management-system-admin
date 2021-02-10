import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Keyboard,ScrollView,ActivityIndicator,Modal,Alert,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'


export default class Login extends Component{
    state = { 
      email: '', 
      pass: '',
      isLoading: false,
      uid:'',
      femail:'',
      modal:false
    }
    forgotPassword=()=>{
      this.setState({modal:true})
      // firebase.auth().sendPasswordResetEmail(this.state.email)
    }
    resetPassword=()=>{
      if(this.state.femail==''){
        Alert.alert('Enter Email For Password Reset')
      }
      else{
        try{
            firebase.auth().sendPasswordResetEmail(this.state.femail)
            .then(
            this.setState({modal:false,femail:''})
            )
          }
          catch(error){
            console.log(error);
            this.setState({modal:false,femail:''})
          }
          finally{
            this.setState({modal:false,femail:''})
          }

      }
    }

    async userLogin () {
        if(this.state.email === '' || this.state.pass === '') {
          Alert.alert('Enter details to login!')
        } else {
          this.setState({
            isLoading: true,
          })
          await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.pass)
          .then((res) => {
            // console.log(res)
            // this.setState({uid:res.uid})
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            // console.log(this.state.uid);
            this.setState({uid: firebase.auth().currentUser.uid})
            console.log(this.state.uid);

            this.props.navigation.navigate('HOME')
          })
          .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

componentDidMount(){
    console.log('///////////////////////////////////////////////////////login');
    // console.log(this.state.uid,'//');

}
    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={{flex:1,height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
            <View style={{}}>
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
                        
                        
            <Modal animationType='slide' transparent={true} visible={this.state.modal} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
                              <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{    margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{margin:10,borderRadius:30,borderWidth:4,borderColor:'black',justifyContent:'center',width:width-30,height:60}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'black',opacity:0.80,}}
                            placeholder='Enter Email'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({femail:text})}
                            />
                        </View>
                              <View style={{flexDirection:'row'}}>
                              <TouchableOpacity onPress={() => {this.setState({modal:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'black',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "black",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => {this.resetPassword()}}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'black',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "black",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Reset</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </Modal>



                        <View style={{height:height,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <Image
                        source={
                        require('../images/updates1.png')}
                        style={{height: 200,alignSelf:'center',marginTop:height/50,marginBottom:-50,width: 200,resizeMode: 'stretch',borderRadius:150}}/>
                        <View style={{margin:10,marginTop:40,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='mail' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Email Id'
                            keyboardType='email-address'
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
                          

                            onChangeText={(text) => this.setState({pass:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{alignSelf:'center',marginBottom:30,marginTop:40}}>
                        <TouchableOpacity onPress={()=>this.forgotPassword()}>
                          <Text style={{fontSize:17,color:'#A1A1A8'}}>Forgot Password? </Text>
                        </TouchableOpacity>
                        </View>
                        
                        <View style={{margin:10,alignSelf:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>{this.userLogin()}}>
                          <View style={{backgroundColor:'#F9C04D',borderRadius:28,height:55,width:200,alignSelf:'center',justifyContent:'center'}}>
                            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',fontFamily:''}}>Login</Text>  
                        </View>
                        </TouchableOpacity>
                        </View>
                        <View style={{alignItems:'center',marginTop:50,justifyContent:'center'}}>
                        <Text style={{fontSize:17,marginBottom:10,color:'#A1A1A8'}}>Not a member?</Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.replace('Signup')}}>
                        <View style={{borderWidth:4,borderColor:'#A1A1A8',justifyContent:'center',borderRadius:25,width:250,alignItems:'center',height:50,elevation:6}}>
                          <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',color:'#A1A1A8'}}>Create account</Text>
                        </View>
                        </TouchableOpacity>
                        </View>


                
             {/* <Text>edit profile</Text> */}
             </View>
            </View>         
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

        );
    }
}