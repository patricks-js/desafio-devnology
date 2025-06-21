import 'package:flutter/material.dart';
import 'package:mobile/features/products/screens/home.dart';

void main() {
  runApp(
    MaterialApp(
      title: "Home",
      home: Scaffold(
        appBar: AppBar(
          title: Text(
            "Devnology",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        body: const Home(),
        // bottomNavigationBar: ,
      ),
    ),
  );
}

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return HomeScreen();
  }
}
