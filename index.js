'use strict'

const { TransactionProcessor } = require('sawtooth-sdk/processor')

const SampleLicenseHandler = require('./sampleLicense_handler')


const transactionProcessor = new TransactionProcessor('tcp://localhost:4004')

transactionProcessor.addHandler(new SampleLicenseHandler())
transactionProcessor.start()

console.log(`Starting SampleLicense transaction processor`)