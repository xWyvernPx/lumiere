import type { ErrorObject } from 'ajv';
import i18n from 'i18next';

/** `{ field: message }` — the learner-facing shape the UI renders. */
export type FieldErrors = Record<string, string>;

/** Key for an error anchored at the document root (empty instancePath). */
export const ROOT_FIELD = '(racine)';

/**
 * Resolve an `errors.validation.*` i18next key, falling back to the French
 * default when i18n isn't configured — same graceful pattern as apiClient.
 */
export const translateValidation = (
  key: string,
  fallback: string,
  params?: Record<string, unknown>,
): string => {
  const fullKey = `errors.validation.${key}`;
  return i18n.exists(fullKey) ? i18n.t(fullKey, params ?? {}) : fallback;
};

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

/** ajv keyword → learner message via i18next (French fallback + interpolation params). */
const toMessage = (error: ErrorObject): string => {
  const params = error.params as Record<string, unknown>;
  const t = translateValidation;

  switch (error.keyword) {
    case 'required':
      return t('required', 'Ce champ est requis.');
    case 'type':
      return t('type', `Type invalide (attendu : ${String(params.type ?? 'autre')}).`, {
        type: params.type,
      });
    case 'enum':
      return t('enum', 'Valeur non autorisée.');
    case 'const':
      return t('const', 'Valeur inattendue.');
    case 'minLength':
      return t('minLength', `Trop court (minimum ${String(params.limit)} caractères).`, {
        limit: params.limit,
      });
    case 'maxLength':
      return t('maxLength', `Trop long (maximum ${String(params.limit)} caractères).`, {
        limit: params.limit,
      });
    case 'minItems':
      return t('minItems', `Trop peu d’éléments (minimum ${String(params.limit)}).`, {
        limit: params.limit,
      });
    case 'maxItems':
      return t('maxItems', `Trop d’éléments (maximum ${String(params.limit)}).`, {
        limit: params.limit,
      });
    case 'minimum':
      return t('minimum', `Valeur trop petite (minimum ${String(params.limit)}).`, {
        limit: params.limit,
      });
    case 'maximum':
      return t('maximum', `Valeur trop grande (maximum ${String(params.limit)}).`, {
        limit: params.limit,
      });
    case 'additionalProperties':
      return t(
        'additionalProperties',
        `Propriété non autorisée : « ${String(params.additionalProperty)} ».`,
        { property: params.additionalProperty },
      );
    case 'format':
      return t('format', `Format invalide (${String(params.format)}).`, {
        format: params.format,
      });
    default:
      return error.message ?? t('fallback', 'Valeur invalide.');
  }
};

/**
 * Maps ajv errors to a `{ field: message }` envelope with French-friendly
 * messages, concatenating multiple messages for the same field.
 */
export const mapAjvErrors = (errors: readonly ErrorObject[]): FieldErrors =>
  errors.reduce<FieldErrors>((accumulator, error) => {
    const field = toFieldPath(error);
    const message = toMessage(error);

    return {
      ...accumulator,
      [field]: accumulator[field]
        ? `${accumulator[field]}, ${message}`
        : message,
    };
  }, {});
