import Cards from '../Card'
import { useState } from 'react'
import Button from '../Button'

const CarouselCard = ({items}) => {
    const [currentItem, setCurrentItem] = useState(0)

    const nextItem = () => {
        setCurrentItem((currentItem + 1) % items.length);
    }

    const prevItem = () => {
        setCurrentItem((currentItem - 1 + items.length) % items.length);
    }
    return (
        <div className='Carousel'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <Button className='Carousel_button Carousel_button-prev' onClickFunction={prevItem}>
                <span class="material-symbols-outlined">
                    chevron_left
                </span>
                </Button>
                    <Cards 
                        Body={items[currentItem].Body}
                        image={items[currentItem].image}
                        Title={items[currentItem].Title}
                        Price ={items[currentItem].Price}
                        BtnPrimary ={items[currentItem].BtnPrimary}
                        BtnSecondary={items[currentItem].BtnSecondary}
                    />
                <Button className='Carousel_button Carousel_button-next' onClickFunction={nextItem}>
                <span class="material-symbols-outlined">
                    chevron_right
                </span>
                </Button>
        </div>
    )
}
export default CarouselCard