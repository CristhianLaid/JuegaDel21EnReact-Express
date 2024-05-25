export function Card({ children }) {
  return (
    <div className="bg-black text-white p-6 rounded-lg border border-yellow-400 shadow-md">
      {children}
    </div>
  );
}
