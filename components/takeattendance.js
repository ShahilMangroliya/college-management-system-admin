import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'

// var data;
var date
var time
var x
var total
var tLectures
export default class TakeAttendance extends Component{
    state={
        name:this.props.route.params.name,
        subName:this.props.route.params.subName,
        studentsData:this.props.route.params.studentsData,
        attendanceData:[],
        temp:false,
        total:0,
        isLoading:false


    }
   async componentDidMount(){
       tLectures=this.props.route.params.tLectures
       console.log(tLectures);
        date =new Date()
         time =date.getTime()
    //    console.log(width);
    // console.log(this.state.studentsData);
    // console.log(this.state.name);
    // console.log(this.state.subName);
    // console.log(this.state.studentsData[0].enrollment%10000);
    await this.loadData(this.state.studentsData)
    // await this.loadData(this.state.studentsData)

    console.log(this.state.total);

    }

    loadData(data){
        // console.log(data);
        var i
        for(i in data){
            this.state.attendanceData.push({
                'id' : i,
                // 'email':data[i].email,
                'enrollment':data[i].enrollment,
                'attedance' : true
            })
            // this

        }        

        this.setState({total:parseInt(i)+1})
        total=parseInt(i)+1
        this.setState({temp:true})
        console.log(this.state.attendanceData);


    }

    preToAbsent(item){
        var data=this.state.attendanceData
        // console.log(data,item);
        data[parseInt(item.id)]['attedance']=false
        // console.log(data);
        
        this.setState({attendanceData:data})
        this.setState({total:parseInt(this.state.total)-1})
        // console.log(this.state.total);

    }
    absToPresent(item){
        var data=this.state.attendanceData
        // console.log(data,item);
        data[parseInt(item.id)]['attedance']=true
        // console.log(data);
        this.setState({attendanceData:data})
        this.setState({total:parseInt(this.state.total)+1})
        // console.log(this.state.total);
    }
   async uploadData(data){
       this.setState({isLoading:true})
       await firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name)
       .update({
           total:parseInt(tLectures)+1

       })
        for (var i in data){
            // console.log(data[i].enrollment);
           await firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name+'/'+data[i].enrollment+'/'+time)
            .set({
                A:data[i].attedance

            })

        }

      this.setState({isLoading:false})
      this.props.navigation.replace('HOME')
    //    .then(Alert.alert('Attedance Saved Successfully'))
    }
    



    render(){
        return(
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
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <View style={{flexDirection:'row',marginTop:20,marginBottom:10}}>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.goBack()}}>
                            <MaterialIcons name='arrow-back' style={{color:'white',marginTop:10,marginLeft:10}} size={35} />
                        </TouchableOpacity>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:width/13}}>Take Attendance</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#65B34D',fontWeight:'bold',fontFamily:'',fontSize:25}}>Present: {this.state.total}</Text>
                    <Text style={{color:'#CB3C3A',fontWeight:'bold',fontFamily:'',fontSize:25}}>  Absent: {total-parseInt(this.state.total)}</Text>
                    </View>
                    {/* <View style={{height:height-100,marginTop:80,marginLeft:width/1.27,position:'absolute',borderWidth:0.5,opacity:0.5,borderColor:'white'}} /> */}
                                <FlatList
                                style={{elevation:2,height:height-250}}                  
                                data={this.state.attendanceData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,width:width-20,alignSelf:'center',borderBottomWidth:0.5,flexDirection:'row',padding:5,alignItems:'center',borderBottomColor:'white'}}>
                                {/* <TouchableOpacity onPress={()=>{}}> */}
                                    <Text style={{color:'white',margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:22}}>{parseInt(parseInt(item.enrollment)/1000000000)}_{parseInt(item.enrollment)%1000}</Text>
                                {/* <View style={{marginLeft:width/2}} /> */}
                                {/* <FontAwesome5 name='user-alt' style={{color:'red',}} size={35} /> */}
                                <View style={{width:width-40,alignItems:'flex-end',position:'absolute'}}>
                                    {item.attedance&&
                                    <TouchableOpacity onPress={()=>{this.preToAbsent(item)}}>
                                        <View style={{height:50,width:50,margin:2,borderRadius:10,alignItems:'center',alignSelf:'flex-end',justifyContent:'center',elevation:5,backgroundColor:'#65B34D'}}>
                                            <Text style={{color:'white',fontSize:40,fontWeight:'bold',fontFamily:''}} >P</Text>
                                        </View>
                                    </TouchableOpacity>
                                    }
                                </View>
                                <View style={{width:width-40,alignItems:'flex-end',position:'absolute'}}>
                                    {item.attedance==false&&
                                    <TouchableOpacity onPress={()=>{this.absToPresent(item)}}>
                                        <View style={{height:50,width:50,margin:2,borderRadius:10,alignItems:'center',justifyContent:'center',elevation:5,backgroundColor:'#CB3C3A'}}>
                                            <Text style={{color:'white',fontSize:40,fontWeight:'bold',fontFamily:''}} >A</Text>
                                        </View>
                                    </TouchableOpacity>
                                    }

                                </View>
                                </View>
                                )}
                            />
                            <View style={{alignItems:'center'}} >
                    <TouchableOpacity onPress={()=>{this.uploadData(this.state.attendanceData)}}>
                    <View style={{width:width/2.1,justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:20,fontWeight:'bold',fontFamily:''}}>SAVE</Text>
                    </View>
                    
                    </TouchableOpacity>
                    </View>
            </View>
        );
    }
}
