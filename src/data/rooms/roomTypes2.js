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
    caption: 'Each of the twin rooms has two beds.',
    captionJ: '各ツインルームにはベッドが3台ずつあります。',
    captionCh1: '每个双人间配有两张床。',
    captionCh2: '每個雙人間均配備有兩張床。',
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
        caption: 'Each of the triple rooms has three beds. ',
        captionJ: '各トリプルルームにはベッドが3台ずつあります。',
        captionCh1: '每个三人间配有三张床。',
        captionCh2: '每個三人間均配備有三張床。',
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
        captionJ: '和室スーぺリアは最大で5人まで宿泊可能です。',
        captionCh1: '这间宽敞的日式房间最多可容纳5位客人。',
        captionCh2: '這間寬敞的日式房間最多可容納五位客人。',
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
        caption: 'The mixed Japanese and Western style suite rooms can accommodate up to seven guests. The Western-style room is furnished with three beds, while the Japanese-style room can accommodate four futon beds.',
        captionJ: '和洋折衷のスイートルームは最大で7人まで宿泊できます。洋室にはベッドが3台あり、和室には4つの布団が置かれています。',
        captionCh1: '混合日式和西式风格的套房可容纳最多七位客人。西式房间配有三张床，而日式房间可容纳四张榻榻米床。',
        captionCh2: '混合日式和西式風格的套房可容納最多七位客人。西式房間配有三張床，而日式房間可容納四張榻榻米床。',
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
        caption: 'This large Japanese style room can accommodate up to 10 guests. It is best for  groups.',
        captionJ: 'この大きな畳室は、10名までの顧客が入られます。団体旅行に最適。',
        captionCh1: '这间宽敞的日式房间最多可容纳10位客人。非常适合团体入住。',
        captionCh2: '這間寬敞的日式房間最多可容納10位客人。非常適合團體入住。',
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
        captionCh1: '复式房间有两张床和三张佛顿床，最多可容纳5位客人。',
        captionCh2: '複式房間內配備兩張床和三張佛頓床，最多可容納5位客人。',
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
        caption: 'This Japanese style room can accommodate up to 2 guests. ',
        captionJ: '和室STDは, 2名までの顧客が入られます。',
        captionCh1: '日式标准客房可供二位客人入住。',
        captionCh2: '日式標準客房可供二位客人入住。',
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