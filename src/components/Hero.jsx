import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../../public/assets/utils";
import { useState, useEffect } from "react";

const Hero = () => {
    const [videoSrc, setVideoSrc ] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const handleVideoSrcSet = () => {
        if(window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    useEffect(() => {
        const initialDelay = setTimeout(() => {
          setHasStarted(true); 
        }, 1200); 
        return () => clearTimeout(initialDelay); // Cleanup timeout on unmount
  }, []);
    

    useEffect(() => {
        if(hasStarted && count < 15) {
            const timer = setTimeout(() => {
                setCount(count + 1);
            }, 100)
            return () => clearTimeout(timer);
        }
    }, [hasStarted, count])

    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet);
        return () => {
            window.removeEventListener('resize', handleVideoSrcSet)
        }
    },[])
    
    useGSAP(() => {
        gsap.to('#hero', { opacity: 1, delay: 2 })
        gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
    }, [])
    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p id="hero" className="hero-title">iPhone {count} Pro</p>
                <div className="md:w-10/12 w-9/12">
                    <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
                        <source src={videoSrc} type="video/mp4"></source>
                    </video>
                </div>
            </div>
            <div
            id="cta"
            className="flex flex-col items-center opacity-0 translate-y-20"
            >
            <a href="#highlights" className="btn">Buy</a>
            <p className="font-normal text-xl">From $199/month or $999</p>
            </div>

        </section>
    )
}

export default Hero;