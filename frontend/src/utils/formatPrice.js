const numberFormat = new Intl.NumberFormat("es-CL");

export const formatPrice = (value) => `$${numberFormat.format(value)}`;
