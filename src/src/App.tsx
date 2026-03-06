import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@routes/HomePage';
import { BasketPage } from '@routes/BasketPage';
import { DeliveryPage } from '@routes/DeliveryPage';
import { AuthPage } from '@routes/AuthPage';
import { AuthProvider } from '@store/AuthContext';
import { ProtectedRoute } from '@routes/ProtectedRoute';
import { Header } from '@components/Header';
import './styles.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/basket"
                element={
                  <ProtectedRoute>
                    <BasketPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delivery"
                element={
                  <ProtectedRoute>
                    <DeliveryPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

