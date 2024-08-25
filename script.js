const slideButtons = document.querySelectorAll('.btn')
const sliderItems = document.querySelector('.slider-items')
const scrollThumb = document.querySelector('.scroll-thumb');
const scrollBar = document.querySelector('.slider-scrollbar')
const items = document.querySelectorAll('.slider-item');

const maxScroll = sliderItems.scrollWidth - sliderItems.offsetWidth

const handleSlideButtons = () => {

    slideButtons.forEach(button => {
        button.addEventListener('click', () => {
            const leftOrRight = button.id == 'btn-prev' ? -1 : 1;
            const scrollAmount = (sliderItems.clientWidth * leftOrRight);
            sliderItems.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        })
    })


}

const handleMouseDown = (e) => {
    const clientX = e.clientX;
    const thumbPosition = scrollThumb.offsetLeft;

    const handleMouseMove = (e) => {
        const deltaX = e.clientX - clientX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxPosition = scrollBar.getBoundingClientRect().width - scrollThumb.offsetWidth;
        const boundedArea = Math.max(0, Math.min(maxPosition, newThumbPosition))
        const scrollPosition = (boundedArea / maxPosition) * maxScroll;
        console.log(scrollPosition);
        scrollThumb.style.left = `${boundedArea}px`
        sliderItems.scrollLeft = scrollPosition
    }
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

sliderItems.addEventListener('scroll', () => {
console.log(sliderItems.scrollLeft);
    slideButtons[0].style.display = sliderItems.scrollLeft <= 1 ? 'none': 'block'
    slideButtons[1].style.display = sliderItems.scrollLeft >= maxScroll ? 'none': 'block'

    const updatingScrollLeft = sliderItems.scrollLeft;
    const thumbChange = (updatingScrollLeft / maxScroll) * (scrollBar.clientWidth - scrollThumb.offsetLeft)
    scrollThumb.style.left = `${thumbChange}px`

})

const handleSliderMouseDown = (e) => {
    const clientX = e.clientX;

    const handleSliderMouseMove = (e) => {
        const deltaX = clientX - e.clientX;
        sliderItems.scrollBy({left: deltaX, behavior:'smooth'})
    }
    const handleSliderMouseUP = () => {
        document.removeEventListener('mousemove', handleSliderMouseMove)
        

    }
    document.addEventListener('mousemove', handleSliderMouseMove)
    document.addEventListener('mouseup', handleSliderMouseUP)
}

sliderItems.addEventListener('mousedown', handleSliderMouseDown)
items.forEach(item => {
    item.addEventListener('mousedown', (e) => {
        e.preventDefault()
        handleSliderMouseDown
    })
})


scrollThumb.addEventListener('mousedown', handleMouseDown)

window.addEventListener('load', handleSlideButtons)