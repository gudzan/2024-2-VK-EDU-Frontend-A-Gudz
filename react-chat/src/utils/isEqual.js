const isEqual = (value, other) => {
  if (value === other) return true
  if (value == null || other == null) return false
  if (typeof value !== typeof other) return false

  if (typeof value === "object") {
    const valueKeys = Object.keys(value)
    const otherKeys = Object.keys(other)

    if (valueKeys.length !== otherKeys.length) return false

    for (const key of valueKeys) {
      if (!otherKeys.includes(key) || !isEqual(value[key], other[key])) {
        return false
      }
    }
    return true
  }

  return false
}

export default isEqual
