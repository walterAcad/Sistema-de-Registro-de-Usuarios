import React, { useState, useEffect } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Error al cargar usuarios');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id));
          alert('Usuario eliminado correctamente');
        }
      } catch (err) {
        alert('Error al eliminar usuario');
        console.error('Error:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Bienvenido al Sistema de Registro</h1>
      <p>Esta es la página de inicio de nuestro Registro.</p>
      
      <div style={{ marginTop: "40px" }}>
        <h2>Usuarios Registrados ({users.length})</h2>
        
        {loading && <p>Cargando usuarios...</p>}
        
        {error && (
          <div style={{ 
            padding: "10px", 
            backgroundColor: "#f8d7da", 
            color: "#721c24", 
            borderRadius: "5px",
            marginTop: "10px"
          }}>
            {error}
          </div>
        )}
        
        {!loading && !error && users.length === 0 && (
          <p style={{ fontStyle: "italic", color: "#666" }}>
            No hay usuarios registrados aún.
          </p>
        )}
        
        {!loading && users.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 15px 0", color: "#000", fontWeight: "bold" }}>
                      {user.firstName} {user.lastName}
                    </h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <div>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#000", fontWeight: "bold" }}>
                          Información Personal
                        </h4>
                        <p style={{ margin: "5px 0", color: "#000" }}>
                          <strong style={{ color: "#000" }}>Fecha de Nacimiento:</strong> {user.dateOfBirth}
                        </p>
                        <p style={{ margin: "5px 0", color: "#000" }}>
                          <strong style={{ color: "#000" }}>Género:</strong> {
                            user.gender === 'male' ? 'Masculino' : 
                            user.gender === 'female' ? 'Femenino' : 'Otro'
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#000", fontWeight: "bold" }}>
                          Información de Contacto
                        </h4>
                        <p style={{ margin: "5px 0", color: "#000" }}>
                          <strong style={{ color: "#000" }}>Email:</strong> {user.email}
                        </p>
                        <p style={{ margin: "5px 0", color: "#000" }}>
                          <strong style={{ color: "#000" }}>Teléfono:</strong> {user.phone}
                        </p>
                        <p style={{ margin: "5px 0", color: "#000" }}>
                          <strong style={{ color: "#000" }}>Dirección:</strong> {user.address}
                        </p>
                        <p style={{ margin: "5px 0", color: "#000" }}>
                          <strong style={{ color: "#000" }}>Ciudad:</strong> {user.city}
                        </p>
                      </div>
                    </div>
                    
                    <p style={{ 
                      margin: "15px 0 0 0", 
                      fontSize: "12px", 
                      color: "#000",
                      fontStyle: "italic" 
                    }}>
                      Registrado el: {formatDate(user.registeredAt)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "20px"
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
