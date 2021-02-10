import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,ImageBackground} from 'react-native'
const {width,height} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import YoutubePlayer from "react-native-youtube-iframe";
// var data;

    // const playerRef = useRef();
    var x

export default class Inclass extends Component{
    state={
        name:'',
        email:'',

    }
    //  playerRef = useRef();
   async componentDidMount(){


    // var video_id ='https://www.youtube.com/watch?v=0-S5a0eXPoc&t=31s'.split('v=')[1];
    // var ampersandPosition = video_id.indexOf('&');
    // if(ampersandPosition != -1) {
    //   video_id = video_id.substring(0, ampersandPosition);
    // }
    // console.log(video_id);


    //    console.log(width);
        // console.log(this.props.route.params.item);
        x = await firebase.auth().currentUser.uid
        //   x = await 
         await firebase.database().ref("users").on("value",datasnap=>{
            this.setState({name:datasnap.val()[x].name,email:datasnap.val()[x].email})
        })
    //    this.fetchData()
    }

    fetchData(){
        firebase.database().ref("classes" +'/'+ this.props.route.params.item +'/Attendance/'+this.state.name).on("value",datasnap=>{
            console.log(datasnap.val());
        

            
        })
    }
    attendance(){
        // this.props.nav
        this.props.navigation.navigate('Attendance',{x:x,name:this.state.name,subName:this.props.route.params.item})
    }
    vMaterial(){
        this.props.navigation.navigate('VideoMaterial',{x:x,name:this.state.name,subName:this.props.route.params.item})

    }
    pMaterial(){
        this.props.navigation.navigate('PdfMaterial',{x:x,name:this.state.name,subName:this.props.route.params.item})

    }    
    oLink(){
        this.props.navigation.navigate('OnlineLink',{x:x,name:this.state.name,subName:this.props.route.params.item})

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
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:width/13}}>{this.props.route.params.item}</Text>
                    </View>
                    <View style={{marginTop:40}} />
                    <TouchableOpacity onPress={()=>{this.attendance()}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>Attendance</Text>
                    </View>
                    </TouchableOpacity>

                    <View style={{marginTop:20}} />
                    <TouchableOpacity onPress={()=>{this.vMaterial()}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>Video Material</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{marginTop:20}} />
                    <TouchableOpacity onPress={()=>{this.pMaterial()}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>PDF Material</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{marginTop:20}} />
                    <TouchableOpacity onPress={()=>{this.oLink()}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>Online Lecture Link</Text>
                    </View>
                    </TouchableOpacity>

            </View>
        );
    }
}