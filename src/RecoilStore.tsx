import { atom } from "recoil";


export const recoilMainSelectLocation = atom({
  key: "mainSelectLocation",
  default: '전체'
});

export const recoilAptSelectLocation = atom({
  key: "aptSelectLocation",
  default: '전체'
});


interface mainAptlistProps {
  aptKey : number;
  aptName: string;
  inDate : string;
  AddressCity : string;
  AddressCounty : string;
  mainType : string;
  state : string;
  pyengName : string;
  houseHoldSum : number;
  houseHold : number;
  personalArea: number;
  priceDefaultHigh: number;
  priceDefaultLow: number;
  discountHigh: number; 
  discountLow: number; 
  explanation : string;
}

export const recoilMainAptlist = atom<mainAptlistProps[]>({
  key: "mainAptlist",
  default: []
});


export const recoilMainAptViewlist = atom<mainAptlistProps[]>({
  key: "mainAptViewlist",
  default: []
});

export const recoilSpecialCostAptlist = atom<mainAptlistProps[]>({
  key: "specialCostAptlist",
  default: []
});

export const recoilAdvertiseCostAptlist = atom<mainAptlistProps[]>({
  key: "advertiseCostAptlist",
  default: []
});




interface AptlistProps {
  aptKey : number;
  aptName: string;
  inDate : string;
  AddressCity : string;
  AddressCounty : string;
  pyengName : string;
  pyengNum : number;
  houseHoldSum : number;
  houseHold : number;
  personalArea: number;
  priceDefaultHigh: number;
  priceDefaultLow: number;
  discountHigh: number; 
  discountLow: number; 
  explanation : string;
}


export const recoilAptlist = atom<AptlistProps[]>({
  key: "aptlist",
  default: [{
    aptKey : 0,
    aptName: '',
    inDate : '',
    AddressCity : '',
    AddressCounty : '',
    pyengName : '',
    pyengNum : 0,
    houseHoldSum : 0,
    houseHold : 0,
    personalArea: 0,
    priceDefaultHigh: 0,
    priceDefaultLow: 0,
    discountHigh: 0, 
    discountLow: 0, 
    explanation : ''
  }]
})




export const recoilAptSearchlist = atom<AptlistProps[]>({
  key: "aptSearchlist",
  default: [{
    aptKey : 0,
    aptName: '',
    inDate : '',
    AddressCity : '',
    AddressCounty : '',
    pyengName : '',
    pyengNum : 0,
    houseHoldSum : 0,
    houseHold : 0,
    personalArea: 0,
    priceDefaultHigh: 0,
    priceDefaultLow: 0,
    discountHigh: 0, 
    discountLow: 0, 
    explanation : ''
  }]
})

interface AptlistViewProps {
  aptKey : number,
  pyengKey : number,
  aptName: string,
  inDate: string,
  addressCity: string,
  addressCounty: string,
  houseHold : number,
  priceDefaultHigh : number,
  priceDefaultLow : number
}


export const recoilAptlistView = atom<AptlistViewProps[]>({
  key: "aptlistview",
  default: [{
    aptKey : 0,
    pyengKey : 0,
    aptName: '',
    inDate: '',
    addressCity: '',
    addressCounty: 'string',
    houseHold : 0,
    priceDefaultHigh : 0,
    priceDefaultLow : 0
  }]
})


export const recoilHandleArrange = atom<boolean>({
  key: "handlearrange",
  default: false
})

export const recoilselectTab = atom<number>({
  key: "recoilSelectTab",
  default: 0
})

export const recoilTabNames = atom({
  key: "recoilTabNames",
  default: ["금액대", "평형", "세대수"]
})

export const recoilIsTabNames = atom({
  key: "recoilIsTabNames",
  default: [false, false, false]
})

// pricefilter  --------------------------------


export const recoilCostLow = atom({
  key: "recoilCostLow",
  default: ''
})

export const recoilCostHigh = atom({
  key: "recoilCostHigh",
  default: ''
})

export const recoilPriceFirstButton = atom({
  key: "recoilPriceFirstButton",
  default: ''
})


export const recoilSelectedPriceButtonNum = atom<number>({
  key: "recoilSelectedPriceButtonNum",
  default: 0
})

export const recoilSelectedPriceMin = atom<number>({
  key: "recoilSelectedPriceMin",
  default: 0
})

export const recoilSelectedPriceMax = atom<number>({
  key: "recoilSelectedPriceMax",
  default: 0
})

export const recoilPriceReset = atom({
  key: "recoilPriceReset",
  default: ''
})



// pyengfilter  --------------------------------


export const recoilPyengLow = atom({
  key: "recoilPyengLow",
  default: ''
})

export const recoilPyengHigh = atom({
  key: "recoilPyengHigh",
  default: ''
})

export const recoilPyengFirstButton = atom({
  key: "recoilPyengFirstButton",
  default: ''
})

export const recoilAllSelectPyeng = atom<boolean>({
  key: "recoilAllSelectPyeng",
  default: false
})

export const recoilSelectedPyengButtonNum = atom<number>({
  key: "recoilSelectedPyengButtonNum",
  default: 0
})

export const recoilSelectedPyengMin = atom<number>({
  key: "recoilSelectedPyengMin",
  default: 0
})

export const recoilSelectedPyengMax = atom<number>({
  key: "recoilSelectedPyengMax",
  default: 0
})

export const recoilPyengReset = atom({
  key: "recoilPyengReset",
  default: ''
})


// houseHoldfilter  --------------------------------


export const recoilHouseHoldsLow = atom({
  key: "recoilHouseHoldsLow",
  default: ''
})

export const recoilHouseHoldsHigh = atom({
  key: "recoilHouseHoldsHigh",
  default: ''
})

export const recoilHouseHoldsFirstButton = atom({
  key: "recoilHouseHoldsFirstButton",
  default: ''
})

export const recoilAllSelectHouseHolds = atom<boolean>({
  key: "recoilAllSelectHouseHolds",
  default: false
})

export const recoilSelectedHouseHoldsButtonNum = atom<number>({
  key: "recoilSelectedHouseHoldsButtonNum",
  default: 0
})

export const recoilSelectedHouseHoldsMin = atom<number>({
  key: "recoilSelectedHouseHoldsMin",
  default: 0
})

export const recoilSelectedHouseHoldsMax = atom<number>({
  key: "recoilSelectedHouseHoldsMax",
  default: 0
})

export const recoilHouseHoldsReset = atom({
  key: "recoilHouseHoldsReset",
  default: ''
})
