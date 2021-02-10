import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('window')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import CalendarPicker from 'react-native-calendar-picker';
// import Moment from 'react-moment';

// var data;
var p=0
var x

export default class CheckAttendance extends Component{
    state={
        name:this.props.route.params.name,
        subName:this.props.route.params.subName,
        sData:this.props.route.params.sData,
        tLectures:this.props.route.params.tLectures,
        present:'',
        aData:[]
        // overAll:'',

    }
   async componentDidMount(){
        // console.log(this.props.route.params);
    //     x = await firebase.auth().currentUser.uid
    //     //   x = await 
    //      await firebase.database().ref("users").on("value",datasnap=>{
    //         this.setState({name:datasnap.val()[x].name,email:datasnap.val()[x].email})
    //     })
       this.fetchData()
    }
    timeToDate(date){
        var temp =new Date(date)
        var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
        var date=(temp.getDate())+'-'+(temp.getMonth()+1)+'-'+temp.getFullYear()+' '+ weekday[temp.getDay()]

        return date
    }

    fetchData(){
        p=0
        var data=[]
        firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name+'/'+this.state.sData.enrollment)
        .on("value",datasnap=>{
            for(var i in datasnap.val()){
                console.log(i);
                if(parseInt(i)>0){
                    if(datasnap.val()[i]['A'])
                    p+=1
                    data.push({
                        "date":this.timeToDate(parseInt(i)).toString(),
                        "Attendance":datasnap.val()[i]['A']
                    })
                    // console.log(datasnap.val()[i]);
                }
            }
            // console.log(datasnap.val());
        })
        // .then(
            console.log(data,p)
            this.setState({present:p,aData:data.reverse()})
        
    }
    // attendance(){
    //     // this.props.nav
    //     this.props.navigation.navigate('Attendance',{x:x,name:this.state.name,subName:this.props.route.params.item})
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
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/6,fontFamily:'',fontSize:width/13}}>Check Attendance</Text>
                    </View>
                    {/* <View style={{marginTop:}} /> */}
                    {/* <TouchableOpacity onPress={()=>{}}> */}
                    {/* <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>{this.state.present}/{this.state.tLectures} = {(this.state.present/this.state.tLectures*100).toFixed(2)}%</Text>
                    </View> */}
                    
                    {/* </View> */}
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#65B34D',fontWeight:'bold',fontFamily:'',fontSize:25}}>Present: {this.state.present}</Text>
                    <Text style={{color:'#CB3C3A',fontWeight:'bold',fontFamily:'',fontSize:25}}>  Absent: {parseInt(this.state.tLectures)-parseInt(this.state.present)}</Text>
                    </View>
                    <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center',color:'white',fontFamily:''}}>Total {(this.state.present/this.state.tLectures*100).toFixed(2)}%</Text>

                            <FlatList
                                style={{elevation:2,height:height-250}}                  
                                data={this.state.aData}
                                // inverted
                                // keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,width:width-20,alignSelf:'center',borderBottomWidth:0.5,flexDirection:'row',padding:5,alignItems:'center',borderBottomColor:'white'}}>
                                {/* <TouchableOpacity onPress={()=>{}}> */}
                                    <Text style={{color:'white',margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.date}</Text>
                                {/* <View style={{marginLeft:width/2}} /> */}
                                {/* <FontAwesome5 name='user-alt' style={{color:'red',}} size={35} /> */}
                                <View style={{width:width-40,alignItems:'flex-end',position:'absolute'}}>
                                    {item.Attendance&&
                                    // <TouchableOpacity onPress={()=>{this.preToAbsent(item)}}>
                                        <View style={{height:50,width:50,margin:2,borderRadius:10,alignItems:'center',alignSelf:'flex-end',justifyContent:'center',elevation:5,backgroundColor:'#65B34D'}}>
                                            <Text style={{color:'white',fontSize:40,fontWeight:'bold',fontFamily:''}} >P</Text>
                                        </View>
                                    // </TouchableOpacity>
                                    }
                                </View>
                                <View style={{width:width-40,alignItems:'flex-end',position:'absolute'}}>
                                    {item.Attendance==false&&
                                    // <TouchableOpacity onPress={()=>{this.absToPresent(item)}}>
                                        <View style={{height:50,width:50,margin:2,borderRadius:10,alignItems:'center',justifyContent:'center',elevation:5,backgroundColor:'#CB3C3A'}}>
                                            <Text style={{color:'white',fontSize:40,fontWeight:'bold',fontFamily:''}} >A</Text>
                                        </View>
                                    // </TouchableOpacity>
                                    }

                                </View>
                                </View>
                                )}
                            />
            </View>
        );
    }
}