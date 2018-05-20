import PropTypes from 'prop-types';
import React from 'react';
import {Svg} from 'expo'; // eslint-disable-line import/named

const width = 145;
const height = 115;
const aspectRatio = width / height;
const Logo = props => (
  <Svg
    width={props.width}
    height={props.width / aspectRatio}
    viewBox={`0 0 ${width} ${height}`}
  >
    <Svg.Path d="M4.40582496,113.645833 L3.22676127,105.013021 L5.21151849,105.013021 C5.643844,106.497403 6.2071688,107.760411 6.90150978,108.802083 C7.59585076,109.843755 8.46703911,110.631508 9.51510097,111.165365 C10.5631628,111.699221 11.8470193,111.966146 13.366709,111.966146 C14.7160887,111.966146 15.7805105,111.614587 16.5600065,110.911458 C17.3395026,110.20833 17.7292447,109.296881 17.7292447,108.177083 C17.7292447,107.226558 17.4213812,106.399743 16.8056448,105.696615 C16.6353348,105.475259 16.2193915,105.149742 15.5578024,104.720052 C14.8962134,104.290362 13.6090817,103.453782 11.6963688,102.210286 C9.78365592,100.966791 8.36879363,100.013024 7.45173951,99.3489583 C6.53468538,98.6848925 5.9058577,98.1445333 5.5652376,97.7278646 C4.30756337,96.1913986 3.67873569,94.4466243 3.67873569,92.4934896 C3.67873569,91.5299431 3.84904318,90.5599007 4.18966329,89.5833333 C4.53028339,88.606766 5.08378276,87.7083374 5.85017799,86.8880208 C6.61657322,86.0677042 7.65806907,85.4036484 8.97469678,84.8958333 C10.2913245,84.3880183 11.89287,84.1341146 13.7793813,84.1341146 C14.5785285,84.1341146 15.2957851,84.1666663 15.9311726,84.2317708 C16.5665601,84.2968753 17.0840329,84.3717444 17.4836064,84.4563802 C17.88318,84.541016 18.3744516,84.6647127 18.9574361,84.827474 C19.5404205,84.9902352 19.9891152,85.117187 20.3035338,85.2083333 C20.8144639,85.377605 21.2140315,85.4622396 21.5022485,85.4622396 C21.882171,85.4622396 22.1802091,85.3841154 22.3963718,85.2278646 C22.6125346,85.0716138 22.7206143,84.8828136 22.7206143,84.6614583 L24.4106056,84.4466146 L25.0394396,92.4153646 L23.2315419,92.4153646 C23.113635,91.6861943 22.8450732,90.9570349 22.4258484,90.2278646 C22.0066237,89.4986943 21.4432989,88.8248729 20.7358571,88.2063802 C20.0284154,87.5878875 19.203079,87.0931008 18.2598234,86.7220052 C17.3165677,86.3509096 16.3078233,86.1653646 15.2335599,86.1653646 C14.1723973,86.1653646 13.3143095,86.4290338 12.6592708,86.9563802 C12.0042322,87.4837266 11.6767177,88.157548 11.6767177,88.9778646 C11.6767177,89.6549513 11.863401,90.2343726 12.236773,90.7161458 C12.610145,91.1979191 13.1603693,91.6731747 13.8874622,92.1419271 C14.6145551,92.6106794 15.9475388,93.4049423 17.8864532,94.5247396 C19.458546,95.3841189 20.8144557,96.2109335 21.9542229,97.0052083 C23.0939902,97.7994831 23.9684537,98.5416632 24.5776397,99.2317708 C25.1868256,99.9218785 25.6387955,100.644527 25.9335629,101.39974 C26.2283303,102.154952 26.4150135,103.027339 26.4936182,104.016927 C26.5198197,104.225261 26.5329203,104.531248 26.5329203,104.934896 C26.5329203,106.796884 26.0416487,108.414707 25.0590907,109.788411 C24.0765327,111.162116 22.7075224,112.216793 20.9520188,112.952474 C19.1965152,113.688155 17.1790264,114.05599 14.8994918,114.05599 C14.3754609,114.05599 13.7957604,114.029948 13.1603729,113.977865 C12.5249854,113.925781 11.7848028,113.828126 10.9398029,113.684896 C10.0948031,113.541666 9.24654072,113.359376 8.39499046,113.138021 C7.88406031,113.033854 7.4386407,112.981771 7.05871828,112.981771 C6.46918348,112.981771 6.1744205,113.203123 6.1744205,113.645833 L4.40582496,113.645833 Z M42.8039993,113.333333 C41.7690382,113.203124 40.56051,113.095704 39.1783784,113.011068 C37.7962468,112.926432 36.39121,112.884115 34.9632257,112.884115 C32.6574896,112.884115 30.1356286,113.033853 27.397567,113.333333 L27.397567,111.302083 C27.7119856,111.354167 27.9346954,111.380208 28.0657031,111.380208 C28.877951,111.380208 29.5460804,111.04818 30.0701114,110.384115 C30.5941423,109.720049 30.8561538,108.691413 30.8561538,107.298177 L30.8561538,88.5286458 C30.8561538,87.9296845 30.65637,87.4544288 30.2567965,87.1028646 C29.8572229,86.7513003 28.9041559,86.3085964 27.397567,85.7747396 L27.397567,84.4856771 C29.8474116,84.2252591 32.31032,83.7500035 34.7863662,83.0598958 C36.240552,82.6692689 37.5964617,82.2395857 38.8541359,81.7708333 L39.9938975,82.3372396 L39.9938975,94.4075521 C41.1860678,93.4960892 42.5583532,92.695316 44.1107949,92.0052083 C45.6632365,91.3151007 47.1468768,90.9700521 48.5617603,90.9700521 C50.3041631,90.9700521 51.7386763,91.4973906 52.8653428,92.5520833 C53.9920093,93.6067761 54.6601387,95.0390535 54.8697511,96.8489583 C55.0400611,97.9036511 55.1252149,99.0104109 55.1252149,100.169271 C55.1252149,101.718758 55.0269605,104.453105 54.830449,108.372396 C54.830449,109.335942 55.0400582,110.071612 55.4592829,110.579427 C55.8785077,111.087242 56.4352822,111.341146 57.1296232,111.341146 C57.4309409,111.341146 57.7126033,111.295573 57.9746188,111.204427 L57.9746188,113.333333 C55.6557819,113.033853 53.2583764,112.884115 50.7823303,112.884115 C48.2407803,112.884115 45.8106233,113.033853 43.4917864,113.333333 L43.4917864,111.263021 C44.4350421,111.263021 45.0900709,110.833338 45.4568926,109.973958 C45.8237142,109.114579 46.0529743,107.369805 46.1446797,104.739583 C46.1970828,103.124992 46.223284,102.187501 46.223284,101.927083 C46.223284,100.989579 46.1315799,99.791674 45.9481691,98.3333333 C45.8171614,97.2786406 45.4601707,96.5006535 44.8771863,95.999349 C44.2942019,95.4980444 43.6031464,95.2473958 42.8039993,95.2473958 C41.8607436,95.2473958 40.9240524,95.5403617 39.9938975,96.1263021 L39.9938975,107.298177 C39.9938975,108.743497 40.1543795,109.778643 40.4753485,110.403646 C40.7963174,111.028649 41.3170653,111.341146 42.0376079,111.341146 C42.1817164,111.341146 42.4371776,111.315104 42.8039993,111.263021 L42.8039993,113.333333 Z M95.8247675,94.0169271 L93.2111763,94.0169271 L93.2111763,92.9817708 C93.984122,92.8124992 94.9273635,92.4967471 96.0409292,92.0345052 C97.1544949,91.5722633 98.2090914,90.9895868 99.2047501,90.2864583 C101.222269,88.919264 102.637131,87.252614 103.449379,85.2864583 L104.962511,85.2864583 L104.962511,91.6927083 L112.174451,91.6927083 L111.447361,94.0169271 L104.962511,94.0169271 L104.962511,107.102865 C104.962511,108.170578 105.17212,108.974607 105.591345,109.514974 C106.01057,110.055341 106.554244,110.325521 107.222383,110.325521 C107.942926,110.325521 108.702759,110.052086 109.501906,109.505208 C110.301054,108.958331 110.962633,108.274744 111.486664,107.454427 L112.862238,108.606771 C112.194098,109.843756 111.358937,110.856116 110.356728,111.64388 C109.354518,112.431645 108.227869,113.011066 106.976745,113.382161 C105.725621,113.753257 104.359886,113.938802 102.879499,113.938802 C100.626166,113.938802 98.8870641,113.430995 97.6621418,112.415365 C96.4372195,111.399735 95.8247675,110.117195 95.8247675,108.567708 L95.8247675,94.0169271 Z" />
    <Svg.Path d="M74.9640781,114.894587 L72.7942868,112.959935 C65.0877866,106.115373 60,101.601186 60,96.0610478 C60,91.5468611 63.6213069,88 68.230243,88 C70.8339926,88 73.3329936,89.1871725 74.9640781,91.0631982 C76.5951626,89.1871725 79.0941637,88 81.6979133,88 C86.3068494,88 89.9281563,91.5468611 89.9281563,96.0610478 C89.9281563,101.601186 84.8403697,106.115373 77.1338695,112.974592 L74.9640781,114.894587 Z M80.9063343,95.6394956 C80.9063343,95.6394956 78.1957937,94.1555492 76.3887666,95.9362849 L80.6051631,100.091335 C82.4121901,98.3105992 80.9063343,95.6394956 80.9063343,95.6394956 Z M75.7864243,96.5298635 L70.9676854,101.278492 L75.1840819,105.433542 L80.0028207,100.684914 L75.7864243,96.5298635 Z M69.4618296,102.16886 C69.1268458,102.49897 69.1283642,103.027404 69.4600407,103.354254 L73.0776725,106.919251 C73.4053431,107.242155 73.9479039,107.245313 74.2805684,106.917489 C74.6155521,106.587379 74.6140338,106.058945 74.2823573,105.732094 L70.6647254,102.167097 C70.3370549,101.844194 69.7944941,101.841036 69.4618296,102.16886 Z" />
    <Svg.Path d="M15.419533,71.6666667 L0.976002725,71.6666667 L0.976002725,69.6744792 C1.133212,69.7265628 1.37557267,69.7526042 1.703092,69.7526042 C2.47603762,69.7526042 3.17036819,69.5247419 3.78610453,69.0690104 C4.40184087,68.613279 4.70970442,67.799485 4.70970442,66.6276042 L4.70970442,48.1510417 C4.70970442,46.9921817 4.40839116,46.1751326 3.80575559,45.6998698 C3.20312002,45.224607 2.52844032,44.9869792 1.78169625,44.9869792 C1.5589831,44.9869792 1.29042128,45.0260413 0.976002725,45.1041667 L0.976002725,43.0729167 C1.84065376,42.9947913 3.30136806,42.9036464 5.35818945,42.7994792 C7.40191008,42.7083329 9.62900812,42.617188 12.0395504,42.5260417 C14.4500927,42.4348954 16.0352624,42.3893229 16.7951073,42.3893229 C20.1358045,42.3893229 23.0343071,42.705075 25.490702,43.3365885 C27.947097,43.9681021 30.0006124,44.9088479 31.6513098,46.1588542 C33.3020073,47.4088604 34.5367366,48.9420482 35.3555349,50.7584635 C36.1743333,52.5748789 36.5837263,54.6744673 36.5837263,57.0572917 C36.5837263,59.3489698 36.1514073,61.389965 35.2867562,63.1803385 C34.4221052,64.9707121 33.1185978,66.4973895 31.376195,67.7604167 C29.6337921,69.0234438 27.4296201,69.990231 24.7636128,70.6608073 C22.0976054,71.3313836 18.9829433,71.6666667 15.419533,71.6666667 Z M14.2994225,66.1783854 C14.2994225,67.4023499 14.5188571,68.2845025 14.957733,68.8248698 C15.3966089,69.3652371 16.1662678,69.6354167 17.2667328,69.6354167 C18.5506085,69.6354167 19.7525865,69.3880233 20.8727026,68.8932292 C21.9928187,68.398435 22.9753619,67.6399791 23.8203618,66.6178385 C24.6653617,65.595698 25.3138402,64.3164139 25.7658169,62.7799479 C26.2177936,61.2434819 26.4437785,59.4726663 26.4437785,57.4674479 C26.4437785,54.5247249 25.9623323,52.0865982 24.9994255,50.1529948 C24.0365187,48.2193914 22.703535,46.7806037 21.0004345,45.8365885 C19.2973339,44.8925734 17.3322474,44.4075522 15.105116,44.3815104 C14.8562013,44.3815104 14.6596927,44.5312485 14.5155841,44.8307292 C14.3714756,45.1302098 14.2994225,45.4231757 14.2994225,45.7096354 L14.2994225,66.1783854 Z M52.776201,72.3502604 C49.8940309,72.3502604 47.4278473,71.9140669 45.3775763,71.0416667 C43.3273053,70.1692665 41.7486858,68.9030031 40.6416705,67.2428385 C39.5346552,65.582674 38.9615049,63.6328237 38.9222026,61.3932292 C38.9222026,59.8307214 39.1481876,58.4049544 39.6001642,57.1158854 C40.0521409,55.8268165 40.7202703,54.6940153 41.6045725,53.7174479 C42.4888747,52.7408805 43.586048,51.9173211 44.8961253,51.2467448 C46.2062027,50.5761685 47.6931181,50.0781266 49.3569163,49.7526042 C50.8373037,49.4531235 52.2849174,49.3033854 53.6998009,49.3033854 C56.0710409,49.3033854 58.255562,49.7135376 60.2534299,50.5338542 C62.2512979,51.3541708 63.8528434,52.6464756 65.0581145,54.4108073 C66.2633856,56.175139 66.8660122,58.3919137 66.8660122,61.0611979 C66.8660122,63.1575626 66.3026874,65.0585852 65.1760209,66.7643229 C64.0493544,68.4700606 62.4183326,69.8242137 60.2829065,70.8268229 C58.1474805,71.8294321 55.6452704,72.3372395 52.776201,72.3502604 Z M51.2434182,51.1393229 C50.1298525,51.1393229 49.3143416,51.6113234 48.7968611,52.5553385 C48.2793805,53.4993537 48.0206441,54.7395757 48.0206441,56.2760417 C48.0206441,57.9166749 48.3023065,59.7656147 48.8656398,61.8229167 C49.2455622,63.1510483 49.7532095,64.4628841 50.388597,65.7584635 C51.0239845,67.0540429 51.7281405,68.1022095 52.5010862,68.9029948 C53.2740318,69.70378 54.0600664,70.1041667 54.8592135,70.1041667 C55.239136,70.1041667 55.6583544,69.9869803 56.1168815,69.7526042 C56.6278116,69.4140608 57.0306544,68.7369842 57.3254218,67.7213542 C57.6201892,66.7057241 57.7675707,65.5143298 57.7675707,64.1471354 C57.7675707,62.1679589 57.4597071,60.3515708 56.8439708,58.6979167 C55.0884672,53.658829 53.221635,51.1393229 51.2434182,51.1393229 Z M82.8816273,72.3502604 C79.9994572,72.3502604 77.5332737,71.9140669 75.4830027,71.0416667 C73.4327317,70.1692665 71.8541122,68.9030031 70.7470968,67.2428385 C69.6400815,65.582674 69.0669313,63.6328237 69.0276289,61.3932292 C69.0276289,59.8307214 69.2536139,58.4049544 69.7055906,57.1158854 C70.1575672,55.8268165 70.8256967,54.6940153 71.7099988,53.7174479 C72.594301,52.7408805 73.6914743,51.9173211 75.0015517,51.2467448 C76.311629,50.5761685 77.7985444,50.0781266 79.4623426,49.7526042 C80.94273,49.4531235 82.3903437,49.3033854 83.8052272,49.3033854 C86.1764672,49.3033854 88.3609884,49.7135376 90.3588563,50.5338542 C92.3567242,51.3541708 93.9582697,52.6464756 95.1635408,54.4108073 C96.368812,56.175139 96.9714385,58.3919137 96.9714385,61.0611979 C96.9714385,63.1575626 96.4081137,65.0585852 95.2814472,66.7643229 C94.1547807,68.4700606 92.5237589,69.8242137 90.3883329,70.8268229 C88.2529068,71.8294321 85.7506967,72.3372395 82.8816273,72.3502604 Z M81.3488445,51.1393229 C80.2352788,51.1393229 79.4197679,51.6113234 78.9022874,52.5553385 C78.3848068,53.4993537 78.1260704,54.7395757 78.1260704,56.2760417 C78.1260704,57.9166749 78.4077328,59.7656147 78.9710661,61.8229167 C79.3509885,63.1510483 79.8586359,64.4628841 80.4940234,65.7584635 C81.1294109,67.0540429 81.8335669,68.1022095 82.6065125,68.9029948 C83.3794581,69.70378 84.1654927,70.1041667 84.9646399,70.1041667 C85.3445623,70.1041667 85.7637808,69.9869803 86.2223078,69.7526042 C86.733238,69.4140608 87.1360807,68.7369842 87.4308481,67.7213542 C87.7256155,66.7057241 87.872997,65.5143298 87.872997,64.1471354 C87.872997,62.1679589 87.5651334,60.3515708 86.9493971,58.6979167 C85.1938935,53.658829 83.3270613,51.1393229 81.3488445,51.1393229 Z M105.69651,71.2174479 C103.272867,71.2174479 100.606899,71.367186 97.6985278,71.6666667 L97.6985278,69.6744792 C98.0522486,69.7526046 98.3863134,69.7916667 98.7007319,69.7916667 C100.521739,69.7916667 101.432229,68.352879 101.432229,65.4752604 L101.432229,56.1783854 C101.432229,55.6184868 101.363451,55.214845 101.225893,54.9674479 C101.088335,54.7200508 100.806673,54.5052092 100.380898,54.3229167 C99.9551225,54.1406241 99.0610082,53.8411479 97.6985278,53.4244792 L97.6985278,52.1158854 C97.7771324,52.1028645 98.1603243,52.0605472 98.8481149,51.9889323 C99.5359055,51.9173174 100.380893,51.800131 101.383102,51.6373698 C102.385311,51.4746086 103.233573,51.3085946 103.927914,51.1393229 C105.748922,50.7226542 107.602653,50.1497432 109.489165,49.4205729 L110.569973,49.9088542 L110.569973,53.5807292 C112.273074,52.2395766 113.871344,51.1979204 115.364832,50.4557292 C116.85832,49.713538 118.45004,49.3424479 120.14004,49.3424479 C121.083296,49.3424479 121.947934,49.5019515 122.73398,49.8209635 C123.520027,50.1399756 124.181606,50.592445 124.718737,51.1783854 C125.255869,51.7643258 125.635786,52.4479128 125.858499,53.2291667 C128.177336,51.6666589 129.955739,50.6412785 131.193762,50.1529948 C132.431785,49.6647111 133.594461,49.4205729 134.681826,49.4205729 C135.625081,49.4205729 136.506095,49.5898421 137.324893,49.9283854 C138.143692,50.2669288 138.857673,50.7552051 139.466859,51.3932292 C140.076045,52.0312532 140.560766,52.805985 140.921038,53.7174479 C141.281309,54.6289108 141.481093,55.6380153 141.520395,56.7447917 C141.546597,57.3046903 141.559697,58.1184842 141.559697,59.1861979 C141.559697,61.1393327 141.481094,63.3007694 141.323884,65.6705729 C141.323884,68.3919407 142.044416,69.7526042 143.485501,69.7526042 C143.839222,69.7526042 144.173287,69.7005214 144.487705,69.5963542 L144.487705,71.6666667 C141.815148,71.367186 139.352239,71.2174479 137.098906,71.2174479 C134.924178,71.2174479 132.494021,71.367186 129.808362,71.6666667 L129.808362,69.6354167 C130.358595,69.6354167 130.82039,69.5507821 131.193762,69.3815104 C131.567134,69.2122387 131.881548,68.8444039 132.137013,68.2779948 C132.392478,67.7115857 132.526759,66.8554745 132.53986,65.7096354 L132.53986,65.1627604 C132.53986,64.6028618 132.552961,64.0039094 132.579162,63.3658854 C132.605364,62.519527 132.631565,61.6992227 132.657766,60.9049479 C132.657766,59.2643147 132.579163,57.8515684 132.421954,56.6666667 C132.304047,55.6770784 131.989633,54.9153673 131.478703,54.3815104 C130.967772,53.8476536 130.293093,53.5807292 129.454643,53.5807292 C128.419682,53.5807292 127.306133,53.984371 126.113963,54.7916667 L126.113963,65.6705729 C126.113963,67.0768299 126.27772,68.1022103 126.605239,68.7467448 C126.932759,69.3912793 127.450231,69.7135417 128.157673,69.7135417 C128.432789,69.7135417 128.727552,69.6744796 129.041971,69.5963542 L129.041971,71.6666667 C126.303909,71.367186 123.82135,71.2174479 121.594219,71.2174479 C119.314684,71.2174479 116.832125,71.367186 114.146466,71.6666667 L114.146466,69.6354167 C114.487086,69.6875003 114.703246,69.7135417 114.794951,69.7135417 C116.249137,69.7135417 116.976219,68.3789196 116.976219,65.7096354 L116.976219,57.2330729 C116.976219,56.074213 116.769885,55.1953155 116.357211,54.5963542 C115.944536,53.9973928 115.345185,53.6979167 114.559139,53.6979167 C113.615883,53.6979167 112.286174,54.1927034 110.569973,55.1822917 L110.569973,65.6315104 C110.569973,67.089851 110.730455,68.1412728 111.051424,68.7858073 C111.372393,69.4303418 111.86694,69.7526042 112.535079,69.7526042 C112.797095,69.7526042 113.065657,69.7135421 113.340773,69.6354167 L113.340773,71.6666667 C110.563409,71.367186 108.015347,71.2174479 105.69651,71.2174479 Z" />
    <Svg.Path d="M15.419533,30 L0.976002725,30 L0.976002725,28.0078125 C1.133212,28.0598961 1.37557267,28.0859375 1.703092,28.0859375 C2.47603762,28.0859375 3.17036819,27.8580752 3.78610453,27.4023438 C4.40184087,26.9466123 4.70970442,26.1328184 4.70970442,24.9609375 L4.70970442,6.484375 C4.70970442,5.32551504 4.40839116,4.50846592 3.80575559,4.03320313 C3.20312002,3.55794033 2.52844032,3.3203125 1.78169625,3.3203125 C1.5589831,3.3203125 1.29042128,3.35937461 0.976002725,3.4375 L0.976002725,1.40625 C1.84065376,1.32812461 3.30136806,1.23697969 5.35818945,1.1328125 C7.40191008,1.04166621 9.62900812,0.950521289 12.0395504,0.859375 C14.4500927,0.768228711 16.0352624,0.72265625 16.7951073,0.72265625 C20.1358045,0.72265625 23.0343071,1.0384083 25.490702,1.66992188 C27.947097,2.30143545 30.0006124,3.24218125 31.6513098,4.4921875 C33.3020073,5.74219375 34.5367366,7.27538154 35.3555349,9.09179688 C36.1743333,10.9082122 36.5837263,13.0078006 36.5837263,15.390625 C36.5837263,17.6823031 36.1514073,19.7232983 35.2867562,21.5136719 C34.4221052,23.3040454 33.1185978,24.8307229 31.376195,26.09375 C29.6337921,27.3567771 27.4296201,28.3235644 24.7636128,28.9941406 C22.0976054,29.6647169 18.9829433,30 15.419533,30 Z M14.2994225,24.5117187 C14.2994225,25.7356832 14.5188571,26.6178358 14.957733,27.1582031 C15.3966089,27.6985704 16.1662678,27.96875 17.2667328,27.96875 C18.5506085,27.96875 19.7525865,27.7213566 20.8727026,27.2265625 C21.9928187,26.7317684 22.9753619,25.9733124 23.8203618,24.9511719 C24.6653617,23.9290313 25.3138402,22.6497473 25.7658169,21.1132812 C26.2177936,19.5768152 26.4437785,17.8059996 26.4437785,15.8007812 C26.4437785,12.8580582 25.9623323,10.4199315 24.9994255,8.48632812 C24.0365187,6.55272471 22.703535,5.11393701 21.0004345,4.16992187 C19.2973339,3.22590674 17.3322474,2.74088555 15.105116,2.71484375 C14.8562013,2.71484375 14.6596927,2.86458184 14.5155841,3.1640625 C14.3714756,3.46354316 14.2994225,3.75650898 14.2994225,4.04296875 L14.2994225,24.5117187 Z M52.776201,30.6835937 C49.8940309,30.6835937 47.4278473,30.2474002 45.3775763,29.375 C43.3273053,28.5025998 41.7486858,27.2363364 40.6416705,25.5761719 C39.5346552,23.9160073 38.9615049,21.966157 38.9222026,19.7265625 C38.9222026,18.1640547 39.1481876,16.7382877 39.6001642,15.4492187 C40.0521409,14.1601498 40.7202703,13.0273486 41.6045725,12.0507812 C42.4888747,11.0742139 43.586048,10.2506544 44.8961253,9.58007812 C46.2062027,8.90950186 47.6931181,8.41145996 49.3569163,8.0859375 C50.8373037,7.78645684 52.2849174,7.63671875 53.6998009,7.63671875 C56.0710409,7.63671875 58.255562,8.0468709 60.2534299,8.8671875 C62.2512979,9.6875041 63.8528434,10.9798089 65.0581145,12.7441406 C66.2633856,14.5084724 66.8660122,16.7252471 66.8660122,19.3945312 C66.8660122,21.4908959 66.3026874,23.3919186 65.1760209,25.0976562 C64.0493544,26.8033939 62.4183326,28.1575471 60.2829065,29.1601562 C58.1474805,30.1627654 55.6452704,30.6705729 52.776201,30.6835937 Z M51.2434182,9.47265625 C50.1298525,9.47265625 49.3143416,9.94465674 48.7968611,10.8886719 C48.2793805,11.832687 48.0206441,13.072909 48.0206441,14.609375 C48.0206441,16.2500082 48.3023065,18.098948 48.8656398,20.15625 C49.2455622,21.4843816 49.7532095,22.7962175 50.388597,24.0917969 C51.0239845,25.3873763 51.7281405,26.4355429 52.5010862,27.2363281 C53.2740318,28.0371134 54.0600664,28.4375 54.8592135,28.4375 C55.239136,28.4375 55.6583544,28.3203137 56.1168815,28.0859375 C56.6278116,27.7473941 57.0306544,27.0703176 57.3254218,26.0546875 C57.6201892,25.0390574 57.7675707,23.8476631 57.7675707,22.4804688 C57.7675707,20.5012922 57.4597071,18.6849041 56.8439708,17.03125 C55.0884672,11.9921623 53.221635,9.47265625 51.2434182,9.47265625 Z M82.8816273,30.6835937 C79.9994572,30.6835937 77.5332737,30.2474002 75.4830027,29.375 C73.4327317,28.5025998 71.8541122,27.2363364 70.7470968,25.5761719 C69.6400815,23.9160073 69.0669313,21.966157 69.0276289,19.7265625 C69.0276289,18.1640547 69.2536139,16.7382877 69.7055906,15.4492187 C70.1575672,14.1601498 70.8256967,13.0273486 71.7099988,12.0507812 C72.594301,11.0742139 73.6914743,10.2506544 75.0015517,9.58007812 C76.311629,8.90950186 77.7985444,8.41145996 79.4623426,8.0859375 C80.94273,7.78645684 82.3903437,7.63671875 83.8052272,7.63671875 C86.1764672,7.63671875 88.3609884,8.0468709 90.3588563,8.8671875 C92.3567242,9.6875041 93.9582697,10.9798089 95.1635408,12.7441406 C96.368812,14.5084724 96.9714385,16.7252471 96.9714385,19.3945312 C96.9714385,21.4908959 96.4081137,23.3919186 95.2814472,25.0976562 C94.1547807,26.8033939 92.5237589,28.1575471 90.3883329,29.1601562 C88.2529068,30.1627654 85.7506967,30.6705729 82.8816273,30.6835937 Z M81.3488445,9.47265625 C80.2352788,9.47265625 79.4197679,9.94465674 78.9022874,10.8886719 C78.3848068,11.832687 78.1260704,13.072909 78.1260704,14.609375 C78.1260704,16.2500082 78.4077328,18.098948 78.9710661,20.15625 C79.3509885,21.4843816 79.8586359,22.7962175 80.4940234,24.0917969 C81.1294109,25.3873763 81.8335669,26.4355429 82.6065125,27.2363281 C83.3794581,28.0371134 84.1654927,28.4375 84.9646399,28.4375 C85.3445623,28.4375 85.7637808,28.3203137 86.2223078,28.0859375 C86.733238,27.7473941 87.1360807,27.0703176 87.4308481,26.0546875 C87.7256155,25.0390574 87.872997,23.8476631 87.872997,22.4804688 C87.872997,20.5012922 87.5651334,18.6849041 86.9493971,17.03125 C85.1938935,11.9921623 83.3270613,9.47265625 81.3488445,9.47265625 Z M105.69651,29.5507812 C103.272867,29.5507812 100.606899,29.7005193 97.6985278,30 L97.6985278,28.0078125 C98.0522486,28.0859379 98.3863134,28.125 98.7007319,28.125 C100.521739,28.125 101.432229,26.6862123 101.432229,23.8085937 L101.432229,14.5117187 C101.432229,13.9518201 101.363451,13.5481783 101.225893,13.3007812 C101.088335,13.0533842 100.806673,12.8385426 100.380898,12.65625 C99.9551225,12.4739574 99.0610082,12.1744812 97.6985278,11.7578125 L97.6985278,10.4492187 C97.7771324,10.4361979 98.1603243,10.3938806 98.8481149,10.3222656 C99.5359055,10.2506507 100.380893,10.1334644 101.383102,9.97070312 C102.385311,9.80794189 103.233573,9.64192793 103.927914,9.47265625 C105.748922,9.0559875 107.602653,8.48307656 109.489165,7.75390625 L110.569973,8.2421875 L110.569973,11.9140625 C112.273074,10.57291 113.871344,9.53125371 115.364832,8.7890625 C116.85832,8.04687129 118.45004,7.67578125 120.14004,7.67578125 C121.083296,7.67578125 121.947934,7.83528486 122.73398,8.15429687 C123.520027,8.47330889 124.181606,8.92577832 124.718737,9.51171875 C125.255869,10.0976592 125.635786,10.7812461 125.858499,11.5625 C128.177336,9.99999219 129.955739,8.97461182 131.193762,8.48632812 C132.431785,7.99804443 133.594461,7.75390625 134.681826,7.75390625 C135.625081,7.75390625 136.506095,7.92317539 137.324893,8.26171875 C138.143692,8.60026211 138.857673,9.08853848 139.466859,9.7265625 C140.076045,10.3645865 140.560766,11.1393184 140.921038,12.0507812 C141.281309,12.9622441 141.481093,13.9713486 141.520395,15.078125 C141.546597,15.6380236 141.559697,16.4518176 141.559697,17.5195312 C141.559697,19.472666 141.481094,21.6341027 141.323884,24.0039062 C141.323884,26.725274 142.044416,28.0859375 143.485501,28.0859375 C143.839222,28.0859375 144.173287,28.0338547 144.487705,27.9296875 L144.487705,30 C141.815148,29.7005193 139.352239,29.5507812 137.098906,29.5507812 C134.924178,29.5507812 132.494021,29.7005193 129.808362,30 L129.808362,27.96875 C130.358595,27.96875 130.82039,27.8841154 131.193762,27.7148437 C131.567134,27.5455721 131.881548,27.1777372 132.137013,26.6113281 C132.392478,26.044919 132.526759,25.1888078 132.53986,24.0429687 L132.53986,23.4960937 C132.53986,22.9361951 132.552961,22.3372428 132.579162,21.6992187 C132.605364,20.8528604 132.631565,20.0325561 132.657766,19.2382812 C132.657766,17.597648 132.579163,16.1849018 132.421954,15 C132.304047,14.0104117 131.989633,13.2487006 131.478703,12.7148437 C130.967772,12.1809869 130.293093,11.9140625 129.454643,11.9140625 C128.419682,11.9140625 127.306133,12.3177043 126.113963,13.125 L126.113963,24.0039062 C126.113963,25.4101633 126.27772,26.4355437 126.605239,27.0800781 C126.932759,27.7246126 127.450231,28.046875 128.157673,28.046875 C128.432789,28.046875 128.727552,28.0078129 129.041971,27.9296875 L129.041971,30 C126.303909,29.7005193 123.82135,29.5507812 121.594219,29.5507812 C119.314684,29.5507812 116.832125,29.7005193 114.146466,30 L114.146466,27.96875 C114.487086,28.0208336 114.703246,28.046875 114.794951,28.046875 C116.249137,28.046875 116.976219,26.7122529 116.976219,24.0429687 L116.976219,15.5664062 C116.976219,14.4075463 116.769885,13.5286488 116.357211,12.9296875 C115.944536,12.3307262 115.345185,12.03125 114.559139,12.03125 C113.615883,12.03125 112.286174,12.5260367 110.569973,13.515625 L110.569973,23.9648437 C110.569973,25.4231844 110.730455,26.4746062 111.051424,27.1191406 C111.372393,27.7636751 111.86694,28.0859375 112.535079,28.0859375 C112.797095,28.0859375 113.065657,28.0468754 113.340773,27.96875 L113.340773,30 C110.563409,29.7005193 108.015347,29.5507812 105.69651,29.5507812 Z" />
  </Svg>
);

Logo.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Logo;
