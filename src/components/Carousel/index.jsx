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
    console.log(items.currentItem)
    return (
        <div className='Carousel'>
            <Button className='Carousel_button Carousel_button-prev' onClickFunction={prevItem}>Prev</Button>
            <div className='Carousel_container'>
                <img
                    className='Carousel_img' 
                    src={items[currentItem].imageUrl}
                    alt={items[currentItem].altText}
                />
            </div>
            <Button className='Carousel_button Carousel_button-next' onClickFunction={nextItem}>Next</Button>
        </div>
    )
}
export default Carousel
