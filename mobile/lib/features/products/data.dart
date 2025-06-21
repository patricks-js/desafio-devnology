import 'dart:convert';

List<Product> productFromJson(String str) =>
    List<Product>.from(json.decode(str).map((x) => Product.fromJson(x)));

class Product {
  final String id;
  final String name;
  final String description;
  final String category;
  final List<String> imagesUrl;
  final int price;
  final String material;
  final String department;
  final bool hasDiscount;
  final int? discountPercentage;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.category,
    required this.imagesUrl,
    required this.price,
    required this.material,
    required this.department,
    required this.hasDiscount,
    this.discountPercentage,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      category: json['category'],
      imagesUrl: List<String>.from(json['imagesUrl']),
      price: json['price'],
      material: json['material'],
      department: json['department'],
      hasDiscount: json['hasDiscount'],
      discountPercentage: json['discountPercentage'],
    );
  }
}

class ProductFilters {
  final List<String> categories;
  final List<String> materials;
  final List<String> departments;
  final int? minPrice;
  final int? maxPrice;

  ProductFilters({
    required this.categories,
    required this.materials,
    required this.departments,
    this.minPrice,
    this.maxPrice,
  });

  factory ProductFilters.fromJson(Map<String, dynamic> json) {
    return ProductFilters(
      categories: List<String>.from(json['categories']),
      materials: List<String>.from(json['materials']),
      departments: List<String>.from(json['departments']),
      minPrice: json['minPrice'],
      maxPrice: json['maxPrice'],
    );
  }
}
