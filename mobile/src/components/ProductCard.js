import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');
const CARD_W = (width - 40) / 2;

export default function ProductCard({ product, onPress }) {
  const { toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styles.image} 
          resizeMode="cover"
          defaultSource={{ uri: 'https://images.nike.com/is/image/DotCom/DJ9151_001_A_PREM?wid=512&fmt=webp&resMode=sharp2' }}
        />
        {product.isTrending && (
          <View style={styles.trendBadge}>
            <Ionicons name="flash" size={10} color={colors.white} />
            <Text style={styles.trendText}>TRENDING</Text>
          </View>
        )}
        <TouchableOpacity 
          style={[styles.wishBtn, wishlisted && styles.wishBtnActive]} 
          onPress={() => toggleWishlist(product)}
        >
          <Ionicons name={wishlisted ? "heart" : "heart-outline"} size={14} color={wishlisted ? colors.brand : colors.gray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.category} numberOfLines={1}>
          {product.category.indexOf('Men ') === 0 ? product.category.substring(4) : product.category}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  imageWrap: {
    backgroundColor: '#F1F5F9',
    height: CARD_W * 1.1,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  trendBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.brand,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  wishBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishBtnActive: {
    backgroundColor: '#FFF0F0',
  },
  info: {
    padding: 12,
  },
  brand: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.gray,
    letterSpacing: 1.2,
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 2,
  },
  category: {
    fontSize: 11,
    color: colors.slate,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.brand,
  }
});
