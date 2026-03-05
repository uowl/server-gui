import React, { useState } from 'react';
import { plugins } from './plugins/registry';
import { Package } from 'lucide-react';

function App() {
  const [activePluginId, setActivePluginId] = useState(plugins[0]?.id);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('gui-theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const activePlugin = plugins.find(p => p.id === activePluginId);

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="logo" style={{ marginBottom: '24px', color: 'var(--primary)' }}>
          <Package size={32} />
        </div>

        {plugins.filter(p => p.id !== 'settings').map((plugin) => (
          <button
            key={plugin.id}
            title={plugin.name}
            className={`nav-item ${activePluginId === plugin.id ? 'active' : ''}`}
            onClick={() => setActivePluginId(plugin.id)}
          >
            <plugin.icon size={24} />
          </button>
        ))}

        {plugins.filter(p => p.id === 'settings').map((plugin) => (
          <button
            key={plugin.id}
            title={plugin.name}
            className={`nav-item settings-item ${activePluginId === plugin.id ? 'active' : ''}`}
            onClick={() => setActivePluginId(plugin.id)}
            style={{ marginTop: 'auto' }}
          >
            <plugin.icon size={24} />
          </button>
        ))}
      </nav>

      <main className="main-content">
        <div key={activePluginId} className="app-content">
          {activePlugin ? (
            <activePlugin.component />
          ) : (
            <div className="glass-card">
              <h1>Welcome to Server GUI</h1>
              <p>Select an app from the sidebar to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
