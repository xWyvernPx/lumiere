import type { ErrorObject } from 'ajv';
import i18n from 'i18next';

/** `{ field: message }` — the learner-facing shape the UI renders. */
export type FieldErrors = Record<string, string>;

/** Key for an error anchored at the document root (empty instancePath). */
export const ROOT_FIELD = '(racine)';

/** French fallbacks by ajv keyword; the real strings live in i18n `errors.validation.*`. */
const FALLBACKS: Record<string, string> = {
  required: 'Ce champ est requis.',
  type: 'Type invalide.',
  enum: 'Valeur non autorisée.',
  const: 'Valeur inattendue.',
  minLength: 'Trop court.',
  maxLength: 'Trop long.',
  minItems: 'Trop peu d’éléments.',
  maxItems: 'Trop d’éléments.',
  minimum: 'Valeur trop petite.',
  maximum: 'Valeur trop grande.',
  additionalProperties: 'Propriété non autorisée.',
  format: 'Format invalide.',
};

/** `errors.validation.*` via i18n, French fallback when unconfigured (apiClient pattern). */
export const translateValidation = (
  key: string,
  fallback: string,
  params?: Record<string, unknown>,
): string => {
  const fullKey = `errors.validation.${key}`;
  return i18n.exists(fullKey) ? i18n.t(fullKey, params ?? {}) : fallback;
};

/** ajv reports the containing path for `required`; append the missing key. */
const toFieldPath = (error: ErrorObject): string => {
  const base = error.instancePath.replace(/^\//, '').replace(/\//g, '.');
  if (error.keyword === 'required') {
    const missing = (error.params as { missingProperty?: string })
      .missingProperty;
    return missing ? (base ? `${base}.${missing}` : missing) : base || ROOT_FIELD;
  }
  return base || ROOT_FIELD;
};

/** ajv errors → `{ field: message }` (i18n + French fallback), joining messages per field. */
export const mapAjvErrors = (errors: readonly ErrorObject[]): FieldErrors =>
  errors.reduce<FieldErrors>((accumulator, error) => {
    const field = toFieldPath(error);
    const message = translateValidation(
      error.keyword,
      FALLBACKS[error.keyword] ?? error.message ?? 'Valeur invalide.',
      error.params as Record<string, unknown>,
    );
    return {
      ...accumulator,
      [field]: accumulator[field]
        ? `${accumulator[field]}, ${message}`
        : message,
    };
  }, {});
