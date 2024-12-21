import * as convert from 'convert-units';

export function parseAndConvertUnitUtil(input: string, toUnit: convert.Unit) {
  // Regex to extract numeric value and unit
  const match = input.match(/^(\d+)([a-zA-Z]+)$/);
  if (!match) {
    throw new Error(
      'Invalid input format. Expected format: <value><unit>, e.g., 24h',
    );
  }

  const value = parseFloat(match[1]); // Extract the numeric value
  const unit: convert.Unit = match[2] as convert.Unit; // Extract the unit

  // Use convert-units to perform the conversion
  const result = convert(value).from(unit).to(toUnit);
  return result;
}
