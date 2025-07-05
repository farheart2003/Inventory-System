package com.example.farhat.service;

import com.example.farhat.model.Product;
import com.example.farhat.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    // Ongeza product mpya
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Pata list ya products zote
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Pata product kwa id
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Pata products kwa user id
    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findByUserId(userId);
    }

    // Hariri product
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setQuantity(updatedProduct.getQuantity());
                    product.setPrice(updatedProduct.getPrice());
                    product.setUser(updatedProduct.getUser());
                    return productRepository.save(product);
                }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Futa product
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
