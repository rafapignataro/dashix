import handlebars from 'handlebars';
import fs from 'fs';

export const templateProvider = async (templatePath: string, variables: Record<string, unknown>) => {
  const templateHTML = fs.readFileSync(templatePath);

	const createTemplate = handlebars.compile(templateHTML.toString());

	return createTemplate(variables);
};