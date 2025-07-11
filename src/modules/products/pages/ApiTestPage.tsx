import React, { useState } from 'react';
import ProductCatalogApi from '../components/ProductCatalogApi/ProductCatalogApi';
import { ProductService } from '../services/ProductService';
import type { Product } from '../domain/Product';

// Instancia del servicio para pruebas directas
const apiProductService = new ProductService(true);

/**
 * Página de prueba para demostrar el uso del servicio axios
 * Implementa el llamado: curl http://localhost:8091/v1/catalog/products
 */
const ApiTestPage: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isTestingDirect, setIsTestingDirect] = useState(false);

  // Función para probar el llamado directo a la API
  const testDirectApiCall = async () => {
    setIsTestingDirect(true);
    setTestResult('Realizando llamado directo a la API...');

    try {
      const startTime = Date.now();
      const products: Product[] = await apiProductService.getAllProducts();
      const endTime = Date.now();
      const duration = endTime - startTime;

      const result = `
✅ Llamado exitoso!

📊 Resultados:
• Productos obtenidos: ${products.length}
• Tiempo de respuesta: ${duration}ms
• Endpoint: http://localhost:8091/v1/catalog/products
• Método: GET
• Implementación: Axios

📦 Primeros 3 productos:
${products.slice(0, 3).map((p, i) => `${i + 1}. ${p.name} - $${p.price}`).join('\n')}

🔧 Equivalente curl:
curl http://localhost:8091/v1/catalog/products
      `;

      setTestResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      const result = `
❌ Error en el llamado!

🚨 Detalles del error:
• Mensaje: ${errorMessage}
• Endpoint: http://localhost:8091/v1/catalog/products
• Método: GET

💡 Posibles soluciones:
1. Verificar que el servidor esté ejecutándose en http://localhost:8091
2. Comprobar que el endpoint /v1/catalog/products esté disponible
3. Revisar la configuración de CORS si es necesario
4. Verificar la conectividad de red

🔧 Comando para probar manualmente:
curl http://localhost:8091/v1/catalog/products
      `;

      setTestResult(result);
    } finally {
      setIsTestingDirect(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.2rem' }}>🧪 Prueba de API con Axios</h1>
        <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
          Implementación del llamado: <code style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontFamily: 'Monaco, monospace'
          }}>curl http://localhost:8091/v1/catalog/products</code>
        </p>
      </div>

      {/* Sección de prueba directa */}
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: 0, color: '#495057' }}>🔧 Prueba Directa del Servicio</h2>
        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
          Haz clic en el botón para realizar un llamado directo al servicio de axios y ver los resultados.
        </p>
        
        <button
          onClick={testDirectApiCall}
          disabled={isTestingDirect}
          style={{
            background: isTestingDirect ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: isTestingDirect ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}
        >
          {isTestingDirect ? '⏳ Probando...' : '🚀 Probar API'}
        </button>

        {testResult && (
          <div style={{
            background: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
            border: `1px solid ${testResult.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '8px',
            padding: '15px',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '0.9rem',
            whiteSpace: 'pre-line',
            color: testResult.includes('✅') ? '#155724' : '#721c24'
          }}>
            {testResult}
          </div>
        )}
      </div>

      {/* Componente que usa el hook */}
      <div style={{
        background: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderBottom: '1px solid #e9ecef'
        }}>
          <h2 style={{ margin: 0, color: '#495057' }}>📋 Componente con Hook useProductCatalog</h2>
          <p style={{ margin: '10px 0 0 0', color: '#6c757d' }}>
            Este componente utiliza el hook personalizado que internamente usa el servicio de axios.
          </p>
        </div>
        
        <ProductCatalogApi />
      </div>

      {/* Información técnica */}
      <div style={{
        background: '#e7f3ff',
        border: '1px solid #b8daff',
        borderRadius: '12px',
        padding: '25px',
        marginTop: '30px'
      }}>
        <h3 style={{ marginTop: 0, color: '#004085' }}>📚 Información Técnica</h3>
        <div style={{ color: '#004085' }}>
          <h4>🔧 Archivos creados:</h4>
          <ul>
            <li><code>src/modules/products/services/ProductApiService.ts</code> - Servicio principal con axios</li>
            <li><code>src/modules/products/hooks/useProductApi.ts</code> - Hooks personalizados para React</li>
            <li><code>src/modules/products/components/ProductCatalogApi/</code> - Componente de demostración</li>
          </ul>
          
          <h4>🚀 Funcionalidades implementadas:</h4>
          <ul>
            <li>Llamado GET a <code>http://localhost:8091/v1/catalog/products</code></li>
            <li>Manejo de errores y estados de carga</li>
            <li>Interceptores de axios para logging y manejo de errores</li>
            <li>Hooks personalizados para integración con React</li>
            <li>Componente de ejemplo con UI completa</li>
          </ul>
          
          <h4>📦 Dependencias:</h4>
          <ul>
            <li><code>axios</code> - Cliente HTTP para realizar las peticiones</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;