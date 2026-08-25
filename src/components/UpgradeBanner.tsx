interface UpgradeBannerProps {
  onUpgrade: () => void
}

export default function UpgradeBanner({ onUpgrade }: UpgradeBannerProps) {
  return (
    <div
      className="flex items-center justify-between px-5"
      style={{
        height: 80,
        backgroundColor: '#061E28',
        borderRadius: 22,
        boxShadow: '0 10px 24px rgba(6,30,40,0.2)',
      }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Buka laporan lengkap
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-xl" style={{ color: '#00E676' }}>Rp50.000</span>
          <span className="text-sm line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>Rp150.000</span>
        </div>
      </div>

      <button
        onClick={onUpgrade}
        className="font-bold text-sm transition-colors hover:opacity-90 active:scale-95"
        style={{
          backgroundColor: '#00E676',
          color: '#062B23',
          height: 46,
          minWidth: 92,
          borderRadius: 9999,
          padding: '0 24px',
        }}
      >
        Upgrade
      </button>
    </div>
  )
}
