import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="bg-green-700 rounded-xl mx-auto mt-6 max-w-5xl px-4 md:px-8 py-4 md:py-6 text-white">
      <div className="text-center md:text-left">
        <h2 className="text-lg md:text-2xl font-bold mb-2">
          Aprovecha <span className="text-yellow-300">los Descuentos y el despacho Gratis</span> que te ofrece Supermercado San Nicolás por compras sobre 25.000 Pesos
        </h2>
        <p className="mb-3 text-sm md:text-base">Solo por tiempo limitado. Promoción Valida solo para la Ciudad de Ovalle</p>
      </div>
    </div>
  );
};

export default Banner; 