import React from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ products }) {
  const handleDelete = (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      Inertia.delete(route("admin.products.destroy", id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Liste des produits</h1>

      <Link
        href={route("admin.products.create")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Ajouter un produit
      </Link>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Référence</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">
                {p.images?.length ? (
                  <img
                    src={`/storage/${p.images[0]}`}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "Aucune image"
                )}
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.reference}</td>
              <td className="border p-2">{p.price} DH</td>
              <td className="border p-2 flex gap-2">
                <Link
                  href={route("admin.products.show", p.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Voir
                </Link>
                <Link
                  href={route("admin.products.edit", p.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
