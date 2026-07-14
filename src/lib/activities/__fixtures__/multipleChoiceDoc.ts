// Mirrors the seeded CouchDB `multiple_choice` sample content
// (server SAMPLE_ACTIVITY_CONTENT.multiple_choice). Kept in sync by the
// data-integrity test, which validates it against the type's dataFormat.

/** `{ stimulus?, item }` conforming to multiple_choice `dataFormat`. */
export const multipleChoiceContent = {
  stimulus: {
    kind: 'text',
    body: 'Paris est la capitale de la France depuis le VIᵉ siècle.',
  },
  item: {
    stem: 'Quelle est la capitale de la France ?',
    options: [
      {
        id: 'lyon',
        text: 'Lyon',
        explanation: 'Lyon est une grande ville, mais ce n’est pas la capitale.',
      },
      {
        id: 'paris',
        text: 'Paris',
        explanation:
          'Paris est la capitale de la France, mentionnée dans le texte.',
      },
      {
        id: 'marseille',
        text: 'Marseille',
        explanation: 'Marseille est un grand port, mais pas la capitale.',
      },
    ],
    correctOptionId: 'paris',
  },
};

/** A well-formed `responseFormat` payload. */
export const validMultipleChoiceResponse = { selectedOptionId: 'paris' };

/** Missing the required `selectedOptionId`. */
export const responseMissingSelection = {};

/** Carries a property the schema forbids (`additionalProperties: false`). */
export const responseWithUnknownField = {
  selectedOptionId: 'paris',
  wager: 100,
};
