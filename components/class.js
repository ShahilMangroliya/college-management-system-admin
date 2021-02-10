import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,ActivityIndicator,Image,ImageBackground,FlatList,Modal,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
//   } from "react-native-chart-kit";
var x
var data=[]
export default class Class extends Component{
    state={
        plus:false,
        subName:'',
        name:'',
        email:'',
        subData:[],
        isFetching:false,
        isLoading:false

    }
    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }

      async componentDidMount(){
          x = await firebase.auth().currentUser.uid
        //   x = await 
         await firebase.database().ref("users").on("value",datasnap=>{
            this.setState({name:datasnap.val()[x].name,email:datasnap.val()[x].email})
        })
        this.fetchData()
        // this.fetchData()
        console.log();
      }

      createClass = async () => {
        this.setState({isFetching:true,isLoading:true,plus:false})

       await firebase.database().ref("classes" +'/'+ this.state.subName +'/Attendance/'+this.state.name).set({
            name:this.state.name,
            total:0,
            subName:this.state.subName
        })
        .then(
            firebase.firestore().collection('classes')
            .doc(this.state.email)
            .get()
              .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    firebase.firestore().collection('classes')
                    .doc(this.state.email)
                    .update({
                        subjects: firebase.firestore.FieldValue.arrayUnion({subName:this.state.subName})
                    })

                }
                else{
                    firebase.firestore().collection('classes')
                    .doc(this.state.email)
                    .set({
                    subjects:[{subName:this.state.subName}]
                    })

                }
            })
        )

         await firebase.firestore().collection('TotalClasses')
          .doc(this.state.subName)
          .get()
            .then((docSnapshot) => {
              if (docSnapshot.exists) {
                    firebase.firestore().collection('TotalClasses')
                    .doc(this.state.subName)
                    .update({
                        fname: firebase.firestore.FieldValue.arrayUnion({fname:this.state.name})
                    })
                  }
              else{
                    firebase.firestore().collection('TotalClasses')
                    .doc(this.state.subName)
                    .set({
                      fname:[{fname:this.state.name}]
                    })
              }
            })
        this.setState({plus:false,isLoading:false})
        this.fetchData()
        // setTimeout(this.fetchData(), 2000)
        // this.fetchData()

      }

      fetchData = async () => {
          this.setState({isFetching:true})
          var data=[]
        var k=0
       await firebase.firestore().collection('classes')
        .doc(this.state.email)
        .get()
          .then((docSnapshot) => {
            //   console.log(docSnapshot.data());
              for (var i in docSnapshot.data()){
                 for (var j in  docSnapshot.data()[i]){
                //  console.log(j);
                data.push({
                  'id': k.toString(),
                  'subName':docSnapshot.data()[i][j].subName

                })

              k+=1
              }
            }

          })
        // .then()
        this.setState({subData:data})
          // console.log(this.state.subData);
        this.setState({plus:false,isFetching:false})

      }



    render(){
        return(
            <View style={{flex:1}}>
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
                  style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}
                  />
                <Text style={{color:'#4285F4',alignSelf:'center',margin:10,fontWeight:'bold',fontFamily:'',fontSize:35}}>CLASSES</Text>
             <View style={{alignItems:'center',flex:1}}>

                            <FlatList
                            style={{elevation:2}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.subData}
                                // horizontal
                                // inverted
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Inclass',{item:item.subName})}}>
                                    <Text style={{color:'white',width:width-60,margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.subName}</Text>
                                </TouchableOpacity>
                                </View>
                                )}
                            />





             </View>
             <Modal animationType='slide' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
             <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{    margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{margin:10,borderRadius:30,borderWidth:4,borderColor:'black',justifyContent:'center',width:width-30,height:60}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='blackboard' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                            {/* <Feather name='activity' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30}/> */}
                          </View>
                        <TextInput style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'black',opacity:0.80,}}
                            placeholder='Enter Class Name'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({subName:text})}
                            />
                        </View>
                              <View style={{flexDirection:'row'}}>
                              <TouchableOpacity onPress={() => {this.setState({plus:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'black',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "black",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => {this.createClass()}}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'black',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "black",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Save</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
             </Modal>
              <View style={{position:'absolute',marginLeft:width-80,marginTop:height-150}}>
                  <TouchableOpacity onPress={()=>{console.log('+'),this.setState({plus:true})}}>
                      <AntDesign name='pluscircle' style={{color:'#F9C04D'}} size={50} />
                  </TouchableOpacity>
              </View>
                                
            </View>
        );
    }
}