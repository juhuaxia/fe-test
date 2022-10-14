import { useEffect } from "react"

const useResetScroll = () => {
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [])
}

export default useResetScroll;
