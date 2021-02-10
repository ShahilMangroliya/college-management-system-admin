import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
// import { Text ,View,TouchableOpacity,Dimensions,Alert,Button,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import YoutubePlayer from "react-native-youtube-iframe";
// import YoutubePlayer from "react-native-youtube-iframe";
// var data;

    // const playerRef = useRef();
    var x
var time,date
export default class PdfMaterial extends Component{
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

   async fetchData(){
    this.setState({isFetching:true})

        var data=[]
       await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'pdfData/')
        .on("value",datasnap=>{
            // console.log(datasnap.val());
            for( var i in datasnap.val()){
                // console.log(datasnap.val()[i]);
                data.push({
                    "topic": datasnap.val()[i].topic,
                    "link": datasnap.val()[i].link,
                    'id'    :i
                })
            }

        

            
        })
     this.setState({data:[]})
        this.setState({data:data.reverse()})
        this.setState({isFetching:false})
        console.log(this.state.data);
    }
    async removeData(item){
        await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'pdfData/'+item)
        .remove()
        this.setState({remove:false})
        this.fetchData()
        this.props.navigation.goBack()
    }
    addPdf(){
        firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'pdfData/'+new Date().getTime()).set({
            link:this.state.link,
            topic:this.state.topic
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
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:width/13}}>PDF</Text>
                        <TouchableOpacity onPress={()=>this.setState({remove:true})} >
                            <MaterialIcons name='delete' style={{color:'red',marginLeft:width/2.1,marginTop:5}} size={width/11} />
                        </TouchableOpacity>
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
                                
                                <TouchableOpacity onPress={()=>{Linking.openURL(item.link)}}>
                                    <View style={{flexDirection:'row',width:width-20,alignSelf:'center'}} >
                                    {/* <Image
                                        style={{height:50,width:50,alignSelf:'center'}}
                                        source={{uri: 'https://img.youtube.com/vi/'+item.videoId+'/0.jpg'}}
                                        /> */}
                                    <Text style={{color:'white',margin:10,width:width-70,fontSize:18}}> {item.topic}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                )}
                            />
                   
                   <Modal animationType='slide' transparent={true} visible={this.state.remove} onRequestClose={() => {this.setState({remove:false})}}>
                    <View style={{height:height,width:width}} >
                            <ImageBackground
                            source={
                            require('../images/homeback.jpg')}
                            style={{flex:1,height:height,width:width,position:'absolute',marginBottom:0,resizeMode: 'cover'}}/> 
                            <View style={{flexDirection:'row'}} >
                            <TouchableOpacity style={{marginTop:20}} onPress={()=>{console.log('X'),this.setState({remove:false})}}>
                                <Ionicons name='arrow-back' style={{color:'white',marginLeft:10}} size={40} />
                            </TouchableOpacity>
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',marginTop:20,fontSize:width/13}}>REMOVE</Text>
                        </View>
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
                                    <Text style={{color:'white',margin:10,width:width-70,fontSize:18}}> {item.topic}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                )}
                            />

                            

                        
                    {/* <Stack.Screen name='CheckAttendance'  options={{headerShown:false}} component={CheckAttendance} />  */}

                    </View>
                    </Modal>


                    <Modal animationType='none' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
                    {/* <View style={{height:height,backgroundColor:'rgba(52, 52, 52, 0.8)',position:'absolute'}} /> */}
                    <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{    margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                        <View style={{margin:10,borderRadius:30,borderWidth:4,borderColor:'black',justifyContent:'center',width:width-30,height:60}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <MaterialCommunityIcons name='pdf-box' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
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
                            <MaterialCommunityIcons name='pdf-box' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                            {/* <Feather name='activity' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30}/> */}
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'black',opacity:0.80,}}
                            placeholder='Enter Link of PDF'
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

                              <TouchableOpacity onPress={() => {this.addPdf()}}>
                                    
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