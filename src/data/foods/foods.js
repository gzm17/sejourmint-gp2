/* This files contains for ALL food types the foods photos (more than 1) and overall description */
/* foods types: food, drinks, and other features */
export const foods = [
    {
    id: 0,
    category: 'foods',
    name: 'Food',
    nameJ: '食べ物',
    caption: 'We serve breakfast buffet and provide a selected menu for dinners in our spacious and ornate dining room.',
    captionJ: '毎朝６時半から、ビュッフェを用意してます。広くて綺麗なレストラン。丁寧に洗濯された食べ物のメニュー。',
    images: [ 
        {
            id: 0,
            image: 'assets/images/foods/food/foods-food-0.jpg'
        },
        {
            id: 1,
            image: 'assets/images/foods/food/foods-food-1.jpg'
        },
        {
            id: 2,
            image: 'assets/images/foods/food/foods-food-2.jpg'
        }
    ]
    },
    {
        id: 1,
        category: 'foods',
        name: 'Drinks',
        nameJ: '飲み物',
        caption: 'Our bar is open every evening, featuring drinks carefully selected for the food menu and the seasons.',
        captionJ: '四季と食べ物に合う飲み物もバーで提供してます。',
        images: [ 
            {
                id: 0,
                image: 'assets/images/foods/drink/foods-drink-0.jpg'
            },
            {
                id: 1,
                image: 'assets/images/foods/drink/foods-drink-1.jpg'
            },
            {
                id: 2,
                image: 'assets/images/foods/drink/foods-drink-2.jpg'
            },
            {
                id: 3,
                image: 'assets/images/foods/drink/foods-drink-3.jpg'
            }
        ]
    },
    {
        id: 2,
        category: 'foods',
        name: 'All Organic',
        nameJ: 'オガニック食べ物',
        caption: 'Whenever possible, we use vegetables organically grown and meats directly from Nagato farms.',
        captionJ: 'できるだけ、長野県の地元産のオガニックなお野菜とお肉を仕入れてます。',
        images: [ 
            {
                id: 0,
                image: 'assets/images/foods/material/foods-material-0.jpg'
            }
        ]
    }
]