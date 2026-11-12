import React from 'react'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import TopServices from '../components/TopServices'

const Home = () => {
  return (
    <div>
      <Header/>
      <TopDoctors/>
      <TopServices />
      <Banner/>
    </div>
  )
}

export default Home