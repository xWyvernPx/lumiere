import { describe, expect, it } from 'vitest';
import { multipleChoiceDefinition } from '@le-cogito/lumiere-activity-schemas';

import { validate } from './validator';
import {
  multipleChoiceContent,
  responseMissingSelection,
  responseWithUnknownField,
  validMultipleChoiceResponse,
} from './__fixtures__/multipleChoiceDoc';

describe('validate — response against responseFormat', () => {
  it('accepts a conforming multiple_choice response', () => {
    const result = validate(
      multipleChoiceDefinition.responseFormat,
      validMultipleChoiceResponse,
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('rejects a response missing a required field, mapped to that field', () => {
    const result = validate(
      multipleChoiceDefinition.responseFormat,
      responseMissingSelection,
    );

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('selectedOptionId');
    expect(result.errors.selectedOptionId).toMatch(/requis/i);
  });

  it('rejects a response with an unknown property, mapped to a readable message', () => {
    const result = validate(
      multipleChoiceDefinition.responseFormat,
      responseWithUnknownField,
    );

    expect(result.valid).toBe(false);
    // additionalProperties errors anchor at the document root.
    expect(result.errors['(racine)']).toMatch(/non autorisée/i);
  });

  it('never throws on a malformed schema — returns a failure result', () => {
    const result = validate({ type: 'notAValidJsonSchemaType' }, {});

    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors).length).toBeGreaterThan(0);
  });
});

describe('validate — sample content data-integrity', () => {
  it('multiple_choice sample content conforms to its dataFormat', () => {
    const result = validate(
      multipleChoiceDefinition.dataFormat,
      multipleChoiceContent,
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe('validate — compile-once caching', () => {
  // Without the $id cache, the second call would re-run ajv.compile on a schema
  // whose $id is already registered — which ajv strict mode rejects — so a green
  // second call is evidence the compiled validator was served from cache.
  it('returns a stable result across repeated calls on the same schema', () => {
    const first = validate(
      multipleChoiceDefinition.responseFormat,
      validMultipleChoiceResponse,
    );
    const second = validate(
      multipleChoiceDefinition.responseFormat,
      validMultipleChoiceResponse,
    );

    expect(first.valid).toBe(true);
    expect(second.valid).toBe(true);
  });
});
