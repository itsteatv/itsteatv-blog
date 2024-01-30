import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserAuthForm from "./ui/UserAuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={Home} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          error: {
            style: {
              borderRadius: "1rem",
              fontStyle: "italic",
              backgroundColor: "#f8d7da",
              fontFamily: "monospace",
            },
          },
          success: {
            style: {
              borderRadius: "1rem",
              fontStyle: "italic",
              backgroundColor: "#ddf8d7",
              fontFamily: "monospace",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
