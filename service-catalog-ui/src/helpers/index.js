import { randomNamesGenerator } from '@kyma-project/common';

export const getResourceDisplayName = resource => {
  if (!resource) return null;

  return (
    resource.spec.externalMetadata?.displayName ||
    resource.spec.externalName ||
    resource.metadata.name
  );
};

/* eslint-disable no-unused-vars*/
export function clearEmptyPropertiesInObject(object) {
  for (const key in object) {
    if (typeof object[key] === 'undefined' || object[key] === '') {
      delete object[key];
      continue;
    }

    if (!object[key] || typeof object[key] !== 'object') {
      continue;
    }

    clearEmptyPropertiesInObject(object[key]);
    if (Object.keys(object[key]).length === 0) {
      delete object[key];
    }
  }
}
/* eslint-enable no-unused-vars */
export function randomNameGenerator() {
  return randomNamesGenerator();
}

export function isStringValueEqualToTrue(value) {
  return value ? 'true' === value.toLowerCase() : false;
}

export const backendModuleExists = name => {
  return true;
  // return builder.getBackendModules().includes(name);
};

export function isAddon(labels) {
  return labels?.local === 'true';
}

export function isService(labels) {
  return !labels || labels.local !== 'true';
}

export function isAddonInstance(instance) {
  return isAddon(instance.metadata.labels);
}

export function isServiceInstance(instance) {
  return isService(instance.metadata.labels);
}
