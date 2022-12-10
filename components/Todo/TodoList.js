import { StyleSheet, View, Text, 
    SafeAreaView , TouchableOpacity, 
    Modal, FlatList, TextInput, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import AddTodo from './AddTodo';
import Todo from './Todo';


const DATA = [
{ id : 1 , item: 'Todo'},
{ id : 2, item: 'Another todo'}
]

function TodoList(){

const [data , setData] = useState(DATA)
const [isRender , setIsRender] = useState(false);
const [isModalVisible , setIsModalVisible] = useState(false);
const [inputText , setInputText] = useState();
const [editItem , setEditItem] = useState();
const [inputSearch, setInputSearch] = useState('');
const [searchTodo, setSearchTodo] = useState(data);

const handleSearchItem = e =>{
   setInputSearch(e);
   if(inputSearch !== ""){
       const res = data.filter((todo) =>{
           return todo.item.toLowerCase().includes(inputSearch.toLowerCase())
       })
       setSearchTodo(res)
     } else{
       setSearchTodo(data)
   }
   
}

const handleEditItem = () =>{
   const newData = data.map(item => {
       if(item.id == editItem){
           item.item = inputText;
           return item ; 
       }
       return item ; 
   })
   setData(newData);
   setIsRender(!isRender);
}

const onPressSaveEdit = () =>{
   handleEditItem(editItem);
   setIsModalVisible(false);
}

const onPressItem = (item) => {
   setIsModalVisible(true);
   setInputText(item.item);
   setEditItem(item.id);
}

const handleSubmit = (todo) =>{
   // setData([...data, todo]);
   setSearchTodo([...data, todo]);
   // setFilteredTodo([...data , todo]);
}

const deleteTodo = (todoId) => {
   const newTodo = data.filter(item => item.id != todoId);
   setSearchTodo(newTodo);
   // setFilteredTodo(data);
}



useEffect(() => {
   setSearchTodo(data);           
}, []);

return(
   <SafeAreaView style={styles.container}>

       <TextInput style={styles.textInputStyle}
                           onChangeText={(text) => handleSearchItem(text)}
                           defaultValue={inputText}
                           editable={true}
                           multiline={false}
                           maxLength={200}/>
      
        <View style={{padding : 20, paddingBottom:100}}>
           <ScrollView>
               { searchTodo && searchTodo.length >0 ? (

                   searchTodo.map(item =>{
                       return (
                           <Todo key={item.id} onDelete={() => deleteTodo(item.id)} item={item} onPress={onPressItem}/>                       
                       );
                   })
               ) : (<Text>No Task </Text>)
               }
           </ScrollView>
        </View>
       
        {/* </View> */}
        
       <Modal animationType='fade'
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}>
               <View style={styles.modalView}>
                   <TextInput style={styles.textInput}
                           onChangeText={(text) => setInputText(text)}
                           defaultValue={inputText}
                           editable={true}
                           multiline={false}
                           maxLength={200}/>
                   <TouchableOpacity
                     onPress={() => onPressSaveEdit()}
                     style={styles.touchableSave}>
                         <Text style={styles.text}>Save</Text>
                   </TouchableOpacity>
                   
               </View>
       </Modal>
       <View style={styles.footer}>
           <AddTodo onSubmit={handleSubmit}/>
       </View>
   </SafeAreaView>
   
)
}

const styles = StyleSheet.create({
container : {
   flex : 1,
   backgroundColor : '#E8EAED'
},

todoWrapper :{
   paddingHorizontal : 20,
   paddingTop : 80
},

footer :{
   position : 'absolute',
   bottom : 0,
   width : '100%',
   flexDirection : 'row',
   alignItems : 'center',
   paddingHorizontal: 20
},

listItem : {
   // padding : 20,
   paddingTop : 15,
   paddingHorizontal: 15,
   backgroundColor : '#fff',
   flexDirection : 'row',
   elevation : 12,
   borderRadius : 7,
   marginVertical : 10
},
textInput: {
   width : '90%',
   height : 70,
   borderColor : 'grey',
   borderWidth : 1,
   fontSize : 25
} , 

modalView : {
   flex : 1,
   alignItems : 'center',
   justifyContent : 'center'
} , 

touchableSave : {
   backgroundColor : '#428AF8',
   paddingHorizontal : 100,
   alignItems : 'center',
   marginTop : 20,
   padding : 20
},
textInputStyle : {
   height: 40,
   borderWidth: 1,
   paddingLeft: 20,
   margin: 5,
   borderColor: '#009688',
   backgroundColor: '#FFFFFF',
}
})

export default TodoList;