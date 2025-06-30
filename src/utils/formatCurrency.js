export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount);