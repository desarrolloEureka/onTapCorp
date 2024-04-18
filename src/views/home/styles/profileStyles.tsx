import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
    containerPhoto: {
        height: 220,
        //backgroundColor: '#de3e5c',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    containerPhotoCircle: {
        height: "90%",
        width: "85%",
        backgroundColor: '#030124',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    container: {
        height: "75%",
        width: "45%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerEdit: {
        height: "80%",
        width: "85%",
        position: 'absolute',
        //backgroundColor: 'blue',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    containerPencil: {
        height: "30%",
        width: "25%",
        //backgroundColor: "yellow",
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderTargetName: {
        height: "90%",
        width: "100%",
        backgroundColor: '#030124',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textName: {
        color: "white",
        fontSize: 17
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
    },

    input: {
        height: 50,
        width: "90%",
        fontSize: 16,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#9b9db3',
        marginBottom: 8,
        paddingLeft: 20,
    },

    inputBox: {
        height: "100%",
        width: "95%",
        fontSize: 15,
        color: 'black',
        marginBottom: -5,
        //paddingLeft: 1,
    },

    textArea: {
        height: 100,
        width: "90%",
        fontSize: 16,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#9b9db3',
        marginBottom: 8,
        paddingLeft: 20,
    },

    label: {
        color: '#396593',
        fontSize: 14,
        marginTop: 0,
        //marginRight: 170
    },

});
