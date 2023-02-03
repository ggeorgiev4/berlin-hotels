export interface Hotel {
    id: number,
    price: number,
    title: string,
    address:{
        label: string,
        countryCode: string,
        countryName: string,
        stateCode: string,
        state: string,
        countyCode: string,
        county: string,
        city: string,
        district: string,
        street: string,
        postalCode: string,
        houseNumber: string
    },
    position:{
        lat: number
        lng: number
    },
    distance: number
}