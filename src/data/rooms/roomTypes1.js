/* This files contains for ALL room types the rooms photos (more than 1) and overall description */
/* This file is used to render the overall big pictures on the website. roomTypes2.js contains the same info */
/* but more details: for example, standard room type has two subtypes, with 2 and 3 beds respectively. Same is true for family type */
export const roomType = [
    {
    id: 0,
    category: 'rooms',
    name: 'Standard Room',
    nameJ: '標準ルーム',
    caption: 'The standard rooms can sleep up to three guests. Both Western style and Japanese style (tatami) rooms are available.',
    captionJ: '客室によって、収容人数が２−３人です。洋室と和室があります。',
    captionCh1: '标准客房可供最多三位客人入住。酒店提供西式和日式（榻榻米）客房供选择。',
    captionCh2: '標準客房可供最多三位客人入住。酒店提供西式和日式（榻榻米）客房以供選擇。',
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
        name: 'Family Room',
        nameJ: 'ファミリルーム',
        caption: 'The family rooms can accommodate from five to seven guests. Two suite rooms have both Western style beds and Japanese style tatami.',
        captionJ: '客室によって、5ー7人が入れます。洋室と和室のスウィートルームが二つがあります。',
        captionCh1: '家庭房可容纳五至七位客人入住。此外，酒店還提供两间套房，既配有西式床，也配有日式榻榻米。',
        captionCh2: '家庭房可容納五至七位客人入住。此外，酒店還提供兩間套房，既配有西式床，也配有日式榻榻米。',
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
        id: 2,
        category: 'rooms',
        name: 'Group Room',
        nameJ: 'グループ室',
        caption: 'This large Japanese style room can accommodate up to 10 guests. It is best for traveling groups.',
        captionJ: 'この大きな畳室は、10名までの顧客が入られます。団体旅行に最適。',
        captionCh1: '这间宽敞的日式房间可容纳多达10位客人入住，非常适合旅行团体。',
        captionCh2: '這間寬敞的日式房間可容納多达10位客人入住，非常適合旅行團體',
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/group/rooms-group-0.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/group/rooms-group-1.jpg'
            }
        ]
    },
    {
        id: 3,
        category: 'amenities',
        name: 'Amenities',
        nameJ: 'アメニティー',
        caption: 'All of our rooms, with the exception of the group room, are equipped with private en-suite bathrooms and toilets. In addition, each room is equipped with air conditioning, a TV, a hair-dryer, a kettle, a safe, a refrigerator, toiletries and Wi-Fi service to ensure that you have a comfortable and enjoyable stay.',
        captionJ: 'グループルームを除くすべての客室には、専用のバスルームとトイレが完備されています。また、エアコン、テレビ、ヘアドライヤー、ケトル、セーフ、冷蔵庫、他のアメニティーとWi-Fiサービスも備えており、快適で心地よい滞在を楽しめます。',
        captionCh1: '除了团体房之外，我们所有的客房都配备了私人套间浴室和卫生间。此外，每个客房都配备了空调、电视、吹风机、热水壶、保险箱、冰箱、洗漱用品以及Wi-Fi服务，确保你的住宿舒适愉悦。',
        captionCh2: '除了團體房之外，我們所有的客房都配有私人套間浴室和衛生間。此外，每個客房都配備了空調、電視、吹風機、熱水壺、保險箱、冰箱、洗漱用品和Wi-Fi服務，以確保你的住宿舒適愉悅。',
        images: [ 
            {
                id: 0,
                image: '/assets/images/rooms/other/rooms-other-0.jpg'
            },
            {
                id: 1,
                image: '/assets/images/rooms/other/rooms-other-1.jpg'
            },
            {
                id: 2,
                image: '/assets/images/rooms/other/rooms-other-2.jpg'
            }
        ]
    }
]