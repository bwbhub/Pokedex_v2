import React, { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import pokeApi from "../../../../api/modules/pokedex.api"
import { urlConvert } from "../../../../utils/textConvert"
import LocalLoading from "../../../Loaders/LocalLoading"

const Evolution = ({ pokeDetails, color, loading }) => {
  const [evolDetails, setEvolDetails] = useState(null)

  const url = pokeDetails?.evolution_chain?.url
  const parts = url?.split("/")
  const chainId = parts[parts?.length - 2]

  const evolutionList = (evolDetails) => {
    const speciesList = []

    const throughEvolutions = (evolution) => {
      speciesList.push({
        name: evolution?.species?.name,
        url: evolution?.species?.url
      })

      if (evolution?.evolves_to?.length > 0) {
        evolution?.evolves_to?.forEach((nextEvolution) => {
          throughEvolutions(nextEvolution)
        })
      }
    }

    throughEvolutions(evolDetails)
    return speciesList
  }

  useEffect(() => {
    const getDetails = async (chainId) => {
      const { response, err } = await pokeApi.getEvol({ chainId: chainId })

      if (response) {
        const evolChain = response.chain
        const evolList = evolutionList(evolChain)
        setEvolDetails(evolList)
      } else {
        console.error(err)
      }
    }

    getDetails(chainId)
  }, [])

  return evolDetails ? (
    <div
      id="evolution"
      className={`h-full w-full flex gap-3 justify-center items-center text-white ${evolDetails.length > 3 ? "flex-wrap" : null}`}
    >
      {loading ? (
        <LocalLoading color={color} />
      ) : (
        evolDetails.map((detail, idx) => (
          <div className="w-1/4 flex items-center" key={detail.name + idx}>
            <div className="flex flex-col justify-center items-center gap-1">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${urlConvert(detail)}.png`}
                alt={detail.name}
              />
              <p className="capitalize text-md font-semibold">{detail.name}</p>
            </div>
            {idx < evolDetails.length - 1 && (
              <ArrowRight className="w-4/5" />
            )}
          </div>
        ))
      )}
    </div>
  ) : null
}

export default Evolution
