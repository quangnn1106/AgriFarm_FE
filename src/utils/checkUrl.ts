export const hasDuplicate = (strings: string): boolean => {
  const stringSet = new Set<string>();

  for (const str of strings) {
    if (stringSet.has(str)) {
      return true; // Duplicate found
    }

    stringSet.add(str);
  }

  return false; // No duplicate found
};
