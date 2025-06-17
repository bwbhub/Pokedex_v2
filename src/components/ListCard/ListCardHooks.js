import React, { useEffect, useState } from 'react'
import pokeApi from '../../api/modules/pokedex.api'
import { usePokedetails } from '../../context/Pokedetails'


const useListCard = ({id, setOpenModal}) => {
    const [pokeInfo, setPokeInfo] = useState(null)
    const {setPokeDetails} = usePokedetails()
    
    const handleOpenModal = () => {
        setOpenModal(true)
        setPokeDetails(pokeInfo)
    }

    useEffect(() => {
        const getPoke = async () => {
          const { response, err } = await pokeApi.getPoke({ pokeId: id })
    
          if (response) {
            setPokeInfo(response)
          } else {
            console.error(err)
          }
        }
        getPoke(id)
      }, [id])


    return {pokeInfo, handleOpenModal}
}

export default useListCard