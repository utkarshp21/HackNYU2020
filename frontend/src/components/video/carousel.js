import React from 'react';
import { Carousel } from 'react-bootstrap';


class ImageCarousel extends React.Component {
    // constructor(props) {
    // }
    

    componentDidMount() {
        
    }
    
    render() {
        const handleSelect = (selectedIndex, e) => {
            this.props.callbackFromParent(this.props.imageList[selectedIndex]);
        };

        const imageListItems = this.props.imageList.map((image) => <Carousel.Item>
                    <img
                    className="d-block w-100 carousel_image"
                    src={image.image}
                    alt={image.name}
                    />
                    <Carousel.Caption>
                    <h3>{image.name}</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>);
        return (
            <Carousel onSelect={handleSelect} slide="false" interval="false" touch="false" pauseOnHover="true">
                {imageListItems}
            </Carousel>
        );
    }
}

export default ImageCarousel;