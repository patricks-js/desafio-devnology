import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/features/products/data.dart';

class ApiServices {
  static const String url = "http://10.0.2.2:3000/api/products";

  Future<List<Product>> getProducts() async {
    try {
      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        final List<dynamic> productListJson = responseData['data'];

        return productListJson.map((json) => Product.fromJson(json)).toList();
      } else {
        throw Exception(
          'Falha ao carregar os produtos. Status: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception("Failed to load products: $e");
    }
  }
}
