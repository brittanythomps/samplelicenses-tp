const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError} = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const crypto = require('crypto')

const _hash = (x) =>
    crypto.createHash('sha512').update(x).digest('hex').toLowerCase()

const TP_FAMILY = 'sampleLicense'
const TP_NAMESPACE=_hash(TP_FAMILY).substring(0,6)
const TP_VERSION = '1.0'

const _decodeCbor = buffer =>
    new Promise((resolve,reject) =>
        cbor.decodeFirst(buffer, (err, obj) => (err ? reject(err): resolve(obj)))
    )
const _toInternalError = (err) => {
    let message = (err.message) ? err.message : err
    throw new InternalError(message)
}

class sampleLicenseHandler extends TransactionHandler {
    constructor(){
        super(TP_FAMILY,[TP_VERSION],[TP_NAMESPACE])
    }
    apply (transactionProcessRequest, context){
        return _decodeCbor(transactionProcessRequest.payload)
        .catch(_toInternalError)
        .then((update)=>{
            let id = update.Customer_ID
            if(!id) {
                throw new InvalidTransaction('Customer ID is Requried')
            }
            let product = update.Product
            if (!product) {
                throw new InvalidTransaction('Product is required')
            }
            let version=update.Version
            if (!version) {
                throw new InvalidTransaction('Version is required')
            }
            let overwrite=update.Overwrite
            if (!overwrite) {
                throw new InvalidTransaction('Overwrite is required')
            }
            let stackable=update.Stackable
            if (!stackable) {
                throw new InvalidTransaction('Stackable is required')
            }     
            let phone_home=update.Phone_Home
            if (!phone_home) {
                throw new InvalidTransaction('Phone home is required')
            }     
            let time_period=update.Time_Period
            if (!time_period) {
                throw new InvalidTransaction('Time period is required')
            }                                     
            console.log('Customer ID: '+ id +'\n Product: '+ product +'\n Version ' + version + '\n Overwrite? ' + overwrite + '\n Stackable? ' + stackable + '\n Phone home? ' + phone_home + '\n Time Period: ' + time_period)
        })
    }
}
module.exports=sampleLicenseHandler
