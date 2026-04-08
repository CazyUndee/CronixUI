import componentsJson from '@spec/components.json';
import tokensJson from '@spec/tokens.json';

export const components = componentsJson.components;
export const tokens = tokensJson;

export function getComponent(name: string) {
  return components.find((component) => component.name.toLowerCase() === name.toLowerCase());
}
