import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Dashboard, FarmingPatches, ManorFarm, RanchOutOfTime, Settings } from './pages';
import { SettingsProvider } from './hooks/useSettings';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patches" element={<FarmingPatches />} />
            <Route path="/manor-farm" element={<ManorFarm />} />
            <Route path="/ranch-out-of-time" element={<RanchOutOfTime />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
