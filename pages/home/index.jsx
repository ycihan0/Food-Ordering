import Reservation from '@/components/Reservation'
import Customers from '@/components/customers/Customers'
import Footer from '@/components/layout/Footer'
import MenuWrapper from '@/components/product/MenuWrapper'
import About from '@/components/ui/About'
import Campaigns from '@/components/ui/Campaigns'
import Carousel from '@/components/ui/Carousel'
import React from 'react'

const Index = () => {
  return (
    <React.Fragment>
      <Carousel/>
      <Campaigns/>
      <MenuWrapper/>
      <About/>
      <Reservation/>
      <Customers/>
      <Footer/>
    </React.Fragment>
  )
}

export default Index
