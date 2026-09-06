import { useState } from 'react';
import SearchBar from './searchbar.jsx';

const App = () => {
  const [cancion, setcancion] = useState([]); //es el array de los datos de las canciones
  const [carga, setcargar] = useState(false); // es un booleado del estado de cargando,

  // Función que maneja hace la peticion
  const handleSearch = async (query) => {
    setcargar(true); // se activa el estado de carga apenas el usuario busca algo
    try {
      // Petición HTTP al backend
      const response = await fetch(`https://jmusic.onyxdesign.lat/search?q=${encodeURIComponent(query)}`); //aqui se conecta a la api bro
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      
      const data = await response.json(); //aqui se guardan los datos
      
      // se guardan os datos en cancion
      setcancion(data.data || []);
      console.log(data);
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    } finally {
      setcargar(false); // Desactivamos el aviso de carga pase lo que pase
    }
  };

  // 3. Estructura visual que ve el usuario
  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">J Music</h1>
      
      {/* Pintamos la barra de búsqueda y le pasamos la función */}
      <SearchBar onSearch={handleSearch} />

      {/* Mensaje de carga mientras responde el backend */}
      {carga && <p className="text-center text-muted">Buscando canciones...</p>}

      {/* Listado dinámico de los resultados */}
      <div className="row mt-4">
        {cancion.map((cancion) => (
          <div key={cancion.id} className="col-md-4 mb-3">
            <div className="card p-2 shadow-sm">
              <img src={cancion.thumbnail} alt={cancion.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{cancion.title}</h5>
                <p className="card-text text-muted">Duración: {cancion.duration}</p>
                <button className="btn btn-success btn-sm w-100">Reproducir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;