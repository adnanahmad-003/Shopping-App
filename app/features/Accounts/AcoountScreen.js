import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity , BackHandler } from 'react-native';
import { persistor } from './../../store/index';

const UserScreen = () => {

  // Static user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, Anytown, USA 12345',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYOgVxLPZQlTUfG5XDL-uaQqJ03S3XEMx4xg&s',
  };
  const handleLogout = async () => {
    await persistor.purge(); // Clear the Redux store
    BackHandler.exitApp(); // Exit the app
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <View style={styles.infoSection}>
        <InfoItem title="Email" value={user.email} />
        <InfoItem title="Address" value={user.address} />
      </View>
      <TouchableOpacity style={{backgroundColor:'gray',alignItems:'center',padding:10,margin:10,borderRadius:8}}
      onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
    <Text style={{marginHorizontal:10}}>If you press logout the redux persistor will be cleared</Text>
    </ScrollView>
  );
};

const InfoItem = ({ title, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    color: '#333',
  },
});

export default UserScreen;