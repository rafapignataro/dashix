export const Formatter = new Intl.NumberFormat('pt-BR', { 
	style: 'currency', 
	currency: 'BRL', 
});

export const formatCurrency = (value: number) => Formatter.format(value);