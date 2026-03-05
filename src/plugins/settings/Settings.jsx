import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

const themes = [
    { id: 'earthy', name: 'Terracotta & Beige', colors: ['#CC6633', '#FDF5E6', '#5F9EA0'] },
    { id: 'dark', name: 'Modern Dark', colors: ['#818cf8', '#0f172a', '#c084fc'] },
    { id: 'ocean', name: 'Ocean Teal', colors: ['#0891b2', '#ecfeff', '#0d9488'] },
    { id: 'royal', name: 'Royal Midnight', colors: ['#800020', '#000033', '#4169E1'] },
    { id: 'oled', name: 'OLED Pure Black', colors: ['#ffffff', '#000000', '#a1a1aa'] },
    { id: 'sepia', name: 'Sepia (E-ink)', colors: ['#5d4037', '#f4ecd8', '#795548'] }
];

const SettingsApp = () => {
    const [currentTheme, setCurrentTheme] = useState(document.body.getAttribute('data-theme') || 'earthy');

    const changeTheme = (themeId) => {
        document.body.setAttribute('data-theme', themeId);
        setCurrentTheme(themeId);
        localStorage.setItem('gui-theme', themeId);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('gui-theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            setCurrentTheme(savedTheme);
        }
    }, []);

    return (
        <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{ padding: '10px', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
                    <Palette size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0 }}>Settings</h2>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Personalize your dashboard</p>
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Appearance</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => changeTheme(theme.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                borderRadius: '16px',
                                border: '2px solid',
                                borderColor: currentTheme === theme.id ? 'var(--primary)' : 'var(--glass-border)',
                                background: currentTheme === theme.id ? 'var(--glass)' : 'rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'left',
                                width: '100%'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {theme.colors.map((c, i) => (
                                        <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.2)' }} />
                                    ))}
                                </div>
                                <span style={{ fontWeight: '600', color: 'var(--text)' }}>{theme.name}</span>
                            </div>
                            {currentTheme === theme.id && <Check size={20} style={{ color: 'var(--primary)' }} />}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px', background: 'var(--glass)', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
                💡 Your theme preference is saved to this browser.
            </div>
        </div>
    );
};

export default SettingsApp;
