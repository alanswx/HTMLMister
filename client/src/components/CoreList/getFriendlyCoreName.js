const removeFileExtension = filename => {
  const indexOfDot = filename.lastIndexOf(".");

  if (indexOfDot === -1) return filename;

  const withoutExtension = filename.substring(0, indexOfDot);

  return withoutExtension;
};

const removeCoeffFromEnd = filename =>
  filename.endsWith("_Coeff")
    ? filename.substring(0, filename.length - 5)
    : filename;

const stripTrailingDates = filename =>
  filename.replace(/[_,\s]*\d{2,4}[_,\s]*\d{1,2}[_,\s]*\d{1,2}[_,\s]*$/g, "");

const getFriendlyCoreName = filename =>
  stripTrailingDates(removeCoeffFromEnd(removeFileExtension(filename)));

export default getFriendlyCoreName;
