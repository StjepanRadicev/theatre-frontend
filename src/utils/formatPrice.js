export const formatPrice = (amount) => {
    return new Intl.NumberFormat("hr-HR", {
        style: "currency",
        currency: "EUR",
    }).format(amount);
}


export const formatRevenue = (value) => {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + "B"
    } else {
        return value;
    }
};