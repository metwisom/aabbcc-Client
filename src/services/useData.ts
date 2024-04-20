import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {getCurrentData} from "./dataSlice.ts";

export const useData = () => {
    const data = useSelector(getCurrentData)

    return useMemo(() => ( data ), [data])
}
