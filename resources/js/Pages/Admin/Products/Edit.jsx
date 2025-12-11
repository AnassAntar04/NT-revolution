import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ product }) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name || '',
    category: product.category || '',
    reference: product.reference || '',
    title: product.title || '',
    description: product.description || '',
    price: product.price || 0,
    state: product.state || '',
    warranty: product.warranty || '',
    images: [],
    existingImages: product.images || [],
    specifications: product.specifications || []
  });

  const addSpec = () =>
    setData('specifications', [...data.specifications, { key: '', value: '' }]);
  const updateSpec = (index, field, value) => {
    const specs = [...data.specifications];
    specs[index][field] = value;
    setData('specifications', specs);
  };
  const removeSpec = (index) =>
    setData('specifications', data.specifications.filter((_, i) => i !== index));

  const removeExistingImage = (index) =>
    setData('existingImages', data.existingImages.filter((_, i) => i !== index));
  const handleImages = (e) => setData('images', [...e.target.files]);

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Champs texte obligatoires
    ['name', 'category', 'reference', 'title', 'description', 'price', 'state', 'warranty']
      .forEach(key => formData.append(key, data[key] ?? ''));

    // Spécifications
    formData.append('specifications', JSON.stringify(data.specifications));

    // Images existantes -> envoyer JSON
    formData.append('existingImages', JSON.stringify(data.existingImages));

    // Nouvelles images
    data.images.forEach(file => formData.append('images[]', file));

    put(route('admin.products.update', product.id), formData, {
      forceFormData: true,
      preserveScroll: true
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Modifier le produit</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Nom"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        <input
          className="w-full border p-2"
          placeholder="Catégorie"
          value={data.category}
          onChange={e => setData('category', e.target.value)}
        />
        {errors.category && <div className="text-red-500">{errors.category}</div>}

        <input
          className="w-full border p-2"
          placeholder="Référence"
          value={data.reference}
          onChange={e => setData('reference', e.target.value)}
        />
        {errors.reference && <div className="text-red-500">{errors.reference}</div>}

        <input
          className="w-full border p-2"
          placeholder="Titre"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
        />
        <textarea
          className="w-full border p-2"
          placeholder="Description"
          value={data.description}
          onChange={e => setData('description', e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Prix"
          type="number"
          value={data.price}
          onChange={e => setData('price', e.target.value)}
        />
        <select
          className="w-full border p-2"
          value={data.state}
          onChange={e => setData('state', e.target.value)}
        >
          <option value="">État du produit</option>
          <option value="Neuf">Neuf</option>
          <option value="Très bon état">Très bon état</option>
          <option value="Occasion">Occasion</option>
        </select>

        <input
          className="w-full border p-2"
          placeholder="Garantie"
          value={data.warranty}
          onChange={e => setData('warranty', e.target.value)}
        />

        {/* Images existantes */}
        <h2 className="font-bold mt-4">Images existantes</h2>
        <div className="flex gap-4 flex-wrap">
          {data.existingImages.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={`/storage/${img}`}
                alt={`Image ${i + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(i)}
                className="absolute top-0 right-0 bg-red-600 text-white px-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="font-bold mt-4">Ajouter des images</label>
          <input type="file" multiple className="w-full border p-2 mt-1" onChange={handleImages} />
        </div>

        {/* Fiche technique */}
        <h2 className="text-lg font-semibold mt-4">Fiche technique</h2>
        {data.specifications.map((spec, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              className="border p-2 w-1/2"
              placeholder="Clé"
              value={spec.key}
              onChange={e => updateSpec(i, 'key', e.target.value)}
            />
            <input
              className="border p-2 w-1/2"
              placeholder="Valeur"
              value={spec.value}
              onChange={e => updateSpec(i, 'value', e.target.value)}
            />
            <button
              type="button"
              className="px-3 py-1 bg-red-500 text-white"
              onClick={() => removeSpec(i)}
            >
              X
            </button>
          </div>
        ))}
        <button type="button" className="bg-green-600 text-white px-4 py-2 rounded" onClick={addSpec}>
          + Ajouter spécification
        </button>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Mettre à jour le produit
        </button>
      </form>
    </div>
  );
}
