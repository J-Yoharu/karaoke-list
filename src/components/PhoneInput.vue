<template>
  <v-row dense>
    <v-col cols="4">
      <v-select
        v-model="country"
        :value="country"
        return-object
        :items="countries"
        item-text="country"
<<<<<<< HEAD
        @change="updateValue"
=======
>>>>>>> 0f774ed1c1e727e87b705d04b2121e7583963a17
        outlined
        label="DDI"
        class="mr-2"
        :rules="[...rules]"
      >
        <template #item="{ item }">
          <country-flag :country="item.alpha2" /> <span class="ml-2">{{ item.country }} </span>
        </template>

        <template #selection> <country-flag :country="country.alpha2" /> </template>
      </v-select>
    </v-col>
    <v-col cols="8">
      <v-text-field
        outlined
        v-model="phone"
        label="Celular"
        placeholder="DDD"
        v-mask:number="phoneMask"
        :rules="[...rules]"
        type="tel"
      >
        <template #prepend-inner>
          <div class="mt-1">
            {{ country.ddi }}
          </div>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import { unformat } from '@/directives/mask'
export default {
  components: {
    CountryFlag,
  },
  props: {
    rules: {
      type: Array,
    },
    value: {
      required: true,
    },
    formatModel: {
      default: false,
    },
  },

  setup(props, { emit }) {
    onMounted(() => {
      const language = navigator.language.toUpperCase()
      const alpha2 = language.includes('-') ? language.split('-')[1] : language
      country.value = countries.find(c => c.alpha2 == alpha2) ?? {}
    })

    const phoneComputed = computed(() => unformat(`${country.value.ddi}${phone.value}`, phoneMask))
    const phone = ref('')
    const phoneMask = '(##) #####-####'

    const menu = ref(false)

    const country = ref({})
    const countries = [
      {
        country: 'Afghanistan',
        alpha2: 'AF',
        ddi: '+93',
      },
      {
        country: 'Aland Islands',
        alpha2: 'AX',
        ddi: '+358',
      },
      {
        country: 'Albania',
        alpha2: 'AL',
        ddi: '+355',
      },
      {
        country: 'Algeria',
        alpha2: 'DZ',
        ddi: '+213',
      },
      {
        country: 'American Samoa',
        alpha2: 'AS',
        ddi: '+1684',
      },
      {
        country: 'Andorra',
        alpha2: 'AD',
        ddi: '+376',
      },
      {
        country: 'Angola',
        alpha2: 'AO',
        ddi: '+244',
      },
      {
        country: 'Anguilla',
        alpha2: 'AI',
        ddi: '+1264',
      },
      {
        country: 'Antarctica',
        alpha2: 'AQ',
        ddi: '+672',
      },
      {
        country: 'Antigua and Barbuda',
        alpha2: 'AG',
        ddi: '+1268',
      },
      {
        country: 'Argentina',
        alpha2: 'AR',
        ddi: '+54',
      },
      {
        country: 'Armenia',
        alpha2: 'AM',
        ddi: '+374',
      },
      {
        country: 'Aruba',
        alpha2: 'AW',
        ddi: '+297',
      },
      {
        country: 'Australia',
        alpha2: 'AU',
        ddi: '+61',
      },
      {
        country: 'Austria',
        alpha2: 'AT',
        ddi: '+43',
      },
      {
        country: 'Azerbaijan',
        alpha2: 'AZ',
        ddi: '+994',
      },
      {
        country: 'Bahamas',
        alpha2: 'BS',
        ddi: '+1242',
      },
      {
        country: 'Bahrain',
        alpha2: 'BH',
        ddi: '+973',
      },
      {
        country: 'Bangladesh',
        alpha2: 'BD',
        ddi: '+880',
      },
      {
        country: 'Barbados',
        alpha2: 'BB',
        ddi: '+1246',
      },
      {
        country: 'Belarus',
        alpha2: 'BY',
        ddi: '+375',
      },
      {
        country: 'Belgium',
        alpha2: 'BE',
        ddi: '+32',
      },
      {
        country: 'Belize',
        alpha2: 'BZ',
        ddi: '+501',
      },
      {
        country: 'Benin',
        alpha2: 'BJ',
        ddi: '+229',
      },
      {
        country: 'Bermuda',
        alpha2: 'BM',
        ddi: '+1441',
      },
      {
        country: 'Bhutan',
        alpha2: 'BT',
        ddi: '+975',
      },
      {
        country: 'Bolivia',
        alpha2: 'BO',
        ddi: '+591',
      },
      {
        country: 'Bosnia and Herzegovina',
        alpha2: 'BA',
        ddi: '+387',
      },
      {
        country: 'Botswana',
        alpha2: 'BW',
        ddi: '+267',
      },
      {
        country: 'Bouvet Island',
        alpha2: 'BV',
        ddi: '+47',
      },
      {
        country: 'Brasil',
        alpha2: 'BR',
        ddi: '+55',
      },
      {
        country: 'British Virgin Islands',
        alpha2: 'VG',
        ddi: '+1284',
      },
      {
        country: 'British Indian Ocean Territory',
        alpha2: 'IO',
        ddi: '+246',
      },
      {
        country: 'Brunei Darussalam',
        alpha2: 'BN',
        ddi: '+673',
      },
      {
        country: 'Bulgaria',
        alpha2: 'BG',
        ddi: '+359',
      },
      {
        country: 'Burkina Faso',
        alpha2: 'BF',
        ddi: '+226',
      },
      {
        country: 'Burundi',
        alpha2: 'BI',
        ddi: '+257',
      },
      {
        country: 'Cambodia',
        alpha2: 'KH',
        ddi: '+855',
      },
      {
        country: 'Cameroon',
        alpha2: 'CM',
        ddi: '+237',
      },
      {
        country: 'Canada',
        alpha2: 'CA',
        ddi: '+1',
      },
      {
        country: 'Cape Verde',
        alpha2: 'CV',
        ddi: '+238',
      },
      {
        country: 'Cayman Islands',
        alpha2: 'KY',
        ddi: '+1345',
      },
      {
        country: 'Central African Republic',
        alpha2: 'CF',
        ddi: '+236',
      },
      {
        country: 'Chad',
        alpha2: 'TD',
        ddi: '+235',
      },
      {
        country: 'Chile',
        alpha2: 'CL',
        ddi: '+56',
      },
      {
        country: 'China',
        alpha2: 'CN',
        ddi: '+86',
      },
      {
        country: 'Hong Kong, SAR China',
        alpha2: 'HK',
        ddi: '+852',
      },
      {
        country: 'Macao, SAR China',
        alpha2: 'MO',
        ddi: '+853',
      },
      {
        country: 'Christmas Island',
        alpha2: 'CX',
        ddi: '+61',
      },
      {
        country: 'Cocos (Keeling) Islands',
        alpha2: 'CC',
        ddi: '+61',
      },
      {
        country: 'Colombia',
        alpha2: 'CO',
        ddi: '+57',
      },
      {
        country: 'Comoros',
        alpha2: 'KM',
        ddi: '+269',
      },
      {
        country: 'Congo (Brazzaville)',
        alpha2: 'CG',
        ddi: '+242',
      },
      {
        country: 'Congo, (Kinshasa)',
        alpha2: 'CD',
        ddi: '+243',
      },
      {
        country: 'Cook Islands',
        alpha2: 'CK',
        ddi: '+682',
      },
      {
        country: 'Costa Rica',
        alpha2: 'CR',
        ddi: '+506',
      },
      {
        country: "C“te d'Ivoire",
        alpha2: 'CI',
        ddi: '+225',
      },
      {
        country: 'Croatia',
        alpha2: 'HR',
        ddi: '+385',
      },
      {
        country: 'Cuba',
        alpha2: 'CU',
        ddi: '+53',
      },
      {
        country: 'Cyprus',
        alpha2: 'CY',
        ddi: '+357',
      },
      {
        country: 'Czech Republic',
        alpha2: 'CZ',
        ddi: '+420',
      },
      {
        country: 'Denmark',
        alpha2: 'DK',
        ddi: '+45',
      },
      {
        country: 'Djibouti',
        alpha2: 'DJ',
        ddi: '+253',
      },
      {
        country: 'Dominica',
        alpha2: 'DM',
        ddi: '+1767',
      },
      {
        country: 'Dominican Republic',
        alpha2: 'DO',
        ddi: '+1809',
      },
      {
        country: 'Dominican Republic',
        alpha2: 'DO',
        ddi: '+1829',
      },
      {
        country: 'Dominican Republic',
        alpha2: 'DO',
        ddi: '+1849',
      },
      {
        country: 'Ecuador',
        alpha2: 'EC',
        ddi: '+593',
      },
      {
        country: 'Egypt',
        alpha2: 'EG',
        ddi: '+20',
      },
      {
        country: 'El Salvador',
        alpha2: 'SV',
        ddi: '+503',
      },
      {
        country: 'Equatorial Guinea',
        alpha2: 'GQ',
        ddi: '+240',
      },
      {
        country: 'Eritrea',
        alpha2: 'ER',
        ddi: '+291',
      },
      {
        country: 'Estonia',
        alpha2: 'EE',
        ddi: '+372',
      },
      {
        country: 'Ethiopia',
        alpha2: 'ET',
        ddi: '+251',
      },
      {
        country: 'Falkland Islands (Malvinas)',
        alpha2: 'FK',
        ddi: '+500',
      },
      {
        country: 'Faroe Islands',
        alpha2: 'FO',
        ddi: '+298',
      },
      {
        country: 'Fiji',
        alpha2: 'FJ',
        ddi: '+679',
      },
      {
        country: 'Finland',
        alpha2: 'FI',
        ddi: '+358',
      },
      {
        country: 'France',
        alpha2: 'FR',
        ddi: '+33',
      },
      {
        country: 'French Guiana',
        alpha2: 'GF',
        ddi: '+594',
      },
      {
        country: 'French Polynesia',
        alpha2: 'PF',
        ddi: '+689',
      },
      {
        country: 'French Southern Territories',
        alpha2: 'TF',
        ddi: '+262',
      },
      {
        country: 'Gabon',
        alpha2: 'GA',
        ddi: '+241',
      },
      {
        country: 'Gambia',
        alpha2: 'GM',
        ddi: '+220',
      },
      {
        country: 'Georgia',
        alpha2: 'GE',
        ddi: '+995',
      },
      {
        country: 'Germany',
        alpha2: 'DE',
        ddi: '+49',
      },
      {
        country: 'Ghana',
        alpha2: 'GH',
        ddi: '+233',
      },
      {
        country: 'Gibraltar',
        alpha2: 'GI',
        ddi: '+350',
      },
      {
        country: 'Greece',
        alpha2: 'GR',
        ddi: '+30',
      },
      {
        country: 'Greenland',
        alpha2: 'GL',
        ddi: '+299',
      },
      {
        country: 'Grenada',
        alpha2: 'GD',
        ddi: '+1473',
      },
      {
        country: 'Guadeloupe',
        alpha2: 'GP',
        ddi: '+590',
      },
      {
        country: 'Guam',
        alpha2: 'GU',
        ddi: '+1671',
      },
      {
        country: 'Guatemala',
        alpha2: 'GT',
        ddi: '+502',
      },
      {
        country: 'Guernsey',
        alpha2: 'GG',
        ddi: '+44',
      },
      {
        country: 'Guinea',
        alpha2: 'GN',
        ddi: '+224',
      },
      {
        country: 'GuineaBissau',
        alpha2: 'GW',
        ddi: '+245',
      },
      {
        country: 'Guyana',
        alpha2: 'GY',
        ddi: '+592',
      },
      {
        country: 'Haiti',
        alpha2: 'HT',
        ddi: '+509',
      },
      {
        country: 'Heard and Mcdonald Islands',
        alpha2: 'HM',
        ddi: '+672',
      },
      {
        country: 'Holy See (Vatican City State)',
        alpha2: 'VA',
        ddi: '+379',
      },
      {
        country: 'Honduras',
        alpha2: 'HN',
        ddi: '+504',
      },
      {
        country: 'Hungary',
        alpha2: 'HU',
        ddi: '+36',
      },
      {
        country: 'Iceland',
        alpha2: 'IS',
        ddi: '+354',
      },
      {
        country: 'India',
        alpha2: 'IN',
        ddi: '+91',
      },
      {
        country: 'Indonesia',
        alpha2: 'ID',
        ddi: '+62',
      },
      {
        country: 'Iran, Islamic Republic of',
        alpha2: 'IR',
        ddi: '+98',
      },
      {
        country: 'Iraq',
        alpha2: 'IQ',
        ddi: '+964',
      },
      {
        country: 'Ireland',
        alpha2: 'IE',
        ddi: '+353',
      },
      {
        country: 'Isle of Man',
        alpha2: 'IM',
        ddi: '+44',
      },
      {
        country: 'Israel',
        alpha2: 'IL',
        ddi: '+972',
      },
      {
        country: 'Italy',
        alpha2: 'IT',
        ddi: '+39',
      },
      {
        country: 'Jamaica',
        alpha2: 'JM',
        ddi: '+1876',
      },
      {
        country: 'Japan',
        alpha2: 'JP',
        ddi: '+81',
      },
      {
        country: 'Jersey',
        alpha2: 'JE',
        ddi: '+44',
      },
      {
        country: 'Jordan',
        alpha2: 'JO',
        ddi: '+962',
      },
      {
        country: 'Kazakhstan',
        alpha2: 'KZ',
        ddi: '+7',
      },
      {
        country: 'Kenya',
        alpha2: 'KE',
        ddi: '+254',
      },
      {
        country: 'Kiribati',
        alpha2: 'KI',
        ddi: '+686',
      },
      {
        country: 'Korea (North)',
        alpha2: 'KP',
        ddi: '+850',
      },
      {
        country: 'Korea (South)',
        alpha2: 'KR',
        ddi: '+82',
      },
      {
        country: 'Kuwait',
        alpha2: 'KW',
        ddi: '+965',
      },
      {
        country: 'Kyrgyzstan',
        alpha2: 'KG',
        ddi: '+996',
      },
      {
        country: 'Lao PDR',
        alpha2: 'LA',
        ddi: '+856',
      },
      {
        country: 'Latvia',
        alpha2: 'LV',
        ddi: '+371',
      },
      {
        country: 'Lebanon',
        alpha2: 'LB',
        ddi: '+961',
      },
      {
        country: 'Lesotho',
        alpha2: 'LS',
        ddi: '+266',
      },
      {
        country: 'Liberia',
        alpha2: 'LR',
        ddi: '+231',
      },
      {
        country: 'Libya',
        alpha2: 'LY',
        ddi: '+218',
      },
      {
        country: 'Liechtenstein',
        alpha2: 'LI',
        ddi: '+423',
      },
      {
        country: 'Lithuania',
        alpha2: 'LT',
        ddi: '+370',
      },
      {
        country: 'Luxembourg',
        alpha2: 'LU',
        ddi: '+352',
      },
      {
        country: 'Macedonia, Republic of',
        alpha2: 'MK',
        ddi: '+389',
      },
      {
        country: 'Madagascar',
        alpha2: 'MG',
        ddi: '+261',
      },
      {
        country: 'Malawi',
        alpha2: 'MW',
        ddi: '+265',
      },
      {
        country: 'Malaysia',
        alpha2: 'MY',
        ddi: '+60',
      },
      {
        country: 'Maldives',
        alpha2: 'MV',
        ddi: '+960',
      },
      {
        country: 'Mali',
        alpha2: 'ML',
        ddi: '+223',
      },
      {
        country: 'Malta',
        alpha2: 'MT',
        ddi: '+356',
      },
      {
        country: 'Marshall Islands',
        alpha2: 'MH',
        ddi: '+692',
      },
      {
        country: 'Martinique',
        alpha2: 'MQ',
        ddi: '+596',
      },
      {
        country: 'Mauritania',
        alpha2: 'MR',
        ddi: '+222',
      },
      {
        country: 'Mauritius',
        alpha2: 'MU',
        ddi: '+230',
      },
      {
        country: 'Mayotte',
        alpha2: 'YT',
        ddi: '+262',
      },
      {
        country: 'Mexico',
        alpha2: 'MX',
        ddi: '+52',
      },
      {
        country: 'Micronesia, Federated States of',
        alpha2: 'FM',
        ddi: '+691',
      },
      {
        country: 'Moldova, Republic of',
        alpha2: 'MD',
        ddi: '+373',
      },
      {
        country: 'Monaco',
        alpha2: 'MC',
        ddi: '+377',
      },
      {
        country: 'Mongolia',
        alpha2: 'MN',
        ddi: '+976',
      },
      {
        country: 'Montenegro',
        alpha2: 'ME',
        ddi: '+382',
      },
      {
        country: 'Montserrat',
        alpha2: 'MS',
        ddi: '+1664',
      },
      {
        country: 'Morocco',
        alpha2: 'MA',
        ddi: '+212',
      },
      {
        country: 'Mozambique',
        alpha2: 'MZ',
        ddi: '+258',
      },
      {
        country: 'Myanmar',
        alpha2: 'MM',
        ddi: '+95',
      },
      {
        country: 'Namibia',
        alpha2: 'NA',
        ddi: '+264',
      },
      {
        country: 'Nauru',
        alpha2: 'NR',
        ddi: '+674',
      },
      {
        country: 'Nepal',
        alpha2: 'NP',
        ddi: '+977',
      },
      {
        country: 'Netherlands',
        alpha2: 'NL',
        ddi: '+31',
      },
      {
        country: 'Netherlands Antilles',
        alpha2: 'AN',
        ddi: '+599',
      },
      {
        country: 'New Caledonia',
        alpha2: 'NC',
        ddi: '+687',
      },
      {
        country: 'New Zealand',
        alpha2: 'NZ',
        ddi: '+64',
      },
      {
        country: 'Nicaragua',
        alpha2: 'NI',
        ddi: '+505',
      },
      {
        country: 'Niger',
        alpha2: 'NE',
        ddi: '+227',
      },
      {
        country: 'Nigeria',
        alpha2: 'NG',
        ddi: '+234',
      },
      {
        country: 'Niue',
        alpha2: 'NU',
        ddi: '+683',
      },
      {
        country: 'Norfolk Island',
        alpha2: 'NF',
        ddi: '+672',
      },
      {
        country: 'Northern Mariana Islands',
        alpha2: 'MP',
        ddi: '+1670',
      },
      {
        country: 'Norway',
        alpha2: 'NO',
        ddi: '+47',
      },
      {
        country: 'Oman',
        alpha2: 'OM',
        ddi: '+968',
      },
      {
        country: 'Pakistan',
        alpha2: 'PK',
        ddi: '+92',
      },
      {
        country: 'Palau',
        alpha2: 'PW',
        ddi: '+680',
      },
      {
        country: 'Palestinian Territory',
        alpha2: 'PS',
        ddi: '+970',
      },
      {
        country: 'Panama',
        alpha2: 'PA',
        ddi: '+507',
      },
      {
        country: 'Papua New Guinea',
        alpha2: 'PG',
        ddi: '+675',
      },
      {
        country: 'Paraguay',
        alpha2: 'PY',
        ddi: '+595',
      },
      {
        country: 'Peru',
        alpha2: 'PE',
        ddi: '+51',
      },
      {
        country: 'Philippines',
        alpha2: 'PH',
        ddi: '+63',
      },
      {
        country: 'Pitcairn',
        alpha2: 'PN',
        ddi: '+870',
      },
      {
        country: 'Poland',
        alpha2: 'PL',
        ddi: '+48',
      },
      {
        country: 'Portugal',
        alpha2: 'PT',
        ddi: '+351',
      },
      {
        country: 'Puerto Rico',
        alpha2: 'PR',
        ddi: '+1',
      },
      {
        country: 'Qatar',
        alpha2: 'QA',
        ddi: '+974',
      },
      {
        country: 'R‚union',
        alpha2: 'RE',
        ddi: '+262',
      },
      {
        country: 'Romania',
        alpha2: 'RO',
        ddi: '+40',
      },
      {
        country: 'Russian Federation',
        alpha2: 'RU',
        ddi: '+7',
      },
      {
        country: 'Rwanda',
        alpha2: 'RW',
        ddi: '+250',
      },
      {
        country: 'SaintBarth‚lemy',
        alpha2: 'BL',
        ddi: '+590',
      },
      {
        country: 'Saint Helena',
        alpha2: 'SH',
        ddi: '+290',
      },
      {
        country: 'Saint Kitts and Nevis',
        alpha2: 'KN',
        ddi: '+1869',
      },
      {
        country: 'Saint Lucia',
        alpha2: 'LC',
        ddi: '+1758',
      },
      {
        country: 'SaintMartin (French)',
        alpha2: 'MF',
        ddi: '+590',
      },
      {
        country: 'Saint Pierre and Miquelon',
        alpha2: 'PM',
        ddi: '+508',
      },
      {
        country: 'Saint Vincent and Grenadines',
        alpha2: 'VC',
        ddi: '+1784',
      },
      {
        country: 'Samoa',
        alpha2: 'WS',
        ddi: '+685',
      },
      {
        country: 'San Marino',
        alpha2: 'SM',
        ddi: '+378',
      },
      {
        country: 'Sao Tome and Principe',
        alpha2: 'ST',
        ddi: '+239',
      },
      {
        country: 'Saudi Arabia',
        alpha2: 'SA',
        ddi: '+966',
      },
      {
        country: 'Senegal',
        alpha2: 'SN',
        ddi: '+221',
      },
      {
        country: 'Serbia',
        alpha2: 'RS',
        ddi: '+381',
      },
      {
        country: 'Seychelles',
        alpha2: 'SC',
        ddi: '+248',
      },
      {
        country: 'Sierra Leone',
        alpha2: 'SL',
        ddi: '+232',
      },
      {
        country: 'Singapore',
        alpha2: 'SG',
        ddi: '+65',
      },
      {
        country: 'Slovakia',
        alpha2: 'SK',
        ddi: '+421',
      },
      {
        country: 'Slovenia',
        alpha2: 'SI',
        ddi: '+386',
      },
      {
        country: 'Solomon Islands',
        alpha2: 'SB',
        ddi: '+677',
      },
      {
        country: 'Somalia',
        alpha2: 'SO',
        ddi: '+252',
      },
      {
        country: 'South Africa',
        alpha2: 'ZA',
        ddi: '+27',
      },
      {
        country: 'South Georgia and the',
        alpha2: 'GS',
        ddi: '+500',
      },
      {
        country: 'South Sudan',
        alpha2: 'SS',
        ddi: '+211',
      },
      {
        country: 'Spain',
        alpha2: 'ES',
        ddi: '+34',
      },
      {
        country: 'Sri Lanka',
        alpha2: 'LK',
        ddi: '+94',
      },
      {
        country: 'Sudan',
        alpha2: 'SD',
        ddi: '+249',
      },
      {
        country: 'Suriname',
        alpha2: 'SR',
        ddi: '+597',
      },
      {
        country: 'Svalbard and Jan Mayen Islands',
        alpha2: 'SJ',
        ddi: '+47',
      },
      {
        country: 'Swaziland',
        alpha2: 'SZ',
        ddi: '+268',
      },
      {
        country: 'Sweden',
        alpha2: 'SE',
        ddi: '+46',
      },
      {
        country: 'Switzerland',
        alpha2: 'CH',
        ddi: '+41',
      },
      {
        country: 'Syrian Arab Republic (Syria)',
        alpha2: 'SY',
        ddi: '+963',
      },
      {
        country: 'Taiwan, Republic of China',
        alpha2: 'TW',
        ddi: '+886',
      },
      {
        country: 'Tajikistan',
        alpha2: 'TJ',
        ddi: '+992',
      },
      {
        country: 'Tanzania, United Republic of',
        alpha2: 'TZ',
        ddi: '+255',
      },
      {
        country: 'Thailand',
        alpha2: 'TH',
        ddi: '+66',
      },
      {
        country: 'TimorLeste',
        alpha2: 'TL',
        ddi: '+670',
      },
      {
        country: 'Togo',
        alpha2: 'TG',
        ddi: '+228',
      },
      {
        country: 'Tokelau',
        alpha2: 'TK',
        ddi: '+690',
      },
    ]

    watch(phone, value => {
      updateValue(value)
    })

    const updateValue = value => {
      emit('input', props.formatModel ? value : phoneComputed.value)
    }

    return {
      countries,
      country,
      phone,
      phoneMask,
      menu,
      phoneComputed,
      unformat,
      updateValue,
    }
  },
}
</script>

<style></style>
