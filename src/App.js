import { useEffect, useState } from "react"

export default function App(){
    const [weather, setWeather] = useState('');

    useEffect(()=>{
        async function getWeather(){
            try {
                const response = await fetch('https://weather.streamsave.xyz/get?city=congleton');
                const data = await response.json();
                const baseIconUrl = "https://openweathermap.org/img/wn/";

                const minmax = Object.keys(data.daily).map(([k, v]) => { 
                    if(k >= 5) return;
                    let day = data.daily[k];
                    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
                    return (
                        <div key={k} className="text-center flex-1">
                            <div className="font-light small:text-sm laptop:text-2xl small:hidden tablet:inline-block">{days[new Date(day.dt * 1000).getDay()]}</div>
                            <div className="font-light small:text-sm small:inline-block tablet:hidden laptop:text-lg">{days[new Date(day.dt * 1000).getDay()].substring(0,3)}</div>
                            <div className="small:text-sm laptop:text-lg">{Math.ceil(day.temp.max)}°c <span className="small:hidden tablet:inline-block">{Math.floor(day.temp.max)}°c</span></div>
                            <div className="capitalize small:text-sm laptop:text-lg">{day.weather[0].description}</div>
                            <div className="justify-center small:hidden tablet:inline-block">
                                <img className="mx-auto w-[100px]" src={baseIconUrl + day.weather[0].icon + '@4x.png'}/>
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

    return (
        <>
            <div className="bg-slate-100 h-screen flex dark:bg-slate-800">
                <div className="m-auto small:h-full tablet:h-fit align-text-top small:w-full tablet:w-11/12 laptop:9/12 flex small:divide-x-0 laptop:divide-x items-center small:p-0 tablet:p-4 shadow-2xl dark:divide-slate-700 bg-white text-black dark:text-white dark:bg-slate-900 small:rounded-none tablet:rounded-xl ">
                    {weather}
                </div>
            </div>
        </>
    );
}