import React, { useState } from 'react';
import { Copy, Key, Trash2 } from 'lucide-react';
import { mockClientKeys } from '../../data/mockData';

export const ClientKeys: React.FC = () => {
  const [keys, setKeys] = useState(mockClientKeys);

  const generateNewKey = () => {
    const newKey = {
      id: String(keys.length + 1),
      key: `mk_test_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      requests: 0,
      status: 'active'
    };
    setKeys([...keys, newKey]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Client Keys</h2>
        <button
          onClick={generateNewKey}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Key className="w-4 h-4" />
          Generate New Key
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {keys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-mono">{key.key}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(key.lastUsed).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {key.requests.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy key"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setKeys(keys.filter(k => k.id !== key.id))}
                        className="text-red-400 hover:text-red-600"
                        title="Delete key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};