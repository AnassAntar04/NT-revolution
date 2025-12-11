import React from 'react';

export default function Show({ product }) {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      <p><b>Référence :</b> {product.reference}</p>
      <p><b>Catégorie :</b> {product.category}</p>
      <p><b>Titre :</b> {product.title}</p>
      <p><b>Description :</b> {product.description}</p>
      <p><b>Prix :</b> {product.price} DH</p>
      <p><b>État :</b> {product.state}</p>
      <p><b>Garantie :</b> {product.warranty}</p>

      {/* Images */}
      <h2 className="text-xl font-semibold mt-4">Images</h2>
      <div className="flex gap-4 flex-wrap">
        {Array.isArray(product.images) && product.images.map((img, i) => (
          <img
            key={i}
            src={`/storage/${img}`}
            alt={`Image ${i+1}`}
            className="w-32 h-32 object-cover rounded"
          />
        ))}
      </div>

      {/* Specifications */}
      <h2 className="text-xl font-semibold mt-6">Fiche technique</h2>
      <ul className="list-disc ml-4">
        {product.specifications.map((s, i) => (
          <li key={i}>{s.key} : {s.value}</li>
        ))}
      </ul>
    </div>
  );
}
