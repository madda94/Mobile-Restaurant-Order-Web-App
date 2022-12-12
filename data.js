import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

export const menuArray = [
    {
        name: "Pancakes",
        ingredients: ["eggs", "flour", "butter", "syrop", "sugar"],
        price: 15,
        emoji: "🥞",
        uuid: uuidv4(),
        isOrdered: false
    },
    {
        name: "Cookies (6 pcs)",
        ingredients: ["eggs", "flour", "sugar", "chocolate"],
        price: 12,
        emoji: "🍪",
        uuid: uuidv4(),
        isOrdered: false
    },
        {
        name: "Croissant",
        ingredients: ["pastry", "butter", "sugar"],
        price: 8,
        emoji: "🥐",
        uuid: uuidv4(),
        isOrdered: false
    },
    {
        name: "Coffee",
        ingredients: ["coffee", "milk", "sugar", "flavours"],
        price: 12,
        emoji: "☕",
        uuid: uuidv4(),
        isOrdered: false
    }
]

export const stars = [
    {
        name: "star1",
        value: "1",
        isClicked: false
    },
    {
        name: "star2",
        value: "2",
        isClicked: false
    },
    {
        name: "star3",
        value: "3",
        isClicked: false
    },
    {
        name: "star4",
        value: "4",
        isClicked: false
    },
    {
        name: "star5",
        value: "5",
        isClicked: false   
    }
]