import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Keyboard,ActivityIndicator,Dimensions,KeyboardAvoidingView,Modal,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'
// import { StackedBarChart } from 'react-native-svg-charts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import * as ImagePicker from 'expo-image-picker';
var x;
// var name;
// var phone
// var email
// var enrol

export default class Profile extends Component{
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
        enrol:'',
        modal:false,
        image:'',
        isUploading:false
      }
      loadImage(){
        firebase.storage().ref('data/'+this.state.email).getDownloadURL()
        .then((uri)=>{
          this.setState({image:uri.toString()})
        })
        this.setState({isUploading:false})
      }
      
    async componentDidMount(){
      // this.animation.play();

         
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
        this.loadImage()
      }


      onChooseImagePress = async () =>{
        this.setState({isUploading:true})
        

        // let result = await ImagePicker.launchCameraAsync()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.112,
          });
        if(!result.cancelled){
            this.animation.play();
            this.uploadImage(result.uri,this.state.email)
            .then(()=>{
                alert('Image Uploaded Sucessfully')
                this.loadImage()
        this.setState({isUploading:false})

              //  this.animation.pause();


                
    
            })
            .catch((error)=>{
                alert(error)
            })
        }
        else
        this.setState({isUploading:false})

    }
    addURL(){
      console.log(this.state.image);
      firebase.firestore().collection('facultyData')
      .doc(this.state.email)
      .update({
        image:this.state.image
      })
      .catch((e)=>{
        alert(e)
      })
    }
    
    uploadImage = async (uri,imageName)=>{
      
        const response =await fetch(uri)
        const blob = await response.blob()
        // console.log('blob',blob);
        // console.log('response',response);
    
        var ref = firebase.storage().ref().child("data/" + imageName);
        return ref.put(blob)
    }
    
    
    render(){

        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

           
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
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
            <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',fontFamily:'',fontSize:35}}>Profile</Text>

                        <View style={{margin:10,marginTop:40,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='user' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}>{this.state.name}</Text>
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='phone' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}>{this.state.phone}</Text>
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='mail' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.8,}}>{this.state.email}</Text>


                            
                        </View>
                        

                        <View style={{alignItems:'center',marginTop:20,justifyContent:'center'}}>
                        <Text style={{fontSize:17,marginBottom:10,color:'#A1A1A8'}}>Want to change image?</Text>
                        <TouchableOpacity onPress={()=>{this.setState({modal:true})}}>
                        <View style={{borderWidth:4,borderColor:'#A1A1A8',justifyContent:'center',borderRadius:25,width:250,alignItems:'center',height:50,elevation:6}}>
                          <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',color:'#A1A1A8'}}>Change Image</Text>
                        </View>
                        </TouchableOpacity>
                        </View>

                        <View style={{alignItems:'center',marginTop:50,justifyContent:'center'}}>
                        <Text style={{fontSize:17,marginBottom:10,color:'#A1A1A8'}}>Want to edit profile?</Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Edit Profile')}}>
                        <View style={{borderWidth:4,borderColor:'#A1A1A8',justifyContent:'center',borderRadius:25,width:250,alignItems:'center',height:50,elevation:6}}>
                          <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',color:'#A1A1A8'}}>Edit Profile</Text>
                        </View>
                        </TouchableOpacity>
                        </View>


                        <Modal animationType='slide' transparent={true} visible={this.state.modal} onRequestClose={() => {this.setState({modal:false})}}>
                        <View style={{height:height,width:width}}>
                        <ImageBackground
                          source={
                            require('../images/homeback.jpg')}
                            style={{flex:1,height:height,width:width,resizeMode: 'cover',position:'absolute'}}/>
                            <TouchableOpacity style={{marginTop:25}} onPress={()=>{console.log('X'),this.setState({modal:false}),this.addURL()}}>
                              <Ionicons name='arrow-back' style={{color:'white',marginLeft:10}} size={35} />
                            </TouchableOpacity>
                            <Image source={{uri:this.state.image}} style={{marginTop:10,height: 150,marginTop:50, width:150,alignSelf:'center'}}/>
                            <View style={{marginTop:50,alignItems:'center'}}>
                              <TouchableOpacity onPress={()=>{this.onChooseImagePress()}}>
                                <View style={{height:50,width:width-100,borderRadius:25,backgroundColor:'#F9C04D',alignItems:'center',justifyContent:'center'}}>
                                  <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>CHANGE IMAGE</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                            {/* <LottieView source={require('./upload.json')} autoPlay loop /> */}
                            
                            {this.state.isUploading &&
                            <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute',elevation:7}}> 
                                    <View style={{    position: 'absolute',elevation:6,
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center'}}>
                                      {/* <ActivityIndicator size='large' color="white"/> */}
                                      <LottieView
                              ref={animation => {
                                this.animation = animation;
                              }}
                              // autoPlay loop
                              style={{
                                width: 400,
                                height: 100,
                                // backgroundColor: '#000000',
                              }}
                              source={require('./4033-uploading.json')}
                              // OR find more Lottie files @ https://lottiefiles.com/featured
                              // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                            />
                                    </View>
                                    </View>

                            }




                        </View>
                        </Modal>

            </View>        
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

        );
    }
}