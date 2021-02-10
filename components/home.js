import React ,{Component,useState} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TextInput,ActivityIndicator,ScrollView,Image, ImageBackground,FlatList,Linking,Modal} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// var data = require('./data/data.json');
import firebase from 'firebase'

var today = new Date();
export default class Home extends Component{

    state={
        loading:true,
        data:[],
        topic:'',
        detail:'',
        link:'',
        plus:false,
        name:'',
        isFetching:false,
    }



////////////////////////////////////////////////////////////////





// /////////////////////////////////////////////////////////////////














   async componentDidMount(){


        this.fetchData()

     var x = await firebase.auth().currentUser.uid
    //   var 
        firebase.database().ref("users").on("value",datasnap=>{
            this.setState({name:datasnap.val()[x].name})
        })
        console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n',this.state.data,this.state.name);
    }
    async addDataToDash(){
        var time=await today.getTime()
       await firebase.firestore().collection('Dashboard')
        .doc(time.toString())
        .set({
            topic:this.state.topic,
            detail:this.state.detail,
            link:this.state.link,
            name:this.state.name,
            time:time.toString(),
            selectedPictureUri:''
        })
        .then(this.setState({plus:false}),this.fetchData())
    }
   async fetchData(){
       var data=[]
       this.setState({isFetching:true})
        await firebase.firestore()
        .collection('Dashboard')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc=>{
                data.push(doc.data())
            })
        })
        // .then(this.setState({plus:false}))
           .catch((error)=>console.log(error))
            this.setState({data:data.reverse()})
            this.setState({isFetching:false})
    
    }

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

                <View style={{marginBottom:100}}>
                    <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height-100,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',fontFamily:'',fontSize:35}}>Dashboard</Text>
                            
                            {/* {this.state.loading?<ActivityIndicator/>: */}
                            
                            <FlatList
                            style={{elevation:2}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.data}
                                // horizontal
                                // inverted
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('HomeData',{item:item})}>
                                    <Text style={{color:'white',margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.topic}</Text>
                                </TouchableOpacity>
                                </View>
                                )}
                            />
                                <View style={{position:'absolute',marginLeft:width-80,marginTop:height-270}}>
                                    <TouchableOpacity onPress={()=>{console.log('+'),this.setState({plus:true})}}>
                                        <AntDesign name='pluscircle' style={{color:'#F9C04D'}} size={50} />
                                    </TouchableOpacity>
                                </View>
                                
                                <Modal animationType='slide' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
                                    <View >
                                    <ImageBackground
                                        source={
                                            require('../images/homeback.jpg')}
                                            style={{flex:1,height:height-100,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                                    <TouchableOpacity style={{marginTop:25}} onPress={()=>{console.log('X'),this.setState({plus:false})}}>
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
                            // value={this.state.email}
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
                            // value={this.state.email}
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
                            // value={this.state.details}
                            onChangeText={(text) => this.setState({detail:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                            
                        </View>
                        <View style={{marginBottom:50,marginTop:20,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.addDataToDash()}}>
                        <View style={{backgroundColor:'#F9C04D',margin:10,justifyContent:'center',borderRadius:28,marginTop:10,height:55,width:200}}>
                            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',fontFamily:''}}>ADD</Text>  
                        </View>
                        </TouchableOpacity>
                        </View>
                        </ScrollView>

                                    </View>
                                </Modal>
                            {/* } */}
                </View>
            </View>
        );
    }
}