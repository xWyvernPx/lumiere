import type { ErrorObject } from 'ajv';

/** `{ field: message }` — the learner-facing shape the UI renders. */
export type FieldErrors = Record<string, string>;

/** Key for an error anchored at the document root (empty instancePath). */
export const ROOT_FIELD = '(racine)';

/**
 * ajv reports the *containing* path for a missing required property, so append
 * the missing key to point the field path at the field itself. Mirrors the
 * server's ajv-error.mapper.
 */
const toFieldPath = (error: ErrorObject): string => {
  const base = error.instancePath.replace(/^\//, '').replace(/\//g, '.');

  if (error.keyword === 'required') {
    const missing = (error.params as { missingProperty?: string })
      .missingProperty;
    if (missing) {
      return base ? `${base}.${missing}` : missing;
    }
  }

  return base || ROOT_FIELD;
};

/** ajv keyword → concise French message; falls back to ajv's own message. */
const toFrenchMessage = (error: ErrorObject): string => {
  const params = error.params as Record<string, unknown>;

  switch (error.keyword) {
    case 'required':
      return 'Ce champ est requis.';
    case 'type':
      return `Type invalide (attendu : ${String(params.type ?? 'autre')}).`;
    case 'enum':
      return 'Valeur non autorisée.';
    case 'const':
      return 'Valeur inattendue.';
    case 'minLength':
      return `Trop court (minimum ${String(params.limit)} caractères).`;
    case 'maxLength':
      return `Trop long (maximum ${String(params.limit)} caractères).`;
    case 'minItems':
      return `Trop peu d’éléments (minimum ${String(params.limit)}).`;
    case 'maxItems':
      return `Trop d’éléments (maximum ${String(params.limit)}).`;
    case 'minimum':
      return `Valeur trop petite (minimum ${String(params.limit)}).`;
    case 'maximum':
      return `Valeur trop grande (maximum ${String(params.limit)}).`;
    case 'additionalProperties':
      return `Propriété non autorisée : « ${String(
        params.additionalProperty,
      )} ».`;
    case 'format':
      return `Format invalide (${String(params.format)}).`;
    default:
      return error.message ?? 'Valeur invalide.';
  }
};

/**
 * Maps ajv errors to a `{ field: message }` envelope with French-friendly
 * messages, concatenating multiple messages for the same field.
 */
export const mapAjvErrors = (errors: readonly ErrorObject[]): FieldErrors =>
  errors.reduce<FieldErrors>((accumulator, error) => {
    const field = toFieldPath(error);
    const message = toFrenchMessage(error);

    return {
      ...accumulator,
      [field]: accumulator[field]
        ? `${accumulator[field]}, ${message}`
        : message,
    };
  }, {});
