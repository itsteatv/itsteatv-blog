import Navbar from "./ui/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAuthForm from "./ui/UserAuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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
          <Route path="/" element={<Navbar />}>
            <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          error: {
            style: {
              borderRadius: "1rem",
              fontStyle: "italic",
              backgroundColor: "#ddf8d7",
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
