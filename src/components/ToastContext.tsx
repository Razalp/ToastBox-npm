import React, { createContext, useContext, useState, useEffect } from 'react';
import './styles.css';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'loading';
}

interface ToastContextType {
  showToast: (message: string, type: Toast['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'], duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (type !== 'loading') {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isExiting: true } : toast
      )
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast: React.FC<{ toast: Toast & { isExiting?: boolean }; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.isExiting) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [toast.isExiting, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'loading':
        return <div className="spinner"></div>;
    }
  };

  return (
    <div className={`toast toast-${toast.type} ${toast.isExiting ? 'toast-exit' : ''}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      {toast.type !== 'loading' && (
        <button className="toast-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

