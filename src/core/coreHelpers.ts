function checkForMongoOperators(obj: any) {
  for (const key in obj) {
    if (key.startsWith("$")) {
      return true;
    }
  }
  return false;
}
