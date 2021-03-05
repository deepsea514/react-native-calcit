import React, { useState, useEffect } from 'react';

//api components
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

//custom components
import Button from '../../common/components/Button';
import Header from '../../common/components/App/Header';
import Entypo from 'react-native-vector-icons/Entypo';

//styles 
import styles from '../../common/styles/AuthStyles';
import Colors from '../../common/consts/Colors';

//redux imports
import { uploadCustomLogo, getCustomLogo } from '../../actions/ProjectActions';
import { connect } from 'react-redux';

//image viewer
import ImageViewer from 'react-native-image-zoom-viewer';

Entypo.loadFont();

//options passed to image picker
const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.2
    },
    quality: 0.2
};

function SettingsScreen(props) {

    //function to navigate to other screens
    let { uploadCustomLogo, customLogo, getCustomLogo } = props;

    //loading flag
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [displayImage, setDisplayImage] = useState([{
        props: {
            source: {
                uri: ''
            }
        }
    }]);

    useEffect(() => {
        getCustomLogo();
    }, []);

    //set uri to state when redux is updated to show
    //image in zoomable viewer
    useEffect(() => {
        setDisplayImage(
            [{
                url: customLogo.uri,
            }]
        )
    }, [customLogo]);

    //pick image
    function _pickImage() {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                setIsLoading(true);
                const source = { uri: Platform.OS === 'ios' ? response.uri : 'data:image/jpeg;base64,' + response.data };
                uploadCustomLogo(source);
                setIsLoading(false);
            }
        });
    }

    //delete image
    function deleteImage() {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this logo?",
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        uploadCustomLogo({
                            uri: ''
                        });
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View>
            <Header
                title="Settings"
                {...props}
            />
            <ScrollView contentContainerStyle={[styles.container]}>
                <View>
                    {/* header */}

                    <KeyboardAvoidingView enabled behavior="padding">
                        {/* form started*/}
                        <View style={[styles.formContainer]}>
                            <View style={[styles.textInputContainer]}>
                                <Text style={styles.labelText}>Upload Logo</Text>
                            </View>
                            {
                                customLogo?.uri ? (
                                    <TouchableOpacity
                                        style={customStyles.customLogo}
                                        onPress={() => {
                                            setIsModalVisible(true);
                                        }}
                                    >
                                        <Image
                                            style={customStyles.customLogo}
                                            source={customLogo}
                                        />
                                        <TouchableOpacity
                                            style={customStyles.deleteLogo}
                                            onPress={deleteImage}
                                        >
                                            <Entypo
                                                name="circle-with-cross"
                                                style={customStyles.deleteIcon}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ) : null
                            }
                            <View style={[styles.buttonContainer]}>
                                <Button
                                    title={customLogo.uri ? ("Replace") : ("Upload")}
                                    onPress={_pickImage}
                                    loading={isLoading}
                                    containerStyle={{
                                        maxWidth: 250,
                                        alignSelf: 'center'
                                    }}
                                />
                            </View>
                        </View>
                        {/* form ended */}
                    </KeyboardAvoidingView>

                </View>
            </ScrollView>

            <Modal visible={isModalVisible} transparent={true}>
                <ImageViewer
                    imageUrls={displayImage}
                    enableSwipeDown={true}
                    onSwipeDown={() => {
                        setIsModalVisible(false)
                    }}
                />
            </Modal>
        </View>
    )
}

const mapStateToProps = () => state => ({
    customLogo: state.Project.customLogo    //to get image from redux
});

const mapDispatchToProps = () => dispatch => ({
    uploadCustomLogo: (logo) => dispatch(uploadCustomLogo(logo)),    //to store image to redux
    getCustomLogo: (logo) => dispatch(getCustomLogo(logo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);


//custom styles
//for this component
const customStyles = StyleSheet.create({
    customLogo: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        position: 'relative',
        marginTop: 10,
        marginBottom: 20
    },
    customLogoContainer: {
    },
    deleteLogo: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        right: -10,
        backgroundColor: '#fff',
        height: 20,
        width: 20,
        borderRadius: 10
    },
    deleteIcon: {
        fontSize: 20,
        color: Colors.danger
    }
})