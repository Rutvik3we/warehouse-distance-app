import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private readonly zipCodeRanges = [
    { min: '00600', max: '00799', state: 'Puerto Rico', abbr: 'PR' },
    { min: '00800', max: '00899', state: 'US Virgin Islands', abbr: 'VI' },
    { min: '00900', max: '00999', state: 'Puerto Rico', abbr: 'PR' },
    { min: '01000', max: '02799', state: 'Massachusetts', abbr: 'MA' },
    { min: '02800', max: '02999', state: 'Rhode Island', abbr: 'RI' },
    { min: '03000', max: '03899', state: 'New Hampshire', abbr: 'NH' },
    { min: '03900', max: '04999', state: 'Maine', abbr: 'ME' },
    { min: '05000', max: '05999', state: 'Vermont', abbr: 'VT' },
    { min: '06000', max: '06999', state: 'Connecticut', abbr: 'CT' },
    { min: '07000', max: '08999', state: 'New Jersey', abbr: 'NJ' },
    { min: '10000', max: '14999', state: 'New York', abbr: 'NY' },
    { min: '15000', max: '19699', state: 'Pennsylvania', abbr: 'PA' },
    { min: '19700', max: '19999', state: 'Delaware', abbr: 'DE' },
    { min: '20000', max: '20099', state: 'District of Columbia', abbr: 'DC' },
    { min: '20100', max: '24699', state: 'Maryland', abbr: 'MD' },
    { min: '24700', max: '26999', state: 'West Virginia', abbr: 'WV' },
    { min: '27000', max: '28999', state: 'North Carolina', abbr: 'NC' },
    { min: '29000', max: '29999', state: 'South Carolina', abbr: 'SC' },
    { min: '30000', max: '31999', state: 'Georgia', abbr: 'GA' },
    { min: '32000', max: '34999', state: 'Florida', abbr: 'FL' },
    { min: '35000', max: '36999', state: 'Alabama', abbr: 'AL' },
    { min: '37000', max: '38599', state: 'Tennessee', abbr: 'TN' },
    { min: '38600', max: '39999', state: 'Mississippi', abbr: 'MS' },
    { min: '40000', max: '42799', state: 'Kentucky', abbr: 'KY' },
    { min: '43000', max: '45999', state: 'Ohio', abbr: 'OH' },
    { min: '46000', max: '47999', state: 'Indiana', abbr: 'IN' },
    { min: '48000', max: '49999', state: 'Michigan', abbr: 'MI' },
    { min: '50000', max: '52999', state: 'Iowa', abbr: 'IA' },
    { min: '53000', max: '54999', state: 'Wisconsin', abbr: 'WI' },
    { min: '55000', max: '56799', state: 'Minnesota', abbr: 'MN' },
    { min: '57000', max: '57799', state: 'South Dakota', abbr: 'SD' },
    { min: '58000', max: '58999', state: 'North Dakota', abbr: 'ND' },
    { min: '59000', max: '59999', state: 'Montana', abbr: 'MT' },
    { min: '60000', max: '62999', state: 'Illinois', abbr: 'IL' },
    { min: '63000', max: '65899', state: 'Missouri', abbr: 'MO' },
    { min: '66000', max: '67999', state: 'Kansas', abbr: 'KS' },
    { min: '68000', max: '69999', state: 'Nebraska', abbr: 'NE' },
    { min: '70000', max: '71599', state: 'Louisiana', abbr: 'LA' },
    { min: '71600', max: '72999', state: 'Arkansas', abbr: 'AR' },
    { min: '73000', max: '74999', state: 'Oklahoma', abbr: 'OK' },
    { min: '75000', max: '79999', state: 'Texas', abbr: 'TX' },
    { min: '80000', max: '81999', state: 'Colorado', abbr: 'CO' },
    { min: '82000', max: '83199', state: 'Wyoming', abbr: 'WY' },
    { min: '83200', max: '83999', state: 'Idaho', abbr: 'ID' },
    { min: '84000', max: '84999', state: 'Utah', abbr: 'UT' },
    { min: '85000', max: '86999', state: 'Arizona', abbr: 'AZ' },
    { min: '87000', max: '88499', state: 'New Mexico', abbr: 'NM' },
    { min: '88900', max: '89999', state: 'Nevada', abbr: 'NV' },
    { min: '90000', max: '96699', state: 'California', abbr: 'CA' },
    { min: '96700', max: '96899', state: 'Hawaii', abbr: 'HI' },
    { min: '97000', max: '97999', state: 'Oregon', abbr: 'OR' },
    { min: '98000', max: '99499', state: 'Washington', abbr: 'WA' },
    { min: '99500', max: '99999', state: 'Alaska', abbr: 'AK' }
  ];

  getStateFromZipCode(zipCode: string): { state: string; abbr: string } | null {
    const match = this.zipCodeRanges.find(range => 
      zipCode >= range.min && zipCode <= range.max
    );
    return match ? { state: match.state, abbr: match.abbr } : null;
  }
} 