import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const SelectCategory = () => {
  const [selectedCategory, setselectedCategory] = useState({
    Name: 'Select Category',
    urlImage: require(`../../assets/categoryIcon/books.jpg`),
    select: '',
    Quantity: '',
    ScrollViewStatus: true,
    AddQuantityStatus: false,
    Categories: [
      {
        id: 1,
        Name: 'Catering/Restaurant/Event Management',
        urlImage: require(`../../assets/categoryIcon/resturant.jpg`),
        isSlected: false,
      },
      {
        id: 2,
        Name: 'Machine/Equipments/Spare Parts/Metals',
        urlImage: require(`../../assets/categoryIcon/machine.jpg`),
        isSlected: false,
      },
      {
        id: 3,
        Name: 'Textile/Garment/Fashion Accessories',
        urlImage: require(`../../assets/categoryIcon/books.jpg`),
        isSlected: false,
      },
      {
        id: 4,
        Name: 'Furniture/Home Furnishing',
        urlImage: require(`../../assets/categoryIcon/furniture.jpg`),
        isSlected: false,
      },
      {
        id: 5,
        Name: 'Books/Stationary/Toys/Gifts',
        urlImage: require(`../../assets/categoryIcon/books.jpg`),
        isSlected: false,
      },
    ],
  });

  const {Name, urlImage, Categories, select, ScrollViewStatus, Quantity} =
    selectedCategory;

  console.log('this', select, ScrollViewStatus, Quantity);

  return (
    <View style={styles.InputArea}>
      <View style={styles.selectedView}>
        <View style={styles.selectedViewText}>
          <Text style={styles.wrap} numberOfLines={1} ellipsizeMode={'tail'}>
            {Name}
          </Text>
        </View>

        <Image source={urlImage} width={45} style={styles.selectedViewImage} />
        <Text>Qty : {Quantity}</Text>
      </View>

      {!selectedCategory.AddQuantityStatus ? null : (
        <View>
          <Text style={styles.goodsInfo}>Goods Information</Text>
          <View style={styles.goodsType}>
            <Text style={styles.goodsTypeText}>Goods Type:</Text>
            <Text style={styles.goodsTypeName}>{Name}</Text>
          </View>
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>Quantity</Text>
            <TextInput
              placeholder={Quantity}
              style={styles.quantityTextInput}
              onChangeText={val =>
                setselectedCategory({
                  ...selectedCategory,
                  Quantity: val,
                })
              }
            />
          </View>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() =>
              setselectedCategory({
                ...selectedCategory,
                ScrollViewStatus: true,
                AddQuantityStatus: false,
              })
            }>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
      {!selectedCategory.ScrollViewStatus ? null : (
        <ScrollView horizontal={false} invertStickyHeaders={true}>
          {selectedCategory.Categories.map((Category, id) => {
            return (
              <View key={id} style={styles.categoryView}>
                <TouchableOpacity
                  style={styles.ScrollCategoryItem}
                  onPress={() =>
                    setselectedCategory({
                      ...selectedCategory,
                      Name: Category.Name,
                      select: Category.id,
                      urlImage: Category.urlImage,
                    })
                  }>
                  <View>
                    <Text
                      style={select === Category.id ? styles.toselected : null}>
                      {Category.Name}
                    </Text>
                  </View>
                </TouchableOpacity>
                {select === Category.id ? (
                  <TouchableOpacity
                    style={styles.categoryQuantity}
                    onPress={() =>
                      setselectedCategory({
                        ...selectedCategory,
                        ScrollViewStatus: false,
                        AddQuantityStatus: true,
                      })
                    }>
                    <Text style={styles.categoryQuantityText}>Add Qty.</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  InputArea: {
    flexDirection: 'row',
    marginTop: 'auto',
    backgroundColor: '#fff',
    height: 190,
  },
  wrap: {
    flex: 1,
    color: 'black',
  },

  selectedView: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#f9f9f9',
    // shadowOffset: {width: 50, height: 20},
    shadowColor: '#fff',
    shadowOpacity: 10,
    elevation: 15,
    zIndex: 9999,
    marginTop: -30,
    margin: 10,
    height: 120,
    width: 120,
    padding: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedViewText: {
    flexDirection: 'row',
  },
  selectedViewImage: {
    width: 80,
    height: 80,
  },

  selectedViewImageSelected: {
    width: 80,
    height: 80,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  ScrollCategoryItem: {
    padding: 5,
    justifyContent: 'center',
    width: '70%',
  },
  tempoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  toselected: {
    fontWeight: 'bold',
  },
  tempoImageSelected: {
    width: 80,
    height: 80,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  categoryView: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    marginBottom: 5,
  },
  categoryQuantity: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: '30%',
    margin: 5,
  },
  categoryQuantityText: {
    textAlign: 'center',
    color: 'white',
  },
  goodsInfo: {
    backgroundColor: '#f2b92e',
    textAlign: 'center',
    padding: 5,
  },
  goodsType: {
    flexDirection: 'row',
    marginTop: 10,
  },
  goodsTypeText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    borderLeftWidth: 5,
    borderLeftColor: 'green',
    paddingLeft: 8,
    textAlignVertical: 'center',
    width: '32%',
  },
  goodsTypeName: {
    width: '45%',
    fontSize: 15,
    marginLeft: 5,
  },
  quantity: {
    flexDirection: 'row',
    marginTop: 10,
  },
  quantityText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    borderLeftWidth: 5,
    borderLeftColor: 'red',
    paddingLeft: 8,
    textAlignVertical: 'center',
    width: '32%',
  },
  quantityTextInput: {
    backgroundColor: '#f9f9f9',
    width: '45%',
    elevation: 5,
  },
  okButton: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: '30%',
    padding: 5,
    color: 'white',
    alignItems: 'center',
  },
  okButtonText: {
    color: 'white',
  },
});
