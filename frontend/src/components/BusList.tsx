import React, { useEffect, useState } from 'react';

type Marca = {
    id: number;
    nombre: string;
};

type Bus = {
    id: number;
    numeroBus: string;
    placa: string;
    caracteristicas: string;
    activo: boolean;
    fechaCreacion: string;
    marca: Marca;
};

const BusList: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const fetchBuses = async (pageNumber: number) => {
        setLoading(true);
        const username = 'admin';
        const password = '1234';
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));

        try {
            const response = await fetch(
                `http://localhost:8080/bus?page=${pageNumber}&size=5`,
                {
                    headers,
                    credentials: "include"
                }
            );
            const data = await response.json();
            setBuses(data.content);
        } catch (error) {
            console.error('Error al obtener buses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuses(page);
    }, [page]);

    const handleBusClick = async (id: number) => {
        const username = 'admin';
        const password = '1234';
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));

        try {
            const response = await fetch(`http://localhost:8080/bus/${id}`, {
                headers,
                credentials: "include" // ✅ también aquí
            });
            if (!response.ok) throw new Error('Bus no encontrado');
            const bus: Bus = await response.json();
            alert(`Bus: ${bus.numeroBus}\nPlaca: ${bus.placa}\nMarca: ${bus.marca.nombre}\nActivo: ${bus.activo}`);
        } catch (error) {
            console.error(error);
            alert('Error al obtener bus');
        }
    };

    return (
        <div>
            <h2>Lista de Buses</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table border={1} cellPadding={5} cellSpacing={0}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número Bus</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Activo</th>
                        <th>Fecha Creación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {buses.map(bus => (
                        <tr key={bus.id} onClick={() => handleBusClick(bus.id)} style={{ cursor: 'pointer' }}>
                            <td>{bus.id}</td>
                            <td>{bus.numeroBus}</td>
                            <td>{bus.placa}</td>
                            <td>{bus.marca.nombre}</td>
                            <td>{bus.activo ? 'Sí' : 'No'}</td>
                            <td>{new Date(bus.fechaCreacion).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: '10px' }}>
                <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
                    Anterior
                </button>
                <span style={{ margin: '0 10px' }}>Página: {page + 1}</span>
                <button onClick={() => setPage(prev => prev + 1)}>Siguiente</button>
            </div>
        </div>
    );
};

export default BusList;
