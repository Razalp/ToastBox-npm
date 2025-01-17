
import { useToast } from '../components/ToastContext';


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
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Toast Component Tester</h1>
      <button
        onClick={testSuccessToast}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Show Success Toast
      </button>

      <button
        onClick={testErrorToast}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Show Error Toast
      </button>

      <button
        onClick={testLoadingToast}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Loading Toast
      </button>

      <button
        onClick={testMultipleToasts}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Test Multiple Toasts
      </button>
    </div>
  );
};
