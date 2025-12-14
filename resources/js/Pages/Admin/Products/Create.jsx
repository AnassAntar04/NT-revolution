import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '',
        reference: '',
        title: '',
        description: '',
        price: '',
        state: '',
        warranty: '',
        images: [],
        specifications: []
    });

    console.log(errors);

    const addSpec = () =>
        setData('specifications', [...data.specifications, { key: '', value: '' }]);

    const updateSpec = (index, field, value) => {
        const s = [...data.specifications];
        s[index][field] = value;
        setData('specifications', s);
    };

    const removeSpec = (index) =>
        setData('specifications', data.specifications.filter((_, i) => i !== index));

    const handleImages = (e) => {
        setData('images', [...e.target.files]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), { forceFormData: true });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl mb-4">Ajouter un produit</h1>
            <form onSubmit={submit} className="space-y-4">
                <input className="w-full border p-2" placeholder="Nom"
                    value={data.name} onChange={e => setData('name', e.target.value)} />
                {errors.name && <div className="text-red-500">{errors.name}</div>}

                <input className="w-full border p-2" placeholder="Catégorie"
                    value={data.category} onChange={e => setData('category', e.target.value)} />
                {errors.category && <div className="text-red-500">{errors.category}</div>}

                <input className="w-full border p-2" placeholder="Référence"
                    value={data.reference} onChange={e => setData('reference', e.target.value)} />
                {errors.reference && <div className="text-red-500">{errors.reference}</div>}

                <input className="w-full border p-2" placeholder="Titre"
                    value={data.title} onChange={e => setData('title', e.target.value)} />
                {errors.title && <div className="text-red-500">{errors.title}</div>}

                <textarea className="w-full border p-2" placeholder="Description"
                    value={data.description} onChange={e => setData('description', e.target.value)} />
                {errors.description && <div className="text-red-500">{errors.description}</div>
                }
                <input className="w-full border p-2" placeholder="Prix" type="number"
                    value={data.price} onChange={e => setData('price', e.target.value)} />
                {errors.price && <div className="text-red-500">{errors.price}</div>}

                <select className="w-full border p-2"
                    value={data.state} onChange={e => setData('state', e.target.value)}>
                    <option value="">État du produit</option>
                    <option value="Neuf">Neuf</option>
                    <option value="Très bon état">Très bon état</option>
                    <option value="Occasion">Occasion</option>
                </select>
                {errors.state && <div className="text-red-500">{errors.state}</div>

                }
                <input className="w-full border p-2" placeholder="Garantie"
                    value={data.warranty} onChange={e => setData('warranty', e.target.value)} />
                {errors.warranty && <div className="text-red-500">{errors.warranty}</div>}

                {/* Upload multiple images */}
                <div>
                    <label className="font-bold">Images</label>
                    <input type="file" multiple className="w-full border p-2 mt-1"
                        onChange={handleImages} />
                </div>
                {errors.images && <div className="text-red-500">{errors.images}</div>}

                {/* Specifications */}
                <h2 className="text-lg font-semibold mt-4">Fiche technique</h2>
                {data.specifications.map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center mb-2">
                        <input className="border p-2 w-1/2" placeholder="Clé"
                            value={spec.key} onChange={e => updateSpec(i, 'key', e.target.value)} />
                        <input className="border p-2 w-1/2" placeholder="Valeur"
                            value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)} />
                        <button type="button" className="px-3 py-1 bg-red-500 text-white"
                            onClick={() => removeSpec(i)}>X</button>
                    </div>
                ))}

                {errors.specifications && <div className="text-red-500">{errors.specifications}</div>
                }
                <button type="button" className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={addSpec}>+ Ajouter spécification</button>

                <button type="submit" disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                    Ajouter produit
                </button>
            </form>
        </div>
    );
}
