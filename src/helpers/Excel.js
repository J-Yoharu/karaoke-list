import { Workbook } from 'exceljs'

export default class Excel {
  constructor(file) {
    this.file = file
    this.workbook = false
    this.worksheetId = 1
  }

  async build() {
    await new Promise((resolve, reject) => {
      const reader = new FileReader()
      const workbook = new Workbook()
      reader.readAsArrayBuffer(this.file)
      reader.onload = async () => {
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

  selectWorksheetById(id) {
    this.worksheetId = id
    return this
  }

  async toJson(options = { headerIndex: 1 }) {
    return new Promise((resolve, reject) => {
      try {
        const values = []
        if (!options.header) options.headers = {}
        const sheet = this.workbook.getWorksheet(this.worksheetId)
        const headers = sheet.getRow(options.headerIndex ? options.headerIndex : 1).values

        sheet.eachRow((row, rowIndex) => {
          if (rowIndex == options.headerIndex) return
          let value = {}
          row.values.forEach((column, index) => {
            value[headers[index]] = column
          })
          values.push(value)
        })
        resolve(values)
      } catch (error) {
        reject(error)
      }
    })
  }

  get sheets() {
    return this.workbook.worksheets
  }
}
