'use client'

import { useToast } from '../components/ToastContext';
import './ToastTester.css';

export const ToastTester = () => {
  const { showToast } = useToast();

  const testSuccessToast = () => {
    showToast('Operation completed successfully!', 'success');
  };

  const testErrorToast = () => {
    showToast('An error occurred!', 'error');
  };

  const testLoadingToast = () => {
    showToast('Loading your data...', 'loading');
  };

  const testMultipleToasts = () => {
    showToast('First toast message', 'success');
    setTimeout(() => {
      showToast('Second toast message', 'error');
    }, 1000);
    setTimeout(() => {
      showToast('Third toast message', 'loading');
    }, 2000);
  };

  return (
    <div className="toast-tester-container">
      <div className="toast-tester-card">
        <h1 className="toast-tester-title">Toast Tester</h1>
        <p className="toast-tester-description">Click the buttons to test different toast notifications</p>
        <div className="toast-tester-buttons">
          <button onClick={testSuccessToast} className="toast-button success">
            Show Success Toast
          </button>
          <button onClick={testErrorToast} className="toast-button error">
            Show Error Toast
          </button>
          <button onClick={testLoadingToast} className="toast-button loading">
            Show Loading Toast
          </button>
          <button onClick={testMultipleToasts} className="toast-button multiple">
            Test Multiple Toasts
          </button>
        </div>
      </div>
    </div>
  );
};

