import { useState, useCallback, useMemo } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import HomeModel from './useHomeModel';
import { addToCart } from '../../store/slices/cartSlice';
import { ToastAndroid } from 'react-native';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlishSlice';

const useHomeController = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const wishlist = useSelector(state => state.wishlist);

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await HomeModel.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }, []);

  const closeProductModal = useCallback(() => {
    setModalVisible(false);
    setSelectedProduct(null);
  }, []);

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    ToastAndroid.show('Item Added to Cart', ToastAndroid.SHORT)
    setModalVisible(false);
  }, [dispatch]);

  const memoizedProducts = useMemo(() => products, [products]);

  return {
    products: memoizedProducts,
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
    isInWishlist
  };
};

export default useHomeController;