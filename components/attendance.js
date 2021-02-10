import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'

// var data;
var tLectures
var x
// var date =new Date()
// var time =date.getTime()
export default class Attendance extends Component{
    state={
        name:this.props.route.params.name,
        // email:'',
        subName:this.props.route.params.subName,
        add:false,
        remove:false,
        enrollment:'',
        searchData:'',
        isSearchData:false,
        isSearchFound:false,
        studentsData:[],
        isFetching:false,
        isShowData:false,
        showData:'',
        isLoading:false,

    }
    async componentDidMount(){
        x=this.props.route.params.x
       await this.fetchData()
    //    await this.fetchData()
    }

    async fetchData(){
        this.setState({isFetching:true})
        var data=[]
        await firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name).on("value",datasnap=>{
            // console.log(datasnap.val());
            tLectures=datasnap.val().total
            console.log('tLectures',tLectures);
            for(var i in datasnap.val()){
                if(parseInt(i)>0){
                    for(var j in datasnap.val()[i])
                    console.log(j);
                // console.log(i);
                data.push(datasnap.val()[i][j])
                // console.log(datasnap.val()[i]);
                }
            }
        })
        this.setState({studentsData:[]})
        this.setState({studentsData:data,isFetching:false})
        
        console.log(this.state.studentsData);
    }
    attendance(){
        // this.props.nav
        console.log('atte');
    }
    async search(number){
        // this.setState({isFetching:true})
        // var data=[]
        // try {
            this.setState({searchData:{
                "email": "Not Found",
                "enrollment": "Not Found",
                "name": "Not Found",
                "phone": "Not Found"
            }}),

        await firebase.firestore()
         .collection('studentsData')
         .doc(number)
         .get()
         .then(snapshot => {
             if(snapshot.exists){
             console.log(snapshot.data());
             this.setState({searchData:snapshot.data()})
             this.setState({isSearchFound:true})
             }
             else
             this.setState({isSearchFound:false})
             this.setState({isSearchData:true})
             
         })
         .then(this.setState({isSearchData:true}))
            .catch((e)=>this.setState({searchData:{
                "email": "Not Found",
                "enrollment": "Not Found",
                "name": "Not Found",
                "phone": "Not Found"
            }}),
        this.setState({isSearchData:false}),
        // console.log(e)
            )

    }
   async addStudent(data){
       this.setState({isLoading:true})
       var alreadyExists=false
    // console.log(data);
    try {
        

       await firebase.firestore().collection('classes')
        .doc(data.email)
        .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
        //   console.log(docSnapshot.data()['subjects']);
          for(var i in docSnapshot.data()['subjects']){
          console.log(docSnapshot.data()['subjects'][i]);
          if(docSnapshot.data()['subjects'][i].subName==this.state.subName&&docSnapshot.data()['subjects'][i].teacher==this.state.name)
            alreadyExists=true
          }
        }
      })
      if (alreadyExists) {
        Alert.alert('Student Already in Class.')
          
      } else {

      

    // console.log(time.getTime());
    //////////////////////////////////////////////////////////////
   await firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name+'/'+data.enrollment).set({
        data:data
    })
   await firebase.firestore().collection('classes')
    .doc(data.email)
    .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
            firebase.firestore().collection('classes')
            .doc(data.email)
            .update({
                subjects: firebase.firestore.FieldValue.arrayUnion({subName:this.state.subName,teacher:this.state.name})
            })
        }
        else{
            firebase.firestore().collection('classes')
        .doc(data.email)
        .set({
            subjects:[{subName:this.state.subName,teacher:this.state.name}]
            })
        }
    })
      }
       this.setState({isLoading:false})
       this.setState({isSearchFound:false})
    this.setState({isSearchData:false})
    this.fetchData()
    //////////////////////////////////////////////////
} catch (error) {
        console.log(error);
}

    }
   async removeData(data){
    this.setState({isLoading:true})

        console.log('remove');
        var array=[]
        await firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name+'/'+data.enrollment)
        .remove()
        await firebase.firestore().collection('classes')
        .doc(data.email)
        .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
                // console.log(docSnapshot.data()['subjects']);
                array=docSnapshot.data()['subjects']
            }
        })
        console.log(array);
        await firebase.firestore().collection('classes')
        .doc(data.email)
      .update({
        subjects: array.filter(array => array.subName !== this.state.subName)
      })
       this.setState({isLoading:false})
       this.setState({isShowData:false})
      this.fetchData()
    //   this.fetchData()

    }



    render(){
        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
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
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:width/13}}>Attendance</Text>
                    </View>
                    <View style={{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.setState({add:true})}}>
                    <View style={{width:width/2.1,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>Add</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{marginLeft:10}} />
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TakeAttendance',{studentsData:this.state.studentsData,name:this.state.name,subName:this.state.subName,tLectures:tLectures})}}>
                    <View style={{width:width/2.1,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>Take Attedance</Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                    <FlatList
                            style={{elevation:2,height:height-230}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.studentsData}
                                // horizontal
                                // inverted
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                <TouchableOpacity onPress={()=>{this.setState({showData:item,isShowData:true})}}>
                                    <Text style={{color:'white',margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.enrollment}</Text>
                                </TouchableOpacity>
                                </View>
                                )}
                            />
                    <Modal animationType='none' transparent={true} visible={this.state.isShowData} onRequestClose={() => {this.setState({isShowData:false})}}>
                    <View style={{height:height,width:width}} >
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
                            style={{flex:1,height:height,width:width,position:'absolute',marginBottom:0,resizeMode: 'cover'}}/> 
                            <TouchableOpacity style={{marginTop:20}} onPress={()=>{console.log('X'),this.setState({isShowData:false})}}>
                                <MaterialIcons name='arrow-back' style={{color:'white',marginLeft:10}} size={40} />
                            </TouchableOpacity>
                            <View style={{height:50,marginHorizontal:40,alignItems:'flex-end'}} >
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
                                          onPress: () => {console.log("OK Pressed"),this.removeData(this.state.showData)} }
                                        ],
                                        { cancelable: false }
                                      );}}>
                                      <MaterialIcons name='delete' style={{color:'red',}} size={35} />
                                     </TouchableOpacity>

                            </View>
                            
                            <View style={{marginLeft:10}} >
                                {/* <Text>Name: {this.state.showData.name}</Text> */}
                                <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',marginLeft:5,color:'#F9C04D'}}>Name: </Text>
                                <Text style={{fontSize:20,marginLeft:5,width:width/1.2,color:'white'}}>{this.state.showData.name}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',marginLeft:5,color:'#F9C04D'}}>Enrollment: </Text>
                                <Text style={{fontSize:20,marginLeft:5,color:'white'}}>{this.state.showData.enrollment}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',marginLeft:5,color:'#F9C04D'}}>Phone: </Text>
                                <Text onPress={()=>Linking.openURL('tel:'+this.state.showData.phone)} style={{fontSize:20,marginLeft:5,color:'white'}}>{this.state.showData.phone}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',marginLeft:5,color:'#F9C04D'}}>Email: </Text>
                                <Text onPress={()=>Linking.openURL('mailto:'+this.state.showData.email)} style={{fontSize:20,marginLeft:5,width:width/1.2,color:'white'}}>{this.state.showData.email}</Text>
                                </View>
                            </View>
                            <View style={{margin:10}} />
                            <TouchableOpacity onPress={()=>{this.setState({isShowData:false}),this.props.navigation.navigate('CheckAttendance',{tLectures:tLectures,sData:this.state.showData,name:this.state.name,subName:this.state.subName})}}>
                                {/* studentsData:this.state.studentsData,name:this.state.name,subName:this.state.subName,tLectures:tLectures */}
                    <View style={{width:width/1.7,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>Check Attendance</Text>
                    </View>
                    </TouchableOpacity>
                        
                    {/* <Stack.Screen name='CheckAttendance'  options={{headerShown:false}} component={CheckAttendance} />  */}

                    </View>
                    </Modal>



                    <Modal animationType='slide' transparent={true} visible={this.state.add} onRequestClose={() => {this.setState({add:false})}}>
                    <KeyboardAvoidingView style={{height:height}} 
                    behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{height:height,width:width}} >
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
                            style={{flex:1,height:height,width:width,position:'absolute',marginBottom:0,resizeMode: 'cover'}}/>
                            <TouchableOpacity style={{marginTop:20}} onPress={()=>{console.log('X'),this.setState({add:false})}}>
                                <Ionicons name='arrow-back' style={{color:'white',marginLeft:10}} size={40} />
                            </TouchableOpacity>
                            <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='flow-branch' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <TextInput style={{position:'absolute',fontSize:16,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}
                            placeholder='Enter Enrollmaent No.'
                            keyboardType='numeric'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            maxLength={12}
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({enrollment:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{marginTop:20}} />
                        <TouchableOpacity onPress={()=>{this.search(this.state.enrollment)}}>
                    <View style={{width:width/2.5,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>Search</Text>
                    </View>
                    </TouchableOpacity>
                    {this.state.isSearchData&&
                    <View style={{margin:10}}>
                    <Text style={{fontSize:15,color:'white'}}>Name: {this.state.searchData.name}</Text>
                    <Text style={{fontSize:15,color:'white'}}>Enrollment: {this.state.searchData.enrollment}</Text>
                    <Text style={{fontSize:15,color:'white'}}>Phone: {this.state.searchData.phone}</Text>
                    <Text style={{fontSize:15,color:'white'}}>Email: {this.state.searchData.email}</Text>
                    </View>

                    }
                    {this.state.isSearchFound&&
                        <TouchableOpacity onPress={()=>{this.addStudent(this.state.searchData)}}>
                        <View style={{width:width/2.5,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:50,backgroundColor:'#F9C04D'}} >
                            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>ADD</Text>
                        </View>
                        </TouchableOpacity>
                    }

                        </View>
                        </TouchableWithoutFeedback>
                         </KeyboardAvoidingView>
                    </Modal>


                     {/* <Text style={{color:'white'}}>Inclass</Text> */}
    
            </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
        );
    }
}