import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, RefreshCw } from 'lucide-react';

const StockPrice = () => {
    const [symbol, setSymbol] = useState('GOOGL');
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

    // Simulated API fetch
    const fetchStockPrice = (ticker) => {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const basePrice = {
                'GOOGL': 142.50,
                'AAPL': 185.20,
                'MSFT': 410.15,
                'TSLA': 190.30,
                'AMZN': 175.40
            }[ticker.toUpperCase()] || (100 + Math.random() * 200);

            const change = (Math.random() * 10 - 5).toFixed(2);
            const changePercent = ((change / basePrice) * 100).toFixed(2);

            const newData = {
                symbol: ticker.toUpperCase(),
                price: basePrice.toFixed(2),
                change,
                changePercent,
                name: ticker.toUpperCase() === 'GOOGL' ? 'Alphabet Inc.' : ticker.toUpperCase() + ' Corp'
            };

            setData(newData);

            // Generate some dummy history points for the chart
            const points = Array.from({ length: 10 }, (_, i) =>
                basePrice + (Math.random() * 10 - 5)
            );
            setHistory(points);

            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchStockPrice(symbol);
    }, [symbol]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSymbol(searchQuery.toUpperCase());
        }
    };

    return (
        <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, color: 'var(--primary)' }}>Market Watch</h2>
                <button
                    onClick={() => fetchStockPrice(symbol)}
                    className="calc-btn"
                    style={{ width: '40px', height: '40px', padding: '0', background: 'var(--glass)' }}
                    disabled={loading}
                >
                    <RefreshCw size={18} className={loading ? 'spin' : ''} style={{ color: 'var(--secondary)' }} />
                </button>
            </div>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search Symbol (e.g. AAPL)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 40px',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--glass)',
                            color: 'var(--text)',
                            outline: 'none'
                        }}
                    />
                </div>
                <button type="submit" className="calc-btn" style={{ width: '80px', height: 'auto', fontSize: '0.9rem', background: 'var(--secondary)', color: 'var(--on-primary)' }}>Search</button>
            </form>

            {loading ? (
                <div className="layout-transition" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                        <div>
                            <div className="skeleton" style={{ width: '120px', height: '1.2rem', marginBottom: '8px' }}></div>
                            <div className="skeleton" style={{ width: '180px', height: '3rem' }}></div>
                        </div>
                        <div className="skeleton" style={{ width: '100px', height: '1.5rem', marginBottom: '8px' }}></div>
                    </div>
                    <div className="skeleton" style={{ height: '100px', width: '100%', marginBottom: '20px' }}></div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="skeleton" style={{ width: '60px', height: '35px', borderRadius: '10px' }}></div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="layout-transition" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '500' }}>{data?.name}</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text)' }}>${data?.price}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: data?.change >= 0 ? 'var(--secondary)' : 'var(--primary)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginBottom: '8px'
                        }}>
                            {data?.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                            {data?.change >= 0 ? '+' : ''}{data?.change} ({data?.changePercent}%)
                        </div>
                    </div>

                    {/* Simple Decorative Chart */}
                    <div style={{ height: '100px', width: '100%', background: 'var(--glass)', borderRadius: '16px', padding: '10px', position: 'relative', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polyline
                                fill="none"
                                stroke={data?.change >= 0 ? 'var(--secondary)' : 'var(--primary)'}
                                strokeWidth="2"
                                points={history.map((p, i) => `${(i / 9) * 100},${100 - ((p - Math.min(...history)) / (Math.max(...history) - Math.min(...history) || 1)) * 80 - 10}`).join(' ')}
                            />
                        </svg>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                        {['GOOGL', 'AAPL', 'TSLA', 'MSFT'].map(s => (
                            <button
                                key={s}
                                onClick={() => setSymbol(s)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--glass-border)',
                                    background: symbol === s ? 'var(--primary)' : 'var(--glass)',
                                    color: symbol === s ? 'var(--on-primary)' : 'var(--text)',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
        </div>
    );
};

export default StockPrice;
