const convert = {
  toPhoneNumber: num => {
    let str = num
    let arr = str.split('')

    arr.splice(0, 1, '+84')
    return arr.join('').toString()
  },
  toCurrency: num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  },
  toCapital: text => {
    const arr = text
      .trim()
      .replace(/[ ][ ]*/g, ' ')
      .split(' ')
      .map(sub => {
        return sub[0].toUpperCase() + sub.substring(1, sub.length) + ' '
      })

    return arr.join('').toString()
  }
}

export default convert
