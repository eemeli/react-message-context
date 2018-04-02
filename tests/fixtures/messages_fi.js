var fi = function (n, ord) {
  var s = String(n).split('.'), v0 = !s[1];
  if (ord) return 'other';
  return (n == 1 && v0) ? 'one' : 'other';
};
var number = function (value, name, offset) {
  if (!offset) return value;
  if (isNaN(value)) throw new Error('Can\'t apply offset:' + offset + ' to argument `' + name +
                                    '` with non-numerical value ' + JSON.stringify(value) + '.');
  return value - offset;
};
var plural = function (value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value];
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key];
  return data.other;
};

export default {
  message: function(d) { return "Viestisi"; },
  errors: {
    accepted: function(d) { return "pitää hyväksyä"; },
    wrong_length: function(d) { return "on väärän pituinen (pitäisi olla " + plural(d.count, 0, fi, { one: "1 merkki", other: number(d.count, "count") + " merkkiä" }) + ")"; }
  }
}
