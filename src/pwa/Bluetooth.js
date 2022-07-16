export class Bluetooth {
  server = null
  service = null
  client = null
  characteristic = null

  constructor() {
    if (!'bluetooth' in navigator) throw new Exception('Dispositivo não possui compatibilidade com esta função')

    this.client = navigator.bluetooth
  }

  async findDevices(options = { filters: [] }) {
    // options = options.filters.length ? options : { acceptAllDevices: true }
    const device = await navigator.bluetooth.requestDevice(options)

    this.server = await device.gatt.connect()
    return this
  }

  async getService(serviceName = '') {
    this.service = await this.server.getPrimaryService(serviceName)
    return this
  }

  async getCharacteristic(CharacteristicName) {
    return await this.service.getCharacteristic(CharacteristicName)
  }

  // const openBluetooth = async () => {
  //     let amazfitServices = [
  //       {
  //         name: '00003802-0000-1000-8000-00805f9b34fb',
  //         characteristics: ['00004a02-0000-1000-8000-00805f9b34fb'],
  //       },
  //       {
  //         name: '00001802-0000-1000-8000-00805f9b34fb',
  //         characteristics: ['00002a06-0000-1000-8000-00805f9b34fb'],
  //       },
  //       {
  //         name: '0000180d-0000-1000-8000-00805f9b34fb',
  //         characteristics: ['00002a37-0000-1000-8000-00805f9b34fb', '00002a39-0000-1000-8000-00805f9b34fb'],
  //       },
  //       {
  //         name: '0000fee1-0000-1000-8000-00805f9b34fb',
  //         characteristics: [
  //           '00000009-0000-3512-2118-0009af100700',
  //           '0000fed0-0000-1000-8000-00805f9b34fb',
  //           '0000fed1-0000-1000-8000-00805f9b34fb',
  //           '0000fed2-0000-1000-8000-00805f9b34fb',
  //           '0000fed3-0000-1000-8000-00805f9b34fb',
  //           '0000fedd-0000-1000-8000-00805f9b34fb',
  //           '0000fede-0000-1000-8000-00805f9b34fb',
  //           '0000fedf-0000-1000-8000-00805f9b34fb',
  //         ],
  //       },
  //       {
  //         name: '00001800-0000-1000-8000-00805f9b34fb',
  //         characteristics: ['00002a00-0000-1000-8000-00805f9b34fb', '00002a01-0000-1000-8000-00805f9b34fb'],
  //       },
  //       {
  //         name: '00001530-0000-3512-2118-0009af100700',
  //         characteristics: ['00001531-0000-3512-2118-0009af100700', '00001532-0000-3512-2118-0009af100700'],
  //       },
  //       {
  //         name: '00001811-0000-1000-8000-00805f9b34fb',
  //         characteristics: ['00002a44-0000-1000-8000-00805f9b34fb', '00002a46-0000-1000-8000-00805f9b34fb'],
  //       },
  //       {
  //         name: '0000fee0-0000-1000-8000-00805f9b34fb',
  //         characteristics: [
  //           '00000001-0000-3512-2118-0009af100700',
  //           '00000002-0000-3512-2118-0009af100700',
  //           '00000003-0000-3512-2118-0009af100700',
  //           '00000004-0000-3512-2118-0009af100700',
  //           '00000005-0000-3512-2118-0009af100700',
  //           '00000006-0000-3512-2118-0009af100700',
  //           '00000007-0000-3512-2118-0009af100700',
  //           '00000008-0000-3512-2118-0009af100700',
  //           '0000000e-0000-3512-2118-0009af100700',
  //           '00000010-0000-3512-2118-0009af100700',
  //           '00000020-0000-3512-2118-0009af100700',
  //           '00002a04-0000-1000-8000-00805f9b34fb',
  //           '00002a2b-0000-1000-8000-00805f9b34fb',
  //         ],
  //       },
  //       {
  //         name: '0000180a-0000-1000-8000-00805f9b34fb',
  //         characteristics: [
  //           '00000014-0000-3512-2118-0009af100700',
  //           '00002a23-0000-1000-8000-00805f9b34fb',
  //           '00002a25-0000-1000-8000-00805f9b34fb',
  //           '00002a27-0000-1000-8000-00805f9b34fb',
  //           '00002a28-0000-1000-8000-00805f9b34fb',
  //           '00002a50-0000-1000-8000-00805f9b34fb',
  //         ],
  //       },
  //       {
  //         name: '00001801-0000-1000-8000-00805f9b34fb',
  //         characteristics: ['00002a05-0000-1000-8000-00805f9b34fb'],
  //       },
  //     ]

  //     const client = new Bluetooth()

  //     const service = await client.findDevices({
  //       filters: [
  //         {
  //           manufacturerData: [
  //             {
  //               companyIdentifier: 0x0157,
  //               dataPrefix: new Uint8Array([0x0157, 0x0157]),
  //             },
  //           ],
  //         },
  //         { name: 'Amazfit GTR' },
  //         { services: [0x0157, 0x02ffffffffffffffffffffffffffffffff03cd80a2cd5ce7] },
  //         { services: amazfitServices.map(i => i.name) },
  //       ],
  //     })

  //     console.log({ service })

  //     for (const s of amazfitServices) {
  //       const primaryService = await service.getService(s.name)

  //       for (const c of s.characteristics) {
  //         try {
  //           const characteristic = await primaryService.getCharacteristic(c)

  //           await characteristic.startNotifications()
  //           characteristic.addEventListener('characteristicvaluechanged', e => {
  //             console.log({ e })
  //             console.log(new Int16Array(e.target.value))
  //             const value = e.target.value.getUint8(0)
  //             v.value = value
  //             console.log(`characteristics`, value)
  //           })

  //           let characteristicValue = await characteristic.readValue()
  //           console.log({ characteristicValue })

  //           try {
  //             console.log(characteristicValue.getUint8(0))
  //           } catch (error) {
  //             console.log('deu erro')
  //             console.log(characteristicValue)
  //           }
  //         } catch (err) {
  //           console.log('deu erro 2')
  //         }
  //       }
  //     }

  //     // characteristic.addEventListener('characteristicvaluechanged', e => {
  //     //   console.log({ e })
  //     //   console.log(new Int16Array(e.target.value))
  //     //   const value = e.target.value.getUint8(0)
  //     //   v.value = value
  //     //   console.log(`characteristics`, value)
  //     // })

  //     // if ('bluetooth' in navigator) {
  //     //   console.log('Bluetooth Disponível')

  //     //   try {
  //     //     const device = await navigator.bluetooth.requestDevice({
  //     //       // acceptAllDevices: true,
  //     //       filters: [{ services: ['heart_rate'] }],
  //     //     })

  //     //     // device.addEventListener('gattserverdisconnected', () => {
  //     //     //   console.log('dispositivo desconectado')
  //     //     // })
  //     //     console.log({ device })
  //     //     const server = await device.gatt.connect()
  //     //     console.log({ server })
  //     //     const service = await server.getPrimaryService('heart_rate')
  //     //     console.log({ service })
  //     //     const characteristic = await service.getCharacteristic(bleCharacteristic)

  //     //     await characteristic.startNotifications()

  //     //     characteristic.addEventListener('characteristicvaluechanged', e => {
  //     //       const value = e.target.value.getUint8(0)

  //     //       console.log(`${bleCharacteristic} changed`, value)

  //     //       batteryIndicator.value = value
  //     //     })

  //     //     characteristic.readValue()

  //     //     return characteristic
  //     //   } catch (err) {
  //     //     console.error(err)
  //     //   }
  //     // }
  //   }
}
