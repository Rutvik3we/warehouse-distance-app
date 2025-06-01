import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private readonly zipCodeRanges: { [key: string]: string } = {
    '00': 'PR',
    '01': 'MA', '02': 'MA',
    '03': 'NH',
    '04': 'ME',
    '05': 'VT',
    '06': 'CT',
    '07': 'NJ', '08': 'NJ',
    '10': 'NY', '11': 'NY', '12': 'NY', '13': 'NY', '14': 'NY',
    '15': 'PA', '16': 'PA', '17': 'PA', '18': 'PA', '19': 'PA',
    '20': 'DC', '21': 'MD', '22': 'VA', '23': 'VA', '24': 'VA',
    '25': 'WV',
    '26': 'WV', '27': 'NC', '28': 'NC',
    '29': 'SC',
    '30': 'GA', '31': 'GA', '32': 'FL', '33': 'FL', '34': 'FL',
    '35': 'AL', '36': 'AL',
    '37': 'TN', '38': 'TN',
    '39': 'MS',
    '40': 'KY', '41': 'KY', '42': 'KY',
    '43': 'OH', '44': 'OH', '45': 'OH',
    '46': 'IN', '47': 'IN',
    '48': 'MI', '49': 'MI',
    '50': 'IA', '51': 'IA', '52': 'IA',
    '53': 'WI', '54': 'WI',
    '55': 'MN', '56': 'MN',
    '57': 'SD',
    '58': 'ND',
    '59': 'MT',
    '60': 'IL', '61': 'IL', '62': 'IL',
    '63': 'MO', '64': 'MO', '65': 'MO',
    '66': 'KS', '67': 'KS',
    '68': 'NE', '69': 'NE',
    '70': 'LA', '71': 'LA',
    '72': 'AR', '73': 'OK', '74': 'OK',
    '75': 'TX', '76': 'TX', '77': 'TX', '78': 'TX', '79': 'TX',
    '80': 'CO', '81': 'CO',
    '82': 'WY',
    '83': 'ID',
    '84': 'UT',
    '85': 'AZ', '86': 'AZ',
    '87': 'NM', '88': 'NM',
    '89': 'NV',
    '90': 'CA', '91': 'CA', '92': 'CA', '93': 'CA', '94': 'CA', '95': 'CA', '96': 'CA',
    '97': 'OR', '98': 'WA', '99': 'WA'
  };

  private readonly stateNames: { [key: string]: string } = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut',
    'DE': 'Delaware', 'DC': 'District of Columbia',
    'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana',
    'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana',
    'ME': 'Maine', 'MD': 'Maryland', 'MA': 'Massachusetts', 'MI': 'Michigan',
    'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana',
    'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota',
    'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania',
    'RI': 'Rhode Island', 'SC': 'South Carolina', 'SD': 'South Dakota',
    'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming', 'PR': 'Puerto Rico'
  };

  getStateFromZipCode(zipCode: string): string {
    if (!zipCode || zipCode.length < 2) return '';
    const prefix = zipCode.substring(0, 2);
    const stateCode = this.zipCodeRanges[prefix];
    return this.stateNames[stateCode] || '';
  }
} 