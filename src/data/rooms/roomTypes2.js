/* This files contains for ALL room types the rooms photos (more than 1) and overall description */
/* This file is used to render the booking details whereas roomTypes1.js cis used for display pic for website */
/* The details include: standard room type has two subtypes, with 2 and 3 beds respectively. Same is true for family type */
export const roomType2 = [
    {
    id: 0,
    category: 'rooms',
    type: 'twin',
    dbId: 4,
    name: 'Twin Rooms',
    nameJ: 'ツイン',
    caption: 'The twin rooms can accommodate up to two guests',
    captionJ: '収容人数が２人です。',
    numGuests: 2,
    images: [ 
        {
            id: 0,
            image: '/assets/images/rooms/twin/twin0.jpg'
        },
        {
            id: 1,
            image: '/assets/images/rooms/twin/twin1.jpg'
        },
        {
            id: 2,
            image: '/assets/images/rooms/twin/twin2.jpg'
        },
        {
            id: 3,
            image: '/assets/images/rooms/twin/twin3.jpg'
        },
        {
            id: 4,
            image: '/assets/images/rooms/twin/twin4.jpg'
        },
        {
            id: 5,
            image: '/assets/images/rooms/twin/twin5.jpg'
        }
    ]
    },
    {
        id: 1,
        category: 'rooms',
        type: 'triple',
        dbId: 1,
        name: 'Triple Rooms',
        nameJ: 'トリプル',
        caption: 'The triple rooms are Western style rooms and can accommodate up to three guests.',
        captionJ: '収容人数が３人です。洋室です。',
        numGuests: 3,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/triple/triple1.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/triple/triple2.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/triple/triple3.jpg'
            },
            {
                id: 3,
                image: '/assets/images/rooms/triple/triple4.jpg'
            }
        ]
        },
    {
        id: 2,
        category: 'rooms',
        type: 'japanlarge',
        dbId: 2,
        name: 'Japanese Style Large Room',
        nameJ: '和室スーぺリア',
        caption: 'This large Japanese style room can accommodate up to five guests. ',
        captionJ: '和室スーぺリアは、収容人数が5人です。',
        numGuests: 5,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/japanlarge/jpLg1.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/japanlarge/jpLg2.jpg'
            }
        ]
    },
    {
        id: 3,
        category: 'rooms',
        type: 'suite',
        dbId: 5,
        name: 'Mixed Japanese and Western Style Suite',
        nameJ: '和洋室',
        caption: 'The mixed Japanese and Western style rooms can accommodate seven guests. They are suite rooms with both western style beds and Japanese style (tatami).',
        captionJ: '収容人数が7人です。洋室と和室が繋がっているスウィト部屋です。',
        numGuests: 7,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/suites/suite1.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/suites/suite2.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/suites/suite3.jpg'
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
        numGuests: 10,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/group/group1.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/group/group2.jpg'
            }
        ]
    },
    {
        id: 5,
        category: 'rooms',
        type: 'maisonette',
        dbId: 7,
        name: 'Maisonette Room',
        nameJ: 'メソネット室',
        caption: 'The maisonette room has two beds and three fotons and can accommodate up to 5 guests.',
        captionJ: 'メソネット室は、５名までの顧客が入られます。',
        numGuests: 5,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/maisonette/maisonette1.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/maisonette/maisonette2.jpg'
            }
        ]
    },
    {
        id: 6,
        category: 'rooms',
        type: 'japanstd',
        dbId: 6,
        name: 'Japanese Style Standard Room',
        nameJ: 'グループ室',
        caption: 'This Japanese style room can accommodate up to 3 guests. ',
        captionJ: '和室STDha, ３名までの顧客が入られます。',
        numGuests: 3,
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/japanstd/jpStd1.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/japanstd/jpStd2.jpg'
            }
        ]
    }
]