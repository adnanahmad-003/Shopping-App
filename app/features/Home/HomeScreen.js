import React, { useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import useHomeController from './useHomeController';
import COLORS from './../../themes/COLORS'
import Rating from '../../commonContainers/Rating'
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { 
    products, 
    loading, 
    error, 
    fetchProducts, 
    handleAddToCart, 
    modalVisible, 
    selectedProduct, 
    openProductModal, 
    closeProductModal,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isInWishlist,
  } = useHomeController();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => openProductModal(item)}>
       <TouchableOpacity 
        style={styles.wishlistButton}
        onPress={() => isInWishlist(item.id) ? handleRemoveFromWishlist(item.id) : handleAddToWishlist(item)}
      >
        <Text style={styles.buttonText}>
          {isInWishlist(item.id) ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Rating rate={item.rating.rate} count={item.rating.count} />
      <Text style={styles.productPrice}>Rs. {item.price}</Text>
      <Text>Category: {item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProductModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeProductModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedProduct && (
            <>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              <View style={styles.desCont}>
              <Text style={styles.desTitle}>Description: </Text>
              <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
              </View>
              <View style={styles.bottomButtons}>
              <TouchableOpacity 
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(selectedProduct)}
              >
                <MaterialIcons name="shopping-cart" size={18} color="#fff" />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeProductModal}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Shopping</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
      {renderProductModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    backgroundColor: COLORS.blue,
    paddingVertical:10
  },
  headerText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'600'
  },
  productList: {
    padding: 10,
  },
  productDetails:{
   width:'60%'
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    padding:10,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    width:'90%'
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight:'bold'
  },
  modalContainer: {
    flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
    flex:1
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:10
  },
  closeButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft:10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft:3
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  desCont:{
   flexDirection:'row',
   justifyContent:'flex-start'
  },
  desTitle:{
  },
  bottomButtons:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  wishlistButton: {
    position:'absolute',
    top:5,
    right:5
  },
});

export default HomeScreen;