package com.example.farhat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;

    private String description;

    @Min(value = 0, message = "Quantity must be zero or positive")
    @Column(nullable = false)
    private int quantity;

    @Min(value = 0, message = "Price must be zero or positive")
    @Column(nullable = false)
    private double price;

    // Uhusiano wa Product na User (Many Products kwa User 1)
   @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

}
