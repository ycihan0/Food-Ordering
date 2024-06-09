import React from 'react'
import Title from '../ui/Title'

const Order = () => {
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Orders</Title>
     

    </form>
  )
}

export default Order
