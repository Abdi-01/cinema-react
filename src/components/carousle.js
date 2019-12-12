import React, { Component } from 'react'
import { UncontrolledCarousel } from 'reactstrap';


const items = [
    {
      src: 'https://www.sopsip.com/upload/sopsip.com/deal/17299/tixidpromobogosenin.jpg',
      altText: 'Slide 1',
      caption: 'Slide 1',
      header: 'Slide 1 Header',
      key: '1'
    },
    {
      src: 'https://promo.tix.id/images/Banner-buy.png',
      altText: 'Slide 2',
      caption: 'Slide 2',
      header: 'Slide 2 Header',
      key: '2'
    },
    {
      src: 'https://jadimandiri.org/wp-content/uploads/2018/07/Promo-XXI.png',
      altText: 'Slide 3',
      caption: 'Slide 3',
      header: 'Slide 3 Header',
      key: '3'
    }
  ];

  class imgSlide extends Component{
      render(){
          return(
              <div className="sizeCarousle">
                  <UncontrolledCarousel items={items} ></UncontrolledCarousel>
              </div>
          )
      }
  }

  export default imgSlide