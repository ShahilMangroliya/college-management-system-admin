import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
// import { Text ,View,TouchableOpacity,Dimensions,Alert,Button,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import YoutubePlayer from "react-native-youtube-iframe";
import YoutubePlayer from "react-native-youtube-iframe";
// var data;

    // const playerRef = useRef();
    var x
var time,date
export default class VideoMaterial extends Component{
    state={
        name:this.props.route.params.name,
        // email:'',
        subName:this.props.route.params.subName,
        plus:false,
        link:'',
        topic:'',
        data:[],
        youtube:false,
        id:'',
        isFetching:false,
        remove:false,
        // loading:''

    }
    //  playerRef = useRef();
   async componentDidMount(){
    date =new Date()
    time =date.getTime()
    await this.fetchData()
    // await this.fetchData()

    }
    async removeData(item){
        await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'videoData/'+item)
        .remove()
        this.setState({remove:false})
        this.fetchData()
        this.props.navigation.goBack()
    }

   async fetchData(){
    this.setState({isFetching:true})

        var data=[]
       await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'videoData/')
        .on("value",datasnap=>{
            // console.log(datasnap.val());
            for( var i in datasnap.val()){
                // console.log(datasnap.val()[i]);
                data.push({
                    "topic": datasnap.val()[i].topic,
                    "videoId": datasnap.val()[i].videoId,
                    'id'    :i
                })
            }

        

            
        })
        this.setState({data:[]})
        this.setState({data:data.reverse()})
        this.setState({isFetching:false})
        console.log(this.state.data);
    }


    linkToId(link){

    var video_id =link.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    console.log(video_id);
    return(video_id)
    }

   async addVideo(){
       await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'videoData/'+new Date().getTime()).set({
            videoId:this.linkToId(this.state.link),
            topic:this.state.topic
        })
        .then(this.setState({plus:false}))
    
    // loading(data){
         this.fetchData()
    }

    // }


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
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:width/13}}>Videos</Text>
                        <TouchableOpacity onPress={()=>this.setState({remove:true})} >
                            <MaterialIcons name='delete' style={{color:'red',marginLeft:width/3,marginTop:5}} size={width/11} />
                        </TouchableOpacity>
                        {/* <Text style={{color:'red',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:18}}>REMOVE</Text> */}
                        {/* <Text */}
                    </View>
                    <View style={{position:'absolute',marginLeft:width-80,marginTop:height-150}}>
                        <TouchableOpacity onPress={()=>{console.log(new Date().getTime()),this.setState({plus:true})}}>
                            <AntDesign name='pluscircle' style={{color:'#F9C04D'}} size={50} />
                        </TouchableOpacity>
                    </View>
                    {/* <FlatList */}
                    <FlatList
                            style={{elevation:2,height:height-230}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.data}
                                // horizontal
                                // inverted
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                
                                <TouchableOpacity onPress={()=>{this.setState({youtube:true,id:item.videoId})}}>
                                    <View style={{flexDirection:'row',width:width-20,alignSelf:'center'}} >
                                    <Image
                                        style={{height:50,width:50,alignSelf:'center'}}
                                        source={{uri: 'https://img.youtube.com/vi/'+item.videoId+'/0.jpg'}}
                                        />
                                    <Text style={{color:'white',margin:10,width:width-70,fontSize:18}}> {item.topic}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                )}
                            />


                    <Modal animationType='none' transparent={true} visible={this.state.remove} onRequestClose={() => {this.setState({remove:false})}}>
                    <View style={{height:height,width:width}} >
                            <ImageBackground
                            source={
                            require('../images/homeback.jpg')}
                            style={{flex:1,height:height,width:width,position:'absolute',marginBottom:0,resizeMode: 'cover'}}/> 
                            <TouchableOpacity style={{marginTop:20}} onPress={()=>{console.log('X'),this.setState({remove:false})}}>
                                <Ionicons name='arrow-back' style={{color:'white',marginLeft:10}} size={40} />
                            </TouchableOpacity>
                        <FlatList
                            style={{elevation:2,height:height-230}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.data}
                                // horizontal
                                // inverted
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                
                                <TouchableOpacity onPress={()=>{
                                    Alert.alert(
                                        "Delete",
                                        "Are you sure you want to delete?",
                                        [
                                          
                                          {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                          },
                                          { text: "Delete", 
                                          onPress: () => {console.log("OK Pressed"),this.removeData(item.id)} }
                                        ],
                                        { cancelable: false }
                                      );}}>
                                    <View style={{flexDirection:'row',width:width-20,alignSelf:'center'}} >
                                    <Image
                                        style={{height:50,width:50,alignSelf:'center'}}
                                        source={{uri: 'https://img.youtube.com/vi/'+item.videoId+'/0.jpg'}}
                                        />
                                    <Text style={{color:'white',margin:10,width:width-70,fontSize:18}}> {item.topic}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                )}
                            />

                            

                        
                    {/* <Stack.Screen name='CheckAttendance'  options={{headerShown:false}} component={CheckAttendance} />  */}

                    </View>
                    </Modal>




                    <Modal animationType='none' transparent={true} visible={this.state.youtube} onRequestClose={() => {this.setState({youtube:false})}}>
                    {/* <KeyboardAvoidingView style={{height:height}}  */}
                        {/* // behavior={Platform.OS == "ios" ? "padding" : "height"}> */}
                         {/* <TouchableWithoutFeedback onPress={this.setState({youtube:false})}> */}
           
                        <View style={{height:height/3}} />
                        {/* </View> */}
                        {/* <View style={{height:height,position:'absolute',opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)'}} /> */}
                            <YoutubePlayer
                            // style={{elevation:6}}
                                getVolume
                                height={height/3}
                                play={true}
                                videoId={this.state.id}
                                onChangeState={(data)=>console.log(data)}
                                />
                                <Text onPress={()=>this.setState({youtube:false})} style={{color:'#F9C04D',alignSelf:'center',fontSize:20}} >Click To Exit</Text>
                        {/* <View style={{height:height/3,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)'}} /> */}
                        {/* <View style={{height:height,position:'absolute',elevation:5,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)'}} /> */}
                        {/* </View> */}
                        {/* </TouchableWithoutFeedback>
                        </KeyboardAvoidingView> */}

 
                    </Modal>




                    <Modal animationType='none' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
                    {/* <View style={{height:height,backgroundColor:'rgba(52, 52, 52, 0.8)',position:'absolute'}} /> */}
                    <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{    margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                        <View style={{margin:10,borderRadius:30,borderWidth:4,borderColor:'black',justifyContent:'center',width:width-30,height:60}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <AntDesign name='youtube' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                            {/* <Feather name='activity' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30}/> */}
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'black',opacity:0.80,}}
                            placeholder='Enter Topic Name'
                            keyboardType='url'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({topic:text})}
                            />
                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:4,borderColor:'black',justifyContent:'center',width:width-30,height:60}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <AntDesign name='youtube' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                            {/* <Feather name='activity' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30}/> */}
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'black',opacity:0.80,}}
                            placeholder='Enter Link of YouTube'
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
                              <TouchableOpacity onPress={() => {this.addVideo()}}>
                                    
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