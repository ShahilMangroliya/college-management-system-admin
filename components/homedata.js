import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'

// var data;



export default class HomeData extends Component{
    state={
        loading:true,
        data:'',
        date:'',
        edit:false,
        link:'',
        topic:'',
        detail:''

    }
   async componentDidMount(){
        // console.log(this.props.route.params.item);
        await this.setState({loading:false,data:this.props.route.params.item})
        console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n',this.state.data);
        // console.log(this.validURL(this.state.data.link));
        this.setState({date:new Date(parseInt(this.state.data.time))})
        // this.validURL(this.state.data.link)
    }
    
   async removeData(){
       await firebase.firestore().collection("Dashboard").doc(this.state.data.time).delete()
        .then(this.props.navigation.replace('HOME'))
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }

    editData(){
    this.setState({link:this.state.data.link,detail:this.state.data.detail,topic:this.state.data.topic,edit:true})      
      }
     async updateData(){
        await firebase.firestore().collection('Dashboard')
        .doc(this.state.data.time)
        .update({
            detail:this.state.detail,
            link:this.state.link,
            topic:this.state.topic
        })
        this.setState({edit:false})
        this.props.navigation.replace('HOME')
      }

    render(){
        return(
            <View style={{}}>
                    <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.replace('HOME')}}>
                            <MaterialIcons name='arrow-back' style={{color:'white',marginTop:10,marginLeft:10}} size={35} />
                        </TouchableOpacity>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:35}}>Dashboard Data</Text>
                    </View>
                    <View style={{marginLeft:width-150,flexDirection:'row'}} >
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
                                          onPress: () => {console.log("OK Pressed"),this.removeData()} }
                                        ],
                                        { cancelable: false }
                                      );}}>
                                      <MaterialIcons name='delete' style={{color:'red',}} size={35} />
                                     </TouchableOpacity>
                                    <View style={{marginLeft:20}}/>

                                   <TouchableOpacity onPress={()=>{this.editData()}}>
                                      <FontAwesome name='pencil' style={{color:'#ffffff',}} size={30} />
                                    </TouchableOpacity>
                                   </View>
                                   <View style={{marginBottom:-10}} />
                    {/* <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',margin:20,fontFamily:'',fontSize:30}}>Dashboard Data</Text> */}
                    <View style={{flexDirection:'column',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'#F9C04D',fontWeight:'bold',fontFamily:'',fontSize:20}}>Topic:- </Text>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.topic}</Text>
                    </View>
                    <View style={{flexDirection:'column',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'#F9C04D',fontWeight:'bold',fontFamily:'',fontSize:20}}>Link: </Text>
                    <TouchableOpacity onPress={()=>Linking.openURL(this.state.data.link)}>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.link}</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column',margin:10}}>
                    <Text style={{color:'#F9C04D',fontWeight:'bold',fontFamily:'',fontSize:20}}>Details: </Text>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.detail}</Text>
                    </View>
                    <View style={{flexDirection:'row',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'white',fontWeight:'bold',fontFamily:'',fontSize:20}}>By </Text>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'white',fontWeight:'bold',fontFamily:'',fontSize:20}}>At</Text>
                    <Text style={{color:'white',fontSize:15,marginTop:5}}>: {this.state.date.toString()}</Text>
                    </View>
                            {/* {this.state.loading?<ActivityIndicator/>: */}
                            
                            <Modal animationType='slide' transparent={true} visible={this.state.edit} onRequestClose={() => {this.setState({plus:false})}}>
                                    <View >
                                    <ImageBackground
                                        source={
                                            require('../images/homeback.jpg')}
                                            style={{flex:1,height:height-100,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                                    <TouchableOpacity style={{marginTop:25}} onPress={()=>{console.log('X'),this.setState({edit:false})}}>
                                        <Ionicons name='arrow-back' style={{color:'white',marginLeft:10}} size={35} />
                                    </TouchableOpacity>
                                    <ScrollView>
                                    <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <MaterialIcons name='topic' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Topic'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            value={this.state.topic}
                            onChangeText={(text) => this.setState({topic:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>

                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='link' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Link with https://'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            value={this.state.link}
                            onChangeText={(text) => this.setState({link:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>

                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',width:width-20,height:350,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:-4,width:60,height:60,elevation:6}}>
                            <Entypo name='info' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:18,width:width-100,height:350,marginLeft:60,color:'white',opacity:0.80}}
                            placeholder='Enter Details:'
                            // maxLength={12}
                            multiline={true}
                            
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            // defaultValue={this.state.details}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            value={this.state.detail}
                            onChangeText={(text) => this.setState({detail:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                            
                        </View>
                        <View style={{marginBottom:50,marginTop:20,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.updateData()}}>
                        <View style={{backgroundColor:'#F9C04D',margin:10,justifyContent:'center',borderRadius:28,marginTop:10,height:55,width:200}}>
                            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',fontFamily:''}}>ADD</Text>  
                        </View>
                        </TouchableOpacity>
                        </View>
                        </ScrollView>

                                    </View>
                                </Modal>
    
            </View>
        );
    }
}