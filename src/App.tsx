import { ToastProvider } from './components/ToastContext'
import { ToastTester } from './Page/ToastTester'

const App = () => {
  return (
    <ToastProvider>
      <ToastTester />
    </ToastProvider>
  );
}

export default App
