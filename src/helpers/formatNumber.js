export function formatNumber(number) {
    // Add commas to separate thousands and round to two decimal places
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  
  
  
  