import React from 'react'
import bitcoin from '../images/crypto.webp'
import {motion} from 'framer-motion'
function Home() {
  return (
    <div className='vh-100 bg-dark d-flex justify-content-center align-items-center '    >
      <motion.div 
      style={{}}
      animate = {{translateY : '-20px'}}
      transition={{
        duration : 1.5, repeat : Infinity,repeatType:'reverse'
      }}
      >
      <img width='100%' height='100%' style={{ filter: 'grayscale(0.2)' }} src={'https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png'} alt="coin" />
      </motion.div>
    
    </div>
  )
}

export default Home