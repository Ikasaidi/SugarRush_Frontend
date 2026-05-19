export function formatCAD(amount) {
  const value = Number(amount) || 0;
  return `$${value.toFixed(2)} CAD`;
}
