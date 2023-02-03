export interface HotelsResponse {
    items: Array<Hotel>;
}

interface Hotel {
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

export interface HotelViewModel extends Hotel {
    id: number,
    price: number,
    image: string;
}

export function makeHotelViewModel(hotel: Hotel, index: number): HotelViewModel {
    const randomNumber = Math.floor(Math.random() * (300 - 50 + 1) + 50) // just some random number between 50 and 300

    return {
        ...hotel,
        id: index, // No ids in the response so I had to use the index
        price: randomNumber, 
        image: `https://picsum.photos/150/130?random&t=${randomNumber}` // just some random image
    }
}