export const formatNumber: (n:number) => string = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');