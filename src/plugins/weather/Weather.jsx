import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';

const Weather = () => {
    // Mock weather data
    const weatherData = {
        city: "San Francisco",
        temp: 22,
        condition: "Partly Cloudy",
        humidity: 65,
        wind: 12,
        forecast: [
            { day: "Mon", temp: 21, icon: Sun },
            { day: "Tue", temp: 19, icon: Cloud },
            { day: "Wed", temp: 18, icon: CloudRain },
            { day: "Thu", temp: 22, icon: Sun },
        ]
    };

    return (
        <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{weatherData.city}</h2>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '600', color: 'var(--text)' }}>{weatherData.temp}°C</h1>
                    <p style={{ color: 'var(--primary)', fontWeight: '500' }}>{weatherData.condition}</p>
                </div>
                <div style={{ color: 'var(--primary)' }}>
                    <Sun size={80} strokeWidth={1} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Droplets size={24} color="var(--secondary)" />
                    <div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Humidity</p>
                        <p style={{ fontWeight: '600' }}>{weatherData.humidity}%</p>
                    </div>
                </div>
                <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Wind size={24} color="var(--secondary)" />
                    <div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wind Speed</p>
                        <p style={{ fontWeight: '600' }}>{weatherData.wind} km/h</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
                {weatherData.forecast.map((item, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.day}</p>
                        <item.icon size={24} style={{ marginBottom: '8px', color: 'var(--text)' }} />
                        <p style={{ fontWeight: '600' }}>{item.temp}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;
