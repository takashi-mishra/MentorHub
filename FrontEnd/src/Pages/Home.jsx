import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Hero from '../Components/Hero/Hero'
import MentorsList from '../Components/Mentor list/MentorsList'
import Footer from '../Components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
       <Hero />
       <MentorsList/>
       <Footer />
    </>
  )
}

export default Home
