import Ajv2020, { type ValidateFunction } from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import type { JsonSchema } from '@le-cogito/lumiere-activity-schemas';

import {
  mapAjvErrors,
  ROOT_FIELD,
  translateValidation,
  type FieldErrors,
} from './ajvErrorMapper';

/** Outcome of validating a payload against an activity contract schema. */
export interface ValidationResult {
  valid: boolean;
  /** Field-mapped messages; empty when `valid`. */
  errors: FieldErrors;
}

// One shared Ajv2020 (Draft 2020-12) instance + formats, mirroring the server's
// SchemaValidatorService. This is the client mirror of it: a UX first line, NOT
// a trust boundary — the CouchDB backstop and the server stay authoritative
// (ADR-0001). It never throws; malformed input is a result, not an exception.
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

/** Compiled validators cached by schema `$id` — compile each contract once. */
const validators = new Map<string, ValidateFunction>();

/**
 * Compile (once, cached by `$id`) and return a validator, or `undefined` if the
 * schema itself is malformed. `ajv.compile` throws on an invalid schema, so it's
 * caught here to keep `validate` non-throwing. Schemas without a `$id` (none in
 * the contract package today) are compiled per call — no cache key to store.
 */
const getValidator = (schema: JsonSchema): ValidateFunction | undefined => {
  const id = typeof schema.$id === 'string' ? schema.$id : undefined;

  if (id) {
    const cached = validators.get(id);
    if (cached) {
      return cached;
    }
  }

  let validateFn: ValidateFunction;
  try {
    validateFn = ajv.compile(schema);
  } catch {
    return undefined;
  }

  if (id) {
    validators.set(id, validateFn);
  }
  return validateFn;
};

/**
 * Validate `payload` against a JSON Schema (a type's `dataFormat` or
 * `responseFormat`), returning a field-mapped, French-friendly result. Never
 * throws — a malformed payload *or* a malformed schema is a result, not an
 * exception (UX first line; the CouchDB backstop + server stay authoritative).
 */
export const validate = (
  schema: JsonSchema,
  payload: unknown,
): ValidationResult => {
  const validateFn = getValidator(schema);

  if (!validateFn) {
    return {
      valid: false,
      errors: {
        [ROOT_FIELD]: translateValidation(
          'invalidSchema',
          'Schéma d’activité invalide.',
        ),
      },
    };
  }

  if (validateFn(payload)) {
    return { valid: true, errors: {} };
  }

  return { valid: false, errors: mapAjvErrors(validateFn.errors ?? []) };
};
