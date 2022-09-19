import handlebars from 'handlebars';

export const templateProvider = async (templateHTML: string, variables: Record<string, unknown>) => {
	const createTemplate = handlebars.compile(templateHTML);

	return createTemplate(variables);
};