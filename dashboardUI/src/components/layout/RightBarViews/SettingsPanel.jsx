export default function SettingsPanel() {
    return (
      <div>
        <h2 className="font-bold text-lg mb-2">Settings</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <input type="checkbox" className="accent-[var(--accent)]" />
          </label>
          <label className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input type="checkbox" className="accent-[var(--accent)]" />
          </label>
        </div>
      </div>
    );
  }  