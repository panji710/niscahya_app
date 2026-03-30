<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'category',
        'image',
        'description',
        'specifications',
        'is_featured'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'specifications' => 'array',
        'is_featured' => 'boolean',
    ];

    // Scope untuk produk unggulan
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope untuk filter kategori
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
