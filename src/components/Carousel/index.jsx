import './Carousel.css'
import { useState } from 'react'
import Button from '../Button'

const Carousel = ({items}) => {
    const [currentItem, setCurrentItem] = useState(0)

    const nextItem = () => {
        setCurrentItem((currentItem + 1) % items.length);
    }

    const prevItem = () => {
        setCurrentItem((currentItem - 1 + items.length) % items.length);
    }
    
    return (
        <div className='Carousel'>
            <div className='Carousel_container'>
                <Button className='Carousel_button Carousel_button-prev' onClickFunction={prevItem}>Prev</Button>
                <img
                    className='Carousel_img' 
                    src={items[currentItem].imageUrl}
                    alt={items[currentItem].altText}
                />
                <Button className='Carousel_button Carousel_button-next' onClickFunction={nextItem}>Next</Button>
            </div>
        </div>
    )
}
export default Carousel
