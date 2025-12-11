<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name','category',
        'images', 'reference', 'title', 'description',
        'price', 'state', 'warranty'
    ];

    // Relations
    public function specifications() {
        return $this->hasMany(ProductSpecification::class);
    }

    public function favorites() {
        return $this->hasMany(Favorite::class);
    }

    public function cartItems() {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }
    protected $casts = [
    'images' => 'array'
];

}
