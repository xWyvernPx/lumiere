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

// Shared Ajv2020 + formats; client mirror of the server validator. UX first line, never throws (ADR-0001).
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

/** Compiled validators cached by schema `$id` — compile each contract once. */
const validators = new Map<string, ValidateFunction>();

/** Compile once (cached by `$id`); `undefined` on a malformed schema keeps `validate` non-throwing. */
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

/** Validate `payload` against a `dataFormat`/`responseFormat` schema; field-mapped result, never throws. */
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
