import { StyleSheet , View, Text,TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Comment(props){
    const deleteComment = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status !== 200) {
                return;
            } else {
                setComments(
                    comments.filter((comment) => {
                        return comment.id !== id;
                    })
                );
            }
        })
            .catch((error) => console.log(error));
    }
    return(
        <View style={styles.container}>
            <Text style={styles.item_name}>{props.coms.name}</Text>
            <Text style={styles.item_mail}>{props.coms.email}</Text>
            <Text style={styles.item_body}>{props.coms.body}</Text>
            {/* <TouchableOpacity onPress={()=>editComment(props.coms.id)}>
                <Icon name='edit' size={25} color='blue' />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>deleteComment(props.coms.id)}>
                <Icon name='delete' size={25} color='red' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding : 20,
        borderRadius : 10,
        backgroundColor : '#f5f5f5',
        marginVertical : 10
    },
    item_name:{
        color : '#52b2bf',
        fontWeight: 'bold'
    },
    item_mail:{
        color : "#787276"
    },
    buttonView : {
        margin : 30
    },
    button : {
        margin:30
    }
})