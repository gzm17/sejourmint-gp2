/* This files contains for ALL room types the rooms photos (more than 1) and overall description */
/* This file is used to render the booking details whereas roomTypes1.js cis used for display pic for website */
/* The details include: standard room type has two subtypes, with 2 and 3 beds respectively. Same is true for family type */
export const roomType2 = [
    {
    id: 0,
    category: 'rooms',
    type: 'standard1',
    dbId: 4,
    name: 'Standard Room - 1',
    nameJ: '標準ルーム 1',
    caption: 'The Standard Type 1 rooms can accommodate up to two guests',
    captionJ: '収容人数が２人です。',
    numGuests: 2,
    images: [ 
        {
            id: 0,
            image: '/assets/images/rooms/standard/rooms-std-0.jpg'
        },
        {
            id: 1,
            image: '/assets/images/rooms/standard/rooms-std-1.jpg'
        },
        {
            id: 2,
            image: '/assets/images/rooms/standard/rooms-std-2.jpg'
        }
    ]
    },
    {
        id: 1,
        category: 'rooms',
        type: 'standard2',
        dbId: 1,
        name: 'Standard Room - 2',
        nameJ: '標準ルーム 2',
        caption: 'The Standard Type 2 rooms can accommodate up to three guests. Both western style and Japanese style (tatami) rooms are available',
        captionJ: '収容人数が３人です。洋室と和室があります。',
        numGuests: 3,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/standard/rooms-std-0.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/standard/rooms-std-1.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/standard/rooms-std-2.jpg'
            }
        ]
        },
    {
        id: 2,
        category: 'rooms',
        type: 'family1',
        dbId: 2,
        name: 'Family Room - 1',
        nameJ: 'ファミリルーム 1',
        caption: 'The Family Type 1 rooms can accommodate five guests. ',
        captionJ: '収容人数が３人です。洋室と和室があります。',
        numGuests: 5,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/suites/rooms-suite-0.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/suites/rooms-suite-1.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/suites/rooms-suite-2.jpg'
            }
        ]
    },
    {
        id: 3,
        category: 'rooms',
        type: 'family2',
        dbId: 5,
        name: 'Family Room - 2',
        nameJ: 'ファミリルーム 2',
        caption: 'The Family Type 2 rooms can accommodate seven guests. They are suite rooms with both western style beds and Japanese style (tatami).',
        captionJ: '収容人数が7人です。洋室と和室が繋がっているスウィト部屋です。',
        numGuests: 7,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/suites/rooms-suite-0.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/suites/rooms-suite-1.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/suites/rooms-suite-2.jpg'
            }
        ]
    },
    {
        id: 4,
        category: 'rooms',
        type: 'group',
        dbId: 3,
        name: 'Group Room',
        nameJ: 'グループ室',
        caption: 'This large Japanese style room can accommodate up to 11 guests. It is best for  groups.',
        captionJ: 'この大きな畳室は、11名までの顧客が入られます。団体旅行に最適。',
        numGuests: 11,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/group/rooms-group-0.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/group/rooms-group-1.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/group/rooms-group-2.jpg'
            }
        ]
    }
]