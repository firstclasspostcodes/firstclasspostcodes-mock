const authorizer = (req, scopes, definition) => {
  const value = req.get(definition.name);
  if (!value) throw {
    status: 403,
    message: `Missing "${definition.name}" in ${definition.in}.`,
  };
  if (value !== '111111111111') throw {
    status: 403,
    message: `Invalid API Key "${value}"`,
  };
  return Promise.resolve(true);
};

module.exports = authorizer;