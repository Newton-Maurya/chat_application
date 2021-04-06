const uName = []
const fName = []
const ward = []
const ling = []
const age = []
const lnth = document.getElementsByTagName('tbody')[4].getElementsByTagName('tr').length
for (let i = 0; i < lnth; i++) {
    const urName = document.getElementsByTagName('tbody')[4].getElementsByTagName('tr')[i].getElementsByTagName('td')[6].innerText
    uName.push(urName)
    const faName = document.getElementsByTagName('tbody')[4].getElementsByTagName('tr')[i].getElementsByTagName('td')[7].innerText
    fName.push(faName)
    const wardNo = document.getElementsByTagName('tbody')[4].getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerText
    ward.push(wardNo)
    const lings = document.getElementsByTagName('tbody')[4].getElementsByTagName('tr')[i].getElementsByTagName('td')[8].innerText
    ling.push(lings)
    const ages = document.getElementsByTagName('tbody')[4].getElementsByTagName('tr')[i].getEl
    ementsByTagName('td')[9].innerText
    age.push(ages)
}
console.log(uName)
console.log(fName)
const pbsData = {}
for (let i = 0; i < uName.length; i++) {
    pbsData[i] = [uName[i], fName[i], ward[i], age[i], ling[i]]
}
console.log(pbsData)



const data = {
    0: ["अनिता", "रविन्द्र", "2", "39", "म"],
    1: ["घूरभारी", "बसंत", "2", "79", "पु"],
    2: ["घुरिया", "घूरभरी", "2", "75", "पु"],
    3: ["चन्दा", "हरेन्द्र", "2", "36", "म"],
    4: ["चौधरी", "बसंत", "2", "81", "म"],
    5: ["न्यूटन", "महतिम", "3", "22", "पु"],
    6: ["भृगुनाथ", "बसंत", "2", "69", "पु"],
    7: ["महातम", "ंंंरूपचन्द्र", "2", "54", "पु"],
    8: ["योगेन्द्र", "भृगुनाथ", "2", "28", "पु"],
    9: ["रवीन्द्र", "शिव मुरारी", "2", "41", "पु"],
    10: ["शकुन्तला", "महातम", "2", "51", "म"],
    11: ["शिवमुरारी", "बसंत", "2", "64", "पु"],
    12: ["सरिता", "मुखलाल", "2", "39", "म"],
    13: ["हरिंद्र", "भृगुनाथ", "2", "38", "पु"],
}
