type FormInput = {
    labelText: string;
    placeholder: string;
  };

const formInputMap: { [key: string]: FormInput } = {
    'billFromAddress': {
      labelText: 'Street Address',
      placeholder: '123 Baker Street',
    },
    'billFromCity': {
      labelText: 'City',
      placeholder: 'Glasgow',
    },
    'billFromPostcode': {
      labelText: 'Postcode',
      placeholder: 'PA4 0LA',
    },
    'billFromCountry': {
      labelText: 'Country',
      placeholder: 'UK',
    },
    'billToName': {
      labelText: 'Client Name',
      placeholder: '',
    },
    'billToEmail': {
      labelText: 'Client Email',
      placeholder: 'eg example@gmail.com',
    },
    'billToAddress': {
      labelText: 'Street Address',
      placeholder: '10 Downing Street',
    },
    'billToCity': {
      labelText: 'City',
      placeholder: 'London',
    },
    'billToPostcode': {
      labelText: 'Postcode',
      placeholder: 'NW1 1AA',
    },
    'billToCountry': {
      labelText: 'Country',
      placeholder: 'UK',
    },
    'billToDescription': {
      labelText: 'Project Description',
      placeholder: '',
    },
    'billInvoiceDate': {
      labelText: 'Invoice Date',
      placeholder: '',
    },
    'billToTerms': {
      labelText: 'Payment Terms',
      placeholder: '',
    },
    
    // ... (other TextInput components)
  };

  export default formInputMap