import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TextInput,Modal, ImageBackground,Linking} from 'react-native'
// import { Text ,View,TouchableOpacity,Dimensions,Alert,Button,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import YoutubePlayer from "react-native-youtube-iframe";
// import YoutubePlayer from "react-native-youtube-iframe";
// var data;

    // const playerRef = useRef();
export default class OnlineLink extends Component{
    state={
        name:this.props.route.params.name,
        // email:'',
        subName:this.props.route.params.subName,
        plus:false,
        link:'',
        topic:'',
        data:'https://classroom.google.com/u/1/h',
        youtube:false,
        id:'',
        isFetching:false,
        remove:false,
        // loading:''

    }
    //  playerRef = useRef();
   async componentDidMount(){

    await this.fetchData()
    // await this.fetchData()
    }

   async fetchData(){
       try {
           

    await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'OnlineLink/')
    .on("value",datasnap=>{
        console.log(datasnap.val());
        if(datasnap.val())
        this.setState({data:datasnap.val().link})

    })
} catch (error) {
           this.setState({data:'https://classroom.google.com/u/1/h'})
}
    
    console.log('this.state.data'+this.state.data);
    }

    addlink(){
        firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'OnlineLink/').set({
            link:this.state.link,
        })
        .then(this.setState({plus:false}))
    }



    render(){
        return(
            <View style={{}}>
                    <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.goBack()}}>
                            <MaterialIcons name='arrow-back' style={{color:'white',marginTop:10,marginLeft:10}} size={35} />
                        </TouchableOpacity>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/7,fontFamily:'',fontSize:width/13}}>Online Lecture Link</Text>

                    </View>
                    <View style={{marginTop:20}} />
                    <TouchableOpacity onPress={()=>{Linking.openURL(this.state.data)}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>JOIN CLASS</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{marginTop:20}} />
                    <TouchableOpacity onPress={()=>{this.setState({plus:true})}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>EDIT LINK</Text>
                    </View>
                    </TouchableOpacity>

                   
                   

                    <Modal animationType='none' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
                    {/* <View style={{height:height,backgroundColor:'rgba(52, 52, 52, 0.8)',position:'absolute'}} /> */}
                    <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{    margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>


                        <View style={{margin:10,borderRadius:30,borderWidth:4,borderColor:'black',justifyContent:'center',width:width-30,height:60}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <MaterialCommunityIcons name='google-classroom' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                            {/* <Feather name='activity' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30}/> */}
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'black',opacity:0.80,}}
                            placeholder='Enter Link of Class'
                            keyboardType='url'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({link:text})}
                            />
                        </View>
                              <View style={{flexDirection:'row'}}>
                              <TouchableOpacity onPress={() => {this.setState({plus:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'black',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "black",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => {this.addlink()}}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'black',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "#F9C04D",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Save</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                    </Modal>
                    {/* <YoutubePlayer
                    getVolume
                    height={300}
                    play={true}
                    videoId={"0-S5a0eXPoc"}
                    onChangeState={(data)=>console.log(data)}
                    /> */}
                    {/* <Text style={{color:'white'}}>///////////////////////////</Text> */}


                     {/* <Text style={{color:'white'}}>Inclass</Text> */}
    
            </View>
        );
    }
}