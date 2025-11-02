export const formatCurrency = (amount) => {
    // Your currency formatting logic here
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES', // Assuming Kenyan Shillings
    }).format(amount);
  };
  
  // You might have other exports as well