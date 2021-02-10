import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,FlatList,Dimensions,Image,ImageBackground} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import {Avatar} from 'react-native-paper'
var data = require('./data/faculty.json');

export default class Faculty extends Component{
    state={
        data:[],
        temp:true,
        isFetching:false,
    }
    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
     async componentDidMount(){
       await this.fetchData()
       this.setState({temp:false})

      }




       fetchData = async () => {
        this.setState({isFetching:true})
        var data=[]
        await firebase.firestore()
         .collection('facultyData')
         .get()
         .then(snapshot => {
             snapshot.forEach(doc=>{
                //  console.log(doc.data().details);

                data.push(doc.data())
             })
         })
         // .then(this.setState({plus:false}))
            .catch((error)=>console.log(error))
            console.log(this.state.data);
        this.setState({data:data})
        // console.log();
            this.setState({isFetching:false})
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
                <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}/>
                        <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>FACULTY DETAILS</Text>
                        <FlatList
                            // style={{h,backgroundColor:'white'}}                            
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.data}
                                // horizontal
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ flex:1,borderBottomColor:'#757575',borderBottomWidth:1,paddingBottom:20,paddingTop:0}}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('FacultyData',{ item:item})}>

                                        <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                                            <Avatar.Image source={{uri:item.image}} style={{marginTop:20}} size={80} />
                                            <View style={{marginLeft:10,marginTop:15}}>
                                            <Text style={{color:'#fff',fontSize:19}}>{item.name}</Text>
                                            <Text style={{color:"#fff",opacity:0.6}}>{item.email}</Text>
                                            </View>

                                        </View>





                                        </TouchableOpacity>

                                    </View>
                                )}
                        />

            </View>
            // <Text>about</Text>
        );
    }
}