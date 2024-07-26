// CartScreen.js
import React,{useState} from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity ,Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart ,  clearCart} from '../../store/slices/cartSlice';
import COLORS from '../../themes/COLORS';
import LottieView from 'lottie-react-native';

const CartScreen = () => {
  const [celebrationModalVisible, setCelebrationModalVisible] = useState(false);
  const cartItems = useSelector(state => state.cart);
  const isCartEmpty = cartItems.length === 0;
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleBuyNow = () => {
    setCelebrationModalVisible(true);
    dispatch(clearCart());
  };

  const handleCloseModal = () => {
    setCelebrationModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
    </View>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //console.log(cartItems)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Your Cart</Text>
      </View>
      {isCartEmpty && <Text style={{textAlign:'center'}}>Cart is empty</Text>}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {!isCartEmpty && (<View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: Rs {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>)}
      <Modal
        animationType="slide"
        transparent={true}
        visible={celebrationModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
               source={require('../../assets/celebration.json')}
              autoPlay
              loop={true}
              style={styles.celebrationAnimation}
            />
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.orderPlacedText}>Your order has been placed</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buyNowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  celebrationAnimation: {
    width: 200,
    height: 200,
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
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
  },
  orderPlacedText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CartScreen;