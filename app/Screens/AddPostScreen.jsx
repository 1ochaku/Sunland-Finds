import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection, addDoc} from "firebase/firestore";
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import placeholderImage from './../../assets/forSale/placeholder-images.webp';
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const [categoryList, setCategoryList] = useState([]);
    const storage = getStorage();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategoryList();
    }, []);

    const { user } = useUser();
    const getCategoryList = async () => {
        try {
            // console.log("Getting documents...");
            const querySnapshot = await getDocs(collection(db, 'Category'));
            // console.log("Documents fetched: ", querySnapshot.docs.length);
            
            // Transform the query snapshot into an array of objects
            let categories = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { name: Object.keys(data)[0], imageUrl: data[Object.keys(data)[0]] };
            });

            // Prepend the "Select a category" option to the categories array
            categories.unshift({ name: 'Select a category', imageUrl: 'nil' });

            setCategoryList(categories);
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setImage(null); // Set image to null to show placeholder
    };

    const onSubmitMethod = async (values, { resetForm }) => {
        values.image = image;
        //console.log(values);
        
        if (!values.productName || !values.desc || !values.category || !values.address || !values.price || !values.image) {
            // console.log("One or more fields are missing.");
            ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
            return; // Exit early if any field is missing
        }
        
        setLoading(true);
        
        // Adding the data to database (firebase)
        // convert uri to blob file (??)
        const resp = await fetch(image);
        const blob = await resp.blob();
        const storageRef = ref(storage, 'craftPost/' + Date.now() + '.jpg');
        
        //getting the url back
        uploadBytes(storageRef, blob).then((snapshot) => {
            // console.log('uploaded a blob or file');
        }).then((resp) => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                console.log(downloadUrl);
                values.image = downloadUrl;
                values.userName = user.fullName;
                values.userEmail = user.primaryEmailAddress.emailAddress;
                values.userImage = user.imageUrl;

                {console.log(values)}

                //now uploading 
                const docRef = await addDoc(collection(db, "UserPost"), values);
                if (docRef.id) {
                    Alert.alert('Good Job! People will love your craft!')
                    setLoading(false);
                    // console.log("Document Added!");
                }
            })
        });

        resetForm({ productName: '', desc: '', category: '', address: '', price: '', image: '' });
        setImage(null);
    };

    return (
        <GestureHandlerRootView>
            <View className="p-10">
                <Text className="text-[27px] font-bold mt-2">Add an Item to Sell</Text>
                <Text className="text-[17px] text-gray-500 mb-1">Share your crafting skills to the World!</Text>
            </View>
            <ScrollView>
                <View className="p-10 bg-white flex-1">
                    <Formik
                        initialValues={{ productName: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: ''}}
                        onSubmit={onSubmitMethod}
                    >
                        {({ handleChange, handleSubmit, values}) => (
                            <View>
                                <View style={{borderWidth:1, borderRadius:15, marginTop:-15, width:102, height:102}}>
                                    <TouchableOpacity onPress={pickImage}>
                                        <Image
                                            source={image ? { uri: image } : placeholderImage}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>
                                    {image && (
                                        <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
                                            <Text style={styles.removeButtonText}>x</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={{borderWidth:1, borderRadius:10, marginTop:15}}>
                                    <Picker
                                        selectedValue={values.category}
                                        onValueChange={handleChange('category')}
                                    >
                                        {categoryList && categoryList.map((item, index) => (
                                            <Picker.Item key={index} label={item.name} value={item.name} />
                                        ))}
                                    </Picker>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Product Name'
                                    value={values.productName}
                                    onChangeText={handleChange('productName')}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Description'
                                    value={values.desc}
                                    numberOfLines={5} 
                                    multiline={true}
                                    onChangeText={handleChange('desc')}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Price'
                                    value={values.price}
                                    keyboardType='number-pad'
                                    onChangeText={handleChange('price')}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Address'
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                />
                                <TouchableOpacity onPress={handleSubmit}
                                    className="p-4 bg-blue-400 rounded-full mt-10"
                                    style={{backgroundColor: loading ? '#ccc' : '#60A5FA'}}
                                        disabled={loading}>
                                    {loading ?
                                        <ActivityIndicator color={'#fff'} />
                                        :
                                        <Text className="text-white text-center text-[16px]">Submit</Text>
                                        }
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom:5,
        marginTop:15,
        paddingHorizontal: 17,
        textAlignVertical: 'top',
        fontSize: 17,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    removeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});
