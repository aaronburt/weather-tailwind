import { useEffect, useState } from "react"

export default function App(){
    const [weather, setWeather] = useState('');
    useEffect(()=>{
        async function getWeather(){
            try {
                const response = await fetch('https://weather.streamsave.xyz/get?city=congleton');
                const data = await response.json();
                const daily = data.daily;
                const baseIconUrl = "https://openweathermap.org/img/wn/";

                const minmax = Object.keys(daily).map(([k, v]) => { 
                    if(k >= 5) return;
                    let day = daily[k];
                    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
                    return (
                        <div key={k} className="text-center transition-all">
                            <div className="font-light small:text-sm laptop:text-2xl ">{days[new Date(day.dt * 1000).getDay()]}</div>
                            <div className="small:text-sm laptop:text-lg">{Math.ceil(day.temp.max)}°c {Math.floor(day.temp.max)}°c</div>
                            <div className="capitalize small:text-sm laptop:text-l">{day.weather[0].description}</div>
                            
                            <div className="justify-center">
                                <img className="mx-auto hover:scale-110 w-[100px]" src={baseIconUrl + day.weather[0].icon + '@4x.png'}/>
                            </div>
                        </div>
                    );
                });
            
                setWeather(minmax);
            } catch(err){
                return;
            }
        }
        getWeather();
    }, []);


    return(
        <div className="small:h-max tablet:h-max laptop:h-screen w-full flex bg-slate-100 dark:bg-slate-800">
            <div className="m-auto w-11/12 grid small:grid-cols-1 small:divide-x-0 laptop:divide-x laptop:grid-cols-5 p-4 shadow-2xl dark:divide-slate-700 bg-white text-black dark:text-white dark:bg-slate-900 rounded-xl ">
                {weather}
            </div>
        </div>
    )




}