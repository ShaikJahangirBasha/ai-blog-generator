import { useState } from "react";

function Settings() {
  const [theme, setTheme] = useState("Light");
  const [tone, setTone] = useState("Professional");

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Customize your AI Blog Generator preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-8 space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Theme
          </label>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Default Tone
          </label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Technical</option>
            <option>Marketing</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;