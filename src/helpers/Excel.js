import { Workbook } from 'exceljs'

export default class Excel {
  constructor(file) {
    this.file = file
    this.workbook = false
  }

  async build() {
    await new Promise((resolve, reject) => {
      const reader = new FileReader()
      const workbook = new Workbook()
      reader.readAsArrayBuffer(this.file)
      reader.onload = async () => {
        let headers = []

        const buffer = reader.result
        await workbook.xlsx
          .load(buffer)
          .then(wb => {
            this.workbook = wb
            resolve(wb)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
    return this
  }

  async toJson(options = { headerIndex: 1, headers: {} }) {
    const values = []

    this.workbook.eachSheet((sheet, id) => {
      const headers = Object.keys(options.headers).length ? options.headers : sheet.getRow(options.headerIndex).values

      sheet.eachRow((row, rowIndex) => {
        if (rowIndex == options.headerIndex) return
        let value = {}
        row.values.forEach((column, index) => {
          value[headers[index - 1]] = column
        })
        values.push(value)
      })
    })
    return values
  }
  get sheets() {
    return this.workbook.worksheets
  }
}
