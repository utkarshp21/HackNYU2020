import React from 'react';
import { Carousel } from 'react-bootstrap';


class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.imageList[0],
            activeIndexSlider:0
        };
    }
    

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.imgResponse.length != 0){
            let word_split = prevProps.imgResponse[0].class.split('.');
        
            if (word_split.length == 2){
                //Check if match
                if (word_split[0] == prevState.selected.name){
                    //Move to next slide
                    this.setState({ activeIndexSlider: this.state.activeIndexSlider + 1 });
                }else{
                    //Keep on trying
                }
            }else {
                //Keep on trying
            }
        }else{
            //
        }
        
        // debugger;
        // if (this.props.someVal !== prevState.someVal) {
        //     this.setState({ previous: prevState.someVal, current: this.props.someVal });
        // }
        
    }
    
    render() {
        
        
        const handleSelect = (selectedIndex, e) => {
            this.setState({ selected: this.props.imageList[selectedIndex] });
            this.props.callbackFromParent(this.props.imageList[selectedIndex]);
        };

        const imageListItems = this.props.imageList.map((image) => <Carousel.Item>
                    <img
                    className="d-block w-100 carousel_image"
                    src={image.image}
                    alt={image.name}
                    />
                    <Carousel.Caption>
                    {/* <h3>{image.name}</h3> */}
                    </Carousel.Caption>
                </Carousel.Item>);
        return (

            <Carousel activeIndex={this.state.activeIndexSlider} onSelect={handleSelect} slide="false" interval="false" touch="false" pauseOnHover="true">
                {imageListItems}
            </Carousel>
        );
    }
}

export default ImageCarousel;