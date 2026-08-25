"use client";

export function Table({ headers, rows, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="glass border-b border-glass-border">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b border-glass-border hover:bg-glass-bg-hover transition-colors"
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-6 py-4 text-graphite">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
