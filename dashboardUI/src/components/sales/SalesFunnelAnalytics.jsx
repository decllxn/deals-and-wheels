const funnelData = [
    { stage: 'Views', count: 5000 },
    { stage: 'Watchlist', count: 3000 },
    { stage: 'Bid/Buy', count: 1500 },
    { stage: 'Checkout', count: 1000 },
    { stage: 'Completed', count: 850 },
  ];
  
  export default function SalesFunnelAnalytics() {
    const max = funnelData[0].count;
  
    return (
      <div className="bg-[var(--bg)] rounded-2xl p-4 shadow-md">
        <h2 className="text-lg font-bold text-[var(--text)] mb-4">🔄 Sales Funnel</h2>
        <div className="flex flex-col gap-4">
          {funnelData.map((stage, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--text)]">{stage.stage}</span>
                <span className="text-[var(--text-muted)]">{stage.count}</span>
              </div>
              <div className="w-full bg-[var(--border)] rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(stage.count / max) * 100}%`,
                    backgroundColor: 'var(--accent)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  