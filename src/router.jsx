// src/router.jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, useOutletContext } from "react-router-dom";
import App from "./App";
const Servicios = lazy(() => import("./components/Servicios"));
const Nosotros = lazy(() => import("./components/Nosotros"));
const Contacto = lazy(() => import("./components/Contacto"));
const Administracion = lazy(() => import("./components/Administracion"));
const Catalogo = lazy(() => import("./components/Catalogo"));
const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ConfigurarProductos = lazy(() => import("./components/configuraciones/ConfigurarProductos"));
const ConfigurarTrabajos = lazy(() => import("./components/configuraciones/ConfigurarTrabajos"));

// ✅ HOC para envolver cualquier componente con Suspense
const withSuspense = (Component) => (
    <Suspense fallback={null}>
        <Component />
    </Suspense>
);

// ✅ Función para proteger rutas con autenticación
const isAuthenticated = () => {
    const credsLocal = localStorage.getItem("credenciales");
    const credsSession = sessionStorage.getItem("credenciales");
    return credsLocal !== null || credsSession !== null;
};
const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/administracion" replace />;
};

function HomeWrapper() {
    const { informationsRef, setVideoReady } = useOutletContext();
    return (
        <Suspense fallback={null}>
            <Home informationsRef={informationsRef} setVideoReady={setVideoReady} />
        </Suspense>
    );
}

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "", element: <HomeWrapper /> },
                { path: "servicios", element: withSuspense(Servicios) },
                { path: "nosotros", element: withSuspense(Nosotros) },
                { path: "contacto", element: withSuspense(Contacto) },
                { path: "administracion", element: withSuspense(Administracion) },
                { path: "catalogo", element: withSuspense(Catalogo) },
                { path: "dashboard", element: withSuspense(Dashboard) },
                {
                    path: "configurar-productos",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(ConfigurarProductos)}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "configurar-trabajos",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(ConfigurarTrabajos)}
                        </ProtectedRoute>
                    ),
                },
            ],
        },
    ],
    {
        future: {
            v7_startTransition: true,
        },
    }
);

export default router;