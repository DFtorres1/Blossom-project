import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./shared/components/Layout";
import { Fragment, lazy, Suspense } from "react";
import LoadingScreen from "./shared/components/LoadingScreen";

const routesConfig: RoutesType[] = [
  {
    id: "root",
    exact: true,
    layout: Layout,
    path: "/",
    component: () => <Navigate to="/character" />,
  },
  {
    id: "not-found",
    exact: true,
    layout: Layout,
    path: "/404",
    component: lazy(() => import("src/views/pages/NotFound")),
  },
  {
    id: "*",
    path: "*",
    component: () => <Navigate to="/404" />,
  },
  {
    id: "character",
    path: "/character/*",
    layout: lazy(() => import("src/views/pages/characters/CharacterList")),
    routes: [
      {
        id: "character-list",
        path: "/",
        exact: true,
        component: lazy(() => import("src/views/pages/characters/CharacterDetail")),
      },
      {
        id: "character-list",
        path: "/:id",
        exact: true,
        component: lazy(() => import("src/views/pages/characters/CharacterDetail")),
      }
    ]
  },
];

const renderRoutes = (routes: RoutesType[]) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;
          return (
            <Route
              key={route.id}
              path={route.path ?? ""}
              element={
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component />}
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  ) : null;

const RenderRoutes = () => {
  return renderRoutes(routesConfig);
};

export default RenderRoutes;
