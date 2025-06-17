const formatDesc = (rawDesc) => {
  if (!rawDesc) return ""

  return rawDesc
    ?.replace(/\f/g, "\n")
    ?.replace(/\u00ad\n/g, "")
    ?.replace(/\u00ad/g, "")
    ?.replace(/ -\n/g, " - ")
    ?.replace(/-\n/g, "-")
    ?.replace(/\n/g, " ")
}

const capitalizeUppercase = (text) => {
  const capitalize = (word) => {
    return word.charAt(0) + word.slice(1).toLowerCase()
  }
  return text.replace(/\b[A-Z]+\b(?!')/g, (word) => {
    return word.length > 1 ? capitalize(word) : word
  })
}

const urlConvert = (text) => {
  const url = text?.url
  const parts = url?.split("/")
  const id = parts[parts?.length - 2]

  return id
}

const formatId = (id) => `#${String(id).padStart(4, "0")}`

export { formatDesc, capitalizeUppercase, urlConvert, formatId }
