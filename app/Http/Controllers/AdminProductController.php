<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductSpecification;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    public function index()
    {
        $products = Product::with('specifications')->get();
        return inertia('Admin/Products/Index', compact('products'));
    }

    public function create()
    {
        return inertia('Admin/Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'reference' => 'required|string|unique:products',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'state' => 'required|string',
            'warranty' => 'nullable|string',
            'images.*' => 'nullable|image|max:2048', // chaque image max 2MB
            'specifications' => 'nullable|array',
            'specifications.*.key' => 'required_with:specifications|string',
            'specifications.*.value' => 'required_with:specifications|string',
        ]);

        // Upload des images
        $imagesPaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $img) {
                $imagesPaths[] = $img->store('products', 'public');
            }
        }

        // Création du produit
        $product = Product::create([
            'name' => $request->name,
            'category' => $request->category,
            'reference' => $request->reference,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'state' => $request->state,
            'warranty' => $request->warranty,
            'images' => $imagesPaths, // array enregistré automatiquement
        ]);

        // Ajouter les spécifications
        if ($request->filled('specifications')) {
            foreach ($request->specifications as $spec) {
                ProductSpecification::create([
                    'product_id' => $product->id,
                    'key' => $spec['key'],
                    'value' => $spec['value'],
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Produit ajouté avec succès');
    }

    public function show(Product $product)
    {
        $product->load('specifications');
        return inertia('Admin/Products/Show', compact('product'));
    }

    public function edit(Product $product)
    {
        $product->load('specifications');
        return inertia('Admin/Products/Edit', compact('product'));
    }

   public function update(Request $request, Product $product)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'reference' => 'required|string|max:255',
        'title' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'state' => 'nullable|string',
        'warranty' => 'nullable|string',
        'images.*' => 'nullable|image|max:2048',
    ]);

    // Décoder images existantes envoyées en JSON
    $existingImages = $request->existingImages ? json_decode($request->existingImages, true) : [];

    // Gérer nouvelles images
    $newImages = [];
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $img) {
            $newImages[] = $img->store('products', 'public');
        }
    }

    $product->update([
        'name' => $request->name,
        'category' => $request->category,
        'reference' => $request->reference,
        'title' => $request->title,
        'description' => $request->description,
        'price' => $request->price,
        'state' => $request->state,
        'warranty' => $request->warranty,
        'specifications' => $request->specifications ? json_decode($request->specifications, true) : [],
        'images' => array_merge($existingImages, $newImages),
    ]);

    return redirect()->route('admin.products.index')->with('success', 'Produit mis à jour.');
}







    public function destroy(Product $product)
    {
        $product->specifications()->delete();
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé avec succès');
    }
}
