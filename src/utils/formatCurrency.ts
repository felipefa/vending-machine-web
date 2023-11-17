export function formatCurrency(
  amountInCents?: number,
  currency: string = 'EUR'
): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(
    amountInCents ? amountInCents / 100 : 0
  );
}
