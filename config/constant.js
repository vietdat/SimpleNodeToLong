'use strict';

module.exports = {
  CREDIT_FOR_CHARGE: {
    1 : 1,
    2 : 1,
    3 : 1,
    4 : 1,
    5: 1
  },
  SURVEY_REQUEST_STATUS : {
    PENDDING: 0,
    APPROVED: 1,
    DENY: 2
  },
  PAYMENT_METHOD: {
    1 : 'PayPal',
    2 : 'CreditCard'
  },
  INVOICE_EMAIL : {
    SUBJECT: 'Invoice # ',
    CONTENT: '<h1>test</h1>',
  },
  SURVEY_TYPE: {
    ROI: 'ROI Survey',
    threeSixty: '360 degree Survey',
    RC: 'Reference Check Survey',
    CS: 'Culture Survey'
  },
  typeUser: {
    MEMBEROFORGANIZATION: 'member_organization',
    ORGANIZATION: 'organization',
    INDIVIDUAL: 'individual'
  },
  USER_REQUEST_CREATED_MAIL: {
    subject: 'New credit request',
    content: "<p>There's a new credit request from [first name] [last name] for project [project name]. Please take an action <a href='[link]'>here</a> .</p>"
  },
  USER_REQUEST_APPROVED_MAIL: {
    subject: 'Your credit request was approved',
    content: 'Your credit request for project [project name] was approved by [first name] [last name].'
  }
};
